import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import config from "../assets/config.svg";
import notification from "../assets/notification.svg";
import calendarPerfil from "../assets/calendarPerfil.svg";
import addimages from "../assets/addimages.svg";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const { user } = store.userState;
  const { onLogout } = actions;

  const navigate = useNavigate();

  const hadleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <main className="container-fluid bg-gradient-to-r from-cyan-700 to-blue-500 flex flex-col items-center  min-h-screen p-5">
      <div className="flex flex-col justify-center items-center p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white mb-4">
        <section className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2">
          <div className="flex items-center justify-around   md:p-5  lg:p-5 w-96">
            <div className="flex items-start justify-start h-16 w-16 md:w-24 md:h-24">
              <img
                className="object-cover h-full w-full rounded-full"
                src={user.image}
                alt="user image"
              />
            </div>
            <h1 className="font-extrabold text-xl md:text-2xl">{user.name}</h1>
          </div>
          <span onClick={hadleLogout} className="p-5 font-extrabold text-sm">
            <img
              className="w-8 md:w-10 hover:scale-125 duration-200 ease-in-out hover:brightness-150"
              src={logout}
              alt="logout"
            />
          </span>
        </section>
        <ul className="flex justify-evenly items-center w-full text-sm font-semibold pb-2 md:p-5">
          <li>
            <img
              className="w-9 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
              src={config}
              alt="config"
            />
          </li>
          <li>
            <img
              className="w-8 mt-1 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
              src={notification}
              alt="notification"
            />
          </li>
          <li>
            <img
              className="w-8 md:w-11 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
              src={calendarPerfil}
              alt="calendarPerfil"
            />
          </li>
          <li>
            <img
              className="w-8 mt-1 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
              src={notification}
              alt="notification"
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white mb-4">
        <h4 className="p-1 font-extrabold ">Mascotas: {user.pets.length}</h4>
        <div className="flex justify-evenly w-full">
          <div className="w-24 h-24 md:w-32 md:h-32 ">
            <img
              className="w-full h-full object-cover hover:bg-gray-400 duration-200 ease-in-out rounded-xl"
              src={addimages}
              alt="add images"
            />
          </div>
          {user.pets.length > 0 &&
            user.pets.map((pet) => (
              <section key={pet.id} className="bg-white w-36 h-36 rounded-xl">
                <h1>pet.name</h1>
                <img src={pet.image} alt="pet" />
              </section>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl  rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white mb-16 h-96"></div>
    </main>
  );
};
