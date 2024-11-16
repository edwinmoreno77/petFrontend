import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import logout from "../../assets/logout.svg";

export const UserLogout = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { user } = store.userState;

  const hadleLogout = () => {
    actions.onLogout();
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2">
      <div className="flex items-center justify-around   md:p-5  lg:p-5 w-96">
        <div className="flex items-start justify-start h-20 w-20 md:w-28 md:h-28 lg:w-36 lg:h-36">
          <Link to={"/home"}>
            <img
              className="object-cover h-full w-full rounded-full transition ease-in-out duration-200 border-2 hover:border-4 border-lime-500 shadow-md hover:shadow-lime-500 hover:scale-110"
              src={user?.image}
              alt="user image"
            />
          </Link>
        </div>
        <h1 className="font-extrabold text-xl md:text-2xl">{user?.name}</h1>
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
