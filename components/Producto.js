import Image from "next/image";
import { formatearPrecio } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { handleClickProducto, handleChangeModal } = useQuiosco();
  const { nombre, imagen, precio } = producto;
  return (
    <div className="border p-3">
      <Image
        layout="responsive"
        width={400}
        height={500}
        src={`/assets/img/${imagen}.jpg`}
        alt={`imagen plato ${nombre}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-black">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearPrecio(precio)}
        </p>
        <button
          onClick={() => {
            handleChangeModal();
            handleClickProducto(producto);
          }}
          className="bg-amber-600 hover:bg-amber-800 font-bold uppercase p-3 mt-5 w-full text-white"
          type="button"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
