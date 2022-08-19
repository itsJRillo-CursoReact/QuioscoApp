import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { categoriaActual, handleClick } = useQuiosco();
  const { nombre, icono, id } = categoria;
  
  return (
    <div className={` ${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400 transition ease-in-out duration-200 hover:cursor-pointer`}>
      <Image
        className="mr-5"
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="imagen icono"
      />

      <button type="button" className="text-2xl font-bold"onClick={() => handleClick(id)}>
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
