import { useContext } from "react";
import { Context } from "../store/appContext";

export const Perfil = () => {
  const { store } = useContext(Context);
  const { user } = store.userState;

  return (
    <main className="container-fluid bg-gradient-to-r from-cyan-700 to-blue-500 flex flex-col gap-5 justify-center items-center  min-h-screen p-5">
      <div className="flex flex-col justify-center items-center p-10 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center min-w-1/4 rounded-xl bg-gradient-to-r from-slate-800 bg-slate-700 text-white">
        <h1 className="p-5 font-extrabold text-xl">Bienvanido {user.name}</h1>
        <section className="flex items-center justify-center p-6 rounded-xl">
          <div className="flex items-center justify-center h-52 w-52">
            <img
              className="object-cover h-full w-full rounded-xl"
              src={user.image}
              alt=""
            />
          </div>
        </section>
        <section className="text-sm font-semibold">
          <p>{user.rut}</p>
          <p>{user.name}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.region}</p>
          <p>{user.comuna}</p>
          <p>{user.direction}</p>
          <p>{user.cellphone}</p>
          <p>mascotas: {user.pets.length}</p>
        </section>
      </div>
      <div className="flex flex-col justify-center items-center hover:scale-105 duration-200 ease-in-out cursor-pointer p-5 text-center min-w-1/4 rounded-xl bg-gradient-to-r from-slate-800 bg-slate-700 text-white">
        <h1 className="p-5 font-extrabold text-xl">
          Mascotas: {user.pets.length}
        </h1>
      </div>
    </main>
  );
};
