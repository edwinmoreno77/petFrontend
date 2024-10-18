import { useState } from "react";
import { EyeIcon } from "@heroicons/react/16/solid";
import authLogin from "../../api/authLogin";
import logoSquare from "../../assets/logoSquare.jpg";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = async () => {
    // authLogin(email, password).then((result) => console.log(result));
    const user = await authLogin(email, password);
    console.log(user);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-slate-100 text-slate-600 lg:-me-4 rounded-e-2xl z-10 lg:w-full">
        <h1 className="text-center font-bold p-2 mt-8">Inicio de sesión</h1>
        <div className="bg-white w-80 h-screen md:w-6/12 lg:min-w-1/4 shadow-lg rounded-2xl mb-3 flex flex-col justify-center">
          <div className="place-self-center bg-slate-100 w-36 h-36 lg:w-44 lg:h-44 rounded-lg ease-in-out duration-200 hover:scale-105 cursor-pointer">
            <img
              src={logoSquare}
              alt="image"
              className="border-inherit rounded-lg hover:scale-110 duration-200 ease-in-out hover:brightness-105"
            />
          </div>

          <div className="mt-10 mx-4 gap-x-6 gap-y-8">
            <div className="px-3 py-2 md:py-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                correo
              </label>
              <input
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
                contraseña
              </label>
              <div className="flex flex-row justify-between">
                <input
                  className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="********"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeIcon className="size-6 text-lime-400" />
              </div>
            </div>
          </div>

          <div className="text-xs italic mx-5 my-4 flex justify-star ms-8">
            <input type="checkbox" className="accent-lime-400 mr-2" />
            Recordar mi contraseña
          </div>

          <div className="text-xs italic mx-4 my-4 flex justify-center">
            ¿No tienes una cuenta? Entonces puedes
            <span className="text-lime-400">&nbsp;Crear una cuenta</span>
          </div>

          <button
            className="bg-lime-400 font-semibold shadow-md hover:brightness-110  ease-in-out duration-200 text-white rounded-md m-4 px-1 py-2"
            onClick={(e) => handlerSubmit(e)}
          >
            <h1 className="my-1 mx-14">Iniciar sesión</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default FormLogin;
