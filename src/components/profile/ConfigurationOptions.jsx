import { useState } from "react";
import { Link } from "react-router-dom";
import { useEventsOfDay } from "../../hooks/calendar/useEventsOfDay";
import notification from "../../assets/notification.svg";
import addpet from "../../assets/addpet.svg";
import config from "../../assets/config.svg";

export const ConfigurationOptions = () => {
  const [isHoverConfig, setIsHoverConfig] = useState(false);
  const { eventsOfTheDay } = useEventsOfDay();

  const handleMouseEnter = () => {
    setIsHoverConfig(true);
  };

  const handleMouseLeave = () => {
    setIsHoverConfig(false);
  };

  return (
    <ul className="flex justify-evenly items-center w-full text-sm font-semibold pb-2 md:p-5 transition-all">
      <Link to={"/profile/config"}>
        <img
          className={`${
            isHoverConfig ? "animate-spin" : ""
          } w-9 md:w-12  duration-300 ease-in-out hover:brightness-150`}
          src={config}
          alt="config"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <Link className="relative group" to={"/profile/notifications"}>
        <div className="hover:scale-110 duration-200 ease-in-out hover:brightness-150">
          <span
            className={`absolute z-20 ${
              eventsOfTheDay?.length > 0 ? "animate-bounce" : "hidden"
            } bg-lime-500 group-hover:text-black text-xxs md:text-sm px-2 py-0 md:px-3 md:py-1 rounded-full`}
          >
            {eventsOfTheDay?.length}
          </span>
          <img
            className="w-8 z-10 mt-1 md:w-12"
            src={notification}
            alt="notification"
          />
        </div>
      </Link>
      <Link to={"/profile/addpets"}>
        <img
          className="w-9 md:w-12 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
          src={addpet}
          alt="addpet"
        />
      </Link>
    </ul>
  );
};
