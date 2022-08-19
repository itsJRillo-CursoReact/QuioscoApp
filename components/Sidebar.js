import Image from "next/image";
import React from "react";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
    const {categorias} = useQuiosco()

  return (
    <>
      <Image
        width={300}
        height={100}
        src="/assets/img/logo.svg"
        alt="imagen logo"
      />

        <nav>
            {categorias.map( c => (
                <Categoria key={c.id} categoria={c}/>
            ))}
        </nav>

    </>
  );
};

export default Sidebar;
