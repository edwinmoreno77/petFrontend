import config from "../../assets/config.svg";
import notification from "../../assets/notification.svg";
import edit from "../../assets/edit.svg";
import calendarPerfil from "../../assets/calendarPerfil.svg";

export const ConfigurationOptions = () => {
  return (
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
          src={edit}
          alt="edit"
        />
      </li>
    </ul>
  );
};
