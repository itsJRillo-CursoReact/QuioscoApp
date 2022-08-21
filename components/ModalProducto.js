import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearPrecio } from "../helpers";
import { useState, useEffect } from "react";

const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);


  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
        const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
        setEdicion(true)
        setCantidad(productoEdicion.cantidad)
    }
  }, [producto, pedido]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`imagen prodicuto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>

      <div className="md:w-2/3">
        <div onClick={handleChangeModal} className="flex justify-end">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearPrecio(producto.precio)}
        </p>

        <div className="flex gap-4 mt-10">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              if (cantidad >= 5) return;

              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
          type="submit"
          className="bg-amber-600 hover:bg-amber-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
        >
          {edicion ? "Guardar cambios" : "Añadir al Pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
