import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main className="container-fluid bg-gradient-to-r from-cyan-700 to-blue-500 flex flex-col items-center  min-h-screen p-5">
      <div className="flex flex-col justify-center items-center p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl  rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white mb-16 h-96">
        <h1>Home</h1>
        <div className="flex gap-5 mt-5">
          <Link to={"/login"} className="p-3 bg-lime-500 rounded-lg">
            Iniciar sesión
          </Link>
          <Link to={"/register"} className="p-3 bg-lime-500 rounded-lg">
            Registro de usuario
          </Link>
        </div>
      </div>
    </main>
  );
};
