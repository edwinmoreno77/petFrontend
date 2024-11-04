import { Link } from "react-router-dom";

export const Notifications = () => {
  return (
    <main className="container-fluid bg-black flex z-0 flex-col bg-image-motivo items-center justify-center min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col z-10 justify-center items-center p-3 duration-200 ease-in-out cursor-pointer text-center w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black border-2 border-slate-800 shadow-slate-600 shadow-md min-h-svh text-white mb-10 lg:mb-4">
        <h1 className="font-bold text-3xl underline mb-5">Notificaciones</h1>
        <h1 className="font-bold text-xl">No tienes pendientes para hoy.</h1>
        <Link className="w-1/2 mt-10" to={"/profile"}>
          <button className="p-2 w-full my-2 rounded-md bg-black border-2 font-semibold hover:brightness-110 hover:scale-110 transition ease-in-out duration-200">
            Volver
          </button>
        </Link>
      </section>
    </main>
  );
};
