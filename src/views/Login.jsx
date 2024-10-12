import { useState } from "react";
import { authLogin } from "../api/authLogin";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = () => {
    // authLogin(email, password).then((result) => console.log(result));
    const user = authLogin(email, password);
    console.log(user);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex justify-center bg-slate-300 min-h-screen">
          <div className="bg-white w-80 h-80 my-10 rounded-md">
            <h2 className="text-center font-bold text-gray-900 my-5">LOGIN</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 mx-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Usuario
                </label>
                <input
                  className="block bg-white w-full border border-slate-300 rounded-md sm:text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
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
                <input
                  className="block bg-white w-full border border-slate-300 rounded-md sm:text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  placeholder="********"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-md bg-lime-500 mt-10 text-white font-bold shadow-md"
                onClick={(e) => handlerSubmit(e)}
              >
                <h1 className="my-1 mx-14">Ingresar</h1>
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src=""></img>
        </div>
      </div>
    </>
  );
}

export default Login;
