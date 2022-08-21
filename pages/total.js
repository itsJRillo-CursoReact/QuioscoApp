import { useCallback, useEffect } from "react";
import { formatearPrecio } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total">
      <h1 className="text-4xl font-black">Total y Confirmar</h1>
      <p className="text-2xl my-10 ">Confirmar tu Pedido a continuación</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 text-xl font-bold"
          >
            Nombre:{" "}
          </label>
          <input
            type="text"
            id="nombre"
            className="b-gray-200 w-full lg:w-1/3 p-2 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar: {""}{" "}
            <span className="font-bold">{formatearPrecio(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type="submit"
            value="Confirmar pedido"
            className={` ${
              comprobarPedido() ? "bg-indigo-100" : "bg-indigo-600"
            } text-center w-full lg:w-auto px-5 py-2 rounded uppercase text-white font-bold`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
