import { useContext, useState } from "react";
import { IconEye } from "../common/IconEye";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Context } from "../../store/appContext";
import logo from "../../assets/logo.png";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { authLogin } = useAuth();
  const { store } = useContext(Context);
  const { userStatus } = store.userState;
  const navigate = useNavigate();

  const handlerSubmit = async () => {
    await authLogin(email, password);
    navigate("/home");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-slate-100 text-slate-600 lg:-me-4 rounded-e-2xl z-10 lg:w-full">
        <h1 className="text-center font-bold p-2 mt-8">Inicio de sesión</h1>
        <div className="bg-white w-80 md:w-6/12 lg:min-w-1/4 shadow-lg rounded-2xl mb-3 flex flex-col justify-center">
          <div className="place-self-center bg-white w-36 h-36 lg:w-44 lg:h-44 rounded-lg ease-in-out duration-200 hover:scale-105 cursor-pointer pt-8">
            <img
              src={logo}
              alt="image"
              className=" rounded-lg hover:scale-110 duration-200 ease-in-out hover:brightness-110"
            />
          </div>

          <div className="mt-10 mx-4 gap-x-6 gap-y-8">
            <div className="px-3 py-2 md:py-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo
              </label>
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="ejemplo@email.com"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 mt-6"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  <IconEye showPassword={showPassword} />
                </span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="italic flex justify-star ms-8">
              <input type="checkbox" className="accent-primary-green mr-2" />
              Recordar mi contraseña
            </div>
            <p className="mt-5 font-extralight text-center mr-2 xs:text-sm sm:text-base">
              ¿No tienes una cuenta?{" "}
              <Link
                to={"/register"}
                className="underline font-semibold text-primary-green hover:brightness-125 cursor-pointer"
              >
                Crear una cuenta
              </Link>
            </p>
          </div>

          <button
            className={`flex justify-center items-center mb-10 bg-primary-green font-semibold shadow-md hover:brightness-110  ease-in-out duration-200 text-white rounded-md m-4 px-1 py-2 ${
              userStatus === "checking" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => handlerSubmit(e)}
            disabled={userStatus === "checking"}
          >
            {userStatus === "checking" && (
              <span className="flex items-center">
                <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
              </span>
            )}
            <span>Iniciar sesión</span>
          </button>
        </div>
      </div>
    </>
  );
}
