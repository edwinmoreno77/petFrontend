import { useContext, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { usePet } from "../../hooks/usePet";
import { validExtensions } from "../../utils/validateExtension";
import add from "../../assets/addImages.svg";
import logo from "../../assets/logo.png";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const petformfields = {
  user_id: "",
  name: "",
  animal: "",
  race: "",
  birthday: "",
  image: "",
};

export const CreatePetForm = () => {
  const { createPet } = usePet();
  const { formState, onInputChange, setFormState, onResetForm } =
    useForm(petformfields);

  const { store } = useContext(Context);
  const { user } = store.userState;

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && validExtensions(file)) {
      setSelectedImage(URL.createObjectURL(file));
      setFormState({ ...formState, image: file, user_id: user.id });
    }
  };
  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handlerCreatePet = async (e, formState) => {
    e.preventDefault();

    const form = e.target.closest("form");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);

    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(key, formState[key]);
    });

    const response = await createPet(formData);
    if (response) {
      navigate("/profile");
      onResetForm();
    }

    setLoading(false);
  };

  return (
    <section className="mb-5">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-48">
          <img
            src={logo}
            className="object-contain w-full h-full"
            alt="petcenter"
          />
        </div>
      </div>
      <h1 className="text-center font-bold text-2xl">Agrega tu mascota!</h1>
      <form className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 w-full p-5 my-5 rounded-lg transition-all duration-200 ease-in-out">
        <div className="flex lg:flex-col justify-center font-bold mt-3 2xl:my-5">
          <div
            className="flex items-center justify-center bg-slate-100 w-44 h-44 xl:h-44 xl:w-44 2xl:w-44 2xl:h-44 rounded-lg shadow-inner shadow-gray-500/50 ease-in-out duration-200 hover:scale-105 cursor-pointer"
            onClick={handleClick}
          >
            <img
              src={selectedImage || add}
              alt="image"
              className={`object-cover ${
                selectedImage
                  ? "w-full h-full border-x-2 border-y-2 border-slate-600 rounded-lg shadow-md hover:shadow-xl hover:brightness-105"
                  : ""
              }`}
            />
          </div>
          <input
            type="file"
            name="image"
            ref={inputFileRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex flex-col w-full justify-center gap-3">
          <div className="relative w-full">
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
          <div className="relative w-full">
            <input
              className="w-full border border-gray-300 rounded-lg p-2 pt-3 lg:pt-4 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
              type="text"
              name="animal"
              id="animal"
              value={formState.animal}
              onChange={onInputChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="animal"
              className="absolute top-2 left-3 text-gray-500 text-sm transition-all transform -translate-y-1/2 px-1"
            >
              Animal:
            </label>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center gap-3">
          <div className="relative w-full">
            <input
              className="w-full border border-gray-300 rounded-lg p-2 pt-3 lg:pt-4 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
              type="text"
              name="race"
              id="race"
              value={formState.race}
              onChange={onInputChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="race"
              className="absolute top-2 left-3 text-gray-500 text-sm transition-all transform -translate-y-1/2 px-1"
            >
              Raza:
            </label>
          </div>
          <div className="relative w-full">
            <input
              className="w-full border border-gray-300 rounded-lg p-2 pt-3 lg:pt-4 text-black focus:outline-none focus:ring-1 focus:ring-gray-400"
              type="date"
              name="birthday"
              id="birthday"
              value={formState.birthday}
              onChange={onInputChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="birthday"
              className="absolute top-2 left-3 text-gray-500 text-sm transition-all transform -translate-y-1/2 px-1"
            >
              Cumpleaños:
            </label>
          </div>
        </div>
        <div className="flex mt-2 md:mt-0 md:flex-col gap-2">
          <button
            type="submit"
            onClick={(e) => handlerCreatePet(e, formState)}
            className={`bg-lime-400 font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 text-white rounded-md px-5 py-2 flex justify-center items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading && (
              <span className="flex items-center">
                <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
              </span>
            )}
            <span>Agregar</span>
          </button>
          <button className="bg-lime-500 py-2 px-5 hover:bg-lime-400 rounded-lg">
            <Link to={"/profile"}>Volver</Link>
          </button>
        </div>
      </form>
    </section>
  );
};
