import { NavLink } from "react-router-dom";
import profile from "../../assets/profile.svg";
import calendar from "../../assets/calendar.svg";
import deworming from "../../assets/deworming.svg";
import home from "../../assets/home.svg";
import vaccine from "../../assets/vaccine.svg";
import profileActive from "../../assets/profileActive.svg";
import calendarActive from "../../assets/calendarActive.svg";
import dewormingActive from "../../assets/dewormingActive.svg";
import homeActive from "../../assets/homeActive.svg";
import vaccineActive from "../../assets/vaccineActive.svg";

export const Navbar = () => {
  return (
    <main className="fixed z-50 bottom-0 left-1/2 lg:left-0 transform -translate-x-1/2 lg:-translate-x-1 w-full lg:w-16 lg:h-full max-w-md lg:max-w-xs bg-black p-3 lg:p-2 rounded-t-2xl lg:rounded-t-none lg:rounded-e-lg">
      <nav>
        <ul className="flex justify-evenly items-center gap-3 lg:gap-8 lg:flex-col">
          <NavLink to="/home" className="group">
            {({ isActive }) => (
              <div className="relative">
                <img
                  className="w-7 sm:w-9 md:w-11 lg:w-14 2xl:w-20 h-auto lg:hover:bg-lime-500 rounded-md lg:p-2"
                  src={isActive ? homeActive : home}
                  alt="Home"
                />
                <span className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 p-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Inicio
                </span>
              </div>
            )}
          </NavLink>

          <NavLink to="/calendar" className="group">
            {({ isActive }) => (
              <div className="relative">
                <img
                  className="w-7 sm:w-9 md:w-11 lg:w-14 2xl:w-20 h-auto lg:hover:bg-lime-500 rounded-md lg:p-2"
                  src={isActive ? calendarActive : calendar}
                  alt="Calendar"
                />
                <span className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 p-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Calendario
                </span>
              </div>
            )}
          </NavLink>

          <NavLink to="/vaccine" className="group">
            {({ isActive }) => (
              <div className="relative">
                <img
                  className="w-7 sm:w-9 md:w-11 lg:w-14 2xl:w-20 h-auto lg:hover:bg-lime-500 rounded-md lg:p-2"
                  src={isActive ? vaccineActive : vaccine}
                  alt="Vaccine"
                />
                <span className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 p-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Vacunas
                </span>
              </div>
            )}
          </NavLink>

          <NavLink to="/deworming" className="group">
            {({ isActive }) => (
              <div className="relative">
                <img
                  className="w-7 sm:w-9 md:w-11 lg:w-14 2xl:w-20 h-auto lg:hover:bg-lime-500 rounded-md lg:p-2"
                  src={isActive ? dewormingActive : deworming}
                  alt="Deworming"
                />
                <span className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 p-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Desparasitaciones
                </span>
              </div>
            )}
          </NavLink>

          <NavLink to="/profile" className="group">
            {({ isActive }) => (
              <div className="relative">
                <img
                  className="w-7 sm:w-9 md:w-11 lg:w-14 2xl:w-20 h-auto lg:hover:bg-lime-500 rounded-md lg:p-2"
                  src={isActive ? profileActive : profile}
                  alt="profile"
                />
                <span className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 p-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Perfil
                </span>
              </div>
            )}
          </NavLink>
        </ul>
      </nav>
    </main>
  );
};
