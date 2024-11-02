import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../store/appContext";
import { useForm } from "../../hooks/useForm";
import { validExtensions } from "../../utils/validateExtension";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Config = () => {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [userState, setUserState] = useState({});
  const [loading, setLoading] = useState(false);

  const { updateUser, deleteUser } = useAuth();

  useEffect(() => {
    setUserState({
      user_id: user.id || "",
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
      image: user.image || null,
    });
  }, [user]);

  const { formState, onInputChange, setFormState } = useForm(userState);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file && validExtensions(file)) {
      setSelectedImage(URL.createObjectURL(file));
      setFormState({ ...formState, image: file });
    }
  };

  const handlerUpdateUser = async () => {
    const formData = new FormData();
    setLoading(true);
    Object.keys(formState).forEach((key) => {
      formData.append(key, formState[key]);
    });
    const user = await updateUser(formData);
    if (user) {
      setLoading(false);
    }
    setLoading(false);
  };

  const handlerDeleteUser = async () => {
    const response = await deleteUser(user.id);
    if (response) {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <main className="container-fluid bg-black flex z-0 flex-col bg-image-motivo items-center justify-center min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col z-10 justify-center items-center p-3 duration-200 ease-in-out cursor-pointer text-center w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black border-2 border-slate-800 shadow-slate-600 shadow-md min-h-svh text-white mb-10 lg:mb-4">
        <div className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2">
          <div className="flex flex-col  items-center justify-around   md:p-5  lg:p-5 w-full md:w-1/2">
            <div
              onClick={handleClick}
              className="flex items-start justify-start h-36 w-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-56 lg:h-56 relative group"
            >
              <span className="absolute top-0 right-0 sm:top-1 sm:right-1 md:top-2 md:right-2  z-50 transform group-hover:scale-110 font-semibold bg-lime-500 text-white p-2 rounded-full text-xxs transition ease-in-out duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </span>

              <img
                className="object-cover h-full w-full rounded-full border-2 hover:border-4 border-lime-500 transition ease-in-out duration-200 hover:scale-110 shadow-md hover:shadow-lime-500"
                src={selectedImage || user.image}
                alt="user image"
              />

              <input
                type="file"
                name="image"
                ref={inputFileRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <h1 className="font-extrabold mt-3 text-xl md:text-2xl">
              Cambiar Avatar
            </h1>
            <div className="relative w-full my-2">
              <input
                className="w-full border border-gray-300 rounded-lg p-2 pt-3 lg:pt-4 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={onInputChange}
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="absolute top-2 left-3 text-gray-500 text-sm transition-all transform -translate-y-1/2 px-1"
              >
                Nombre:
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                className="w-full border border-gray-300 rounded-lg p-2 pt-3 lg:pt-4 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                type="text"
                name="lastName"
                id="lastName"
                value={formState.lastName}
                onChange={onInputChange}
                placeholder=" "
                required
              />
              <label
                htmlFor="lastName"
                className="absolute top-2 left-3 text-gray-500 text-sm transition-all transform -translate-y-1/2 px-1"
              >
                Apellido:
              </label>
              <div className="relative w-full my-3">
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 pt-3 lg:pt-4 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="email"
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={onInputChange}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute top-2 left-3 text-gray-500 text-sm transition-all transform -translate-y-1/2 px-1"
                >
                  Correo:
                </label>
              </div>
            </div>
            <button
              onClick={handlerUpdateUser}
              className={`bg-lime-400 w-full p-2 font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 hover:scale-110 text-white rounded-md px-5 py-2 flex justify-center items-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading && (
                <span className="flex items-center">
                  <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
                </span>
              )}
              <span>Guardar cambios</span>
            </button>
            <Link className="w-full" to={"/profile"}>
              <button className="p-2 w-full my-2 rounded-md bg-black border-2 font-semibold hover:brightness-110 hover:scale-110 transition ease-in-out duration-200">
                Volver
              </button>
            </Link>
            <button
              onClick={handlerDeleteUser}
              className="p-3 w-full my-2 rounded-md border-2 border-black hover:border-red-500 text-red-500 font-bold hover:brightness-125 hover:scale-110 transition ease-in-out duration-200"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
