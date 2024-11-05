import { useContext } from "react";
import { Context } from "../store/appContext";
import vaccineIcon from "../assets/vaccineIcon.svg";
import dewormingIcon from "../assets/dewormingIcon.svg";
import calendar from "../assets/calendar.svg";
import dogGreen from "../assets/dogGreen.png";
import catGreen from "../assets/catGreen.png";

export function Home() {
  const { store } = useContext(Context);
  const user = store.userState?.user;

  return (
    <>
      <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center  min-h-screen p-5">
        <div className="flex flex-col justify-center items-center z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-5 h-96">
          <div className="flex items-start justify-start h-16 w-16 md:w-24 md:h-24">
            <img
              className="object-cover h-full w-full rounded-full"
              src={user.image}
              alt="user image"
            />
          </div>
          <h1 className="font-extrabold text-xl md:text-2xl my-3">
            {user ? `Bienvenid@, ${user.name}!` : "Cargando..."}
          </h1>
          <div className="flex mt-6 ml-auto">
            <img
              className="w-16 lg:w-32 lg:h-32 me-4 rounded-full bg-white hover:bg-gray-300 hover:scale-110 duration-200 ease-in-out"
              src={dogGreen}
              alt=""
            />
            <img
              className="w-16 lg:w-32 lg:h-32 me-4 rounded-full bg-white hover:bg-gray-300 hover:scale-110 duration-200 ease-in-out"
              src={catGreen}
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-start p-3 text-center w-full max-w-3xl rounded-xl bg-black text-white mb-3 h-96">
          <div className="flex justify-start mx-2 mt-2 mb-6 text-center">
            <h1 className="font-extrabold md:text-2xl">
              Estas son tus próximas actividades:
            </h1>
          </div>
          <div className="flex justify-start z-10 border-slate-800 p-3 my-2 text-center text-white font-bold hover:scale-105 duration-200 ease-in-out hover:brightness-75 cursor-pointer w-full rounded-xl bg-primary-green">
            <img className="w-6 lg:w-6 me-4" src={vaccineIcon} alt="" />
            actividad 1
          </div>
          <div className="flex justify-start z-10 border-slate-800 p-3 my-2 text-center text-white font-bold  hover:scale-105 duration-200 ease-in-out hover:brightness-75 cursor-pointer w-full rounded-xl bg-primary-green">
            <img className="w-6 lg:w-6 me-4" src={dewormingIcon} alt="" />
            actividad 2
          </div>
          <div className="flex justify-start z-10 border-slate-800 p-3 my-2 text-center text-white font-bold hover:scale-105 duration-200 ease-in-out hover:brightness-75 cursor-pointer w-full rounded-xl bg-primary-green">
            <img className="w-6 lg:w-6 me-4" src={calendar} alt="" />
            actividad 3
          </div>
        </div>
      </main>
    </>
  );
}
