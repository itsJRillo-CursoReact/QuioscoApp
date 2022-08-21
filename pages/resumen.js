import ResumenProducto from "../components/ResumenProducto";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Resumen() {
  const { pedido } = useQuiosco();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumem</h1>
      <p className="text-2xl my-10 ">Revisa tu Pedido</p>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl mt-20 font-bold ">No hay elementos</p>
      ) : (
        pedido.map((p) => <ResumenProducto key={p.id} producto={p}/>)
      )}
    </Layout>
  );
}
