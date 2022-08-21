import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const configToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  const handleClick = (id) => {
    const categoria = categorias.filter((c) => c.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleClickProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  // Para eliminar columnas innecesarias en el Array se hace uso del spread
  // Se colocan las columnas que no nos interesan y luego hacemos una copia del objeto sin esas columnas
  // Sintaxis => ({categoriaId,imagen,...producto})

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      // Añadir más | Actualizar el existente
      const pedidoActualizado = pedido.map((productostate) =>
        productostate.id === producto.id ? producto : productostate
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente", configToast);
    } else {
      // Nuevo Registro
      setPedido([...pedido, producto]);
      toast.success("Agregado Al Pedido", configToast);
    }

    setModal(false);
  };

  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const productoEliminado = pedido.filter((producto) => producto.id !== id);
    setPedido(productoEliminado);
    toast.success("Producto eliminado");
  };

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      toast.success("Pedido Realizado Correctamente");

      setTimeout(() => {
        router.push("/")
      }, 1000)

      //Reset Total
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClick,
        producto,
        handleClickProducto,
        handleChangeModal,
        modal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidad,
        handleEliminarProducto,
        nombre,
        setNombre,
        total,
        colocarOrden,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
