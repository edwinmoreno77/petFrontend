import { useNavigate } from "react-router-dom";
import logout from "../../assets/logout.svg";
import PropTypes from "prop-types";

export const UserLogout = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const hadleLogout = () => {
    onLogout();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2">
      <div className="flex items-center justify-around   md:p-5  lg:p-5 w-96">
        <div className="flex items-start justify-start h-16 w-16 md:w-24 md:h-24 lg:w-32 lg:h-32">
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
    </div>
  );
};

UserLogout.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};
