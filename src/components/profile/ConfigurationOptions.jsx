import config from "../../assets/config.svg";
import notification from "../../assets/notification.svg";
import edit from "../../assets/edit.svg";
import addpet from "../../assets/addpet.svg";
import { Link } from "react-router-dom";

export const ConfigurationOptions = () => {
  return (
    <ul className="flex justify-evenly items-center w-full text-sm font-semibold pb-2 md:p-5">
      <Link>
        <img
          className="w-9 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
          src={config}
          alt="config"
        />
      </Link>
      <Link>
        <img
          className="w-8 mt-1 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
          src={notification}
          alt="notification"
        />
      </Link>
      <Link to={"/profile/addpets"}>
        <img
          className="w-9 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
          src={addpet}
          alt="addpet"
        />
      </Link>
      <Link>
        <img
          className="w-8 mt-1 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
          src={edit}
          alt="edit"
        />
      </Link>
    </ul>
  );
};
