import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { citiesByRegion } from "../../const/citiesByRegion";
import { validExtensions } from "../../utils/validateExtenion";
import add from "../../assets/addImages.svg";
import { useAuth } from "../../hooks/useAuth";
import { Context } from "../../store/appContext";

const registerFormFields = {
  name: "",
  lastName: "",
  rut: "",
  email: "",
  password: "",
  region: "",
  comuna: "",
  direction: "",
  cellphone: "",
  image: "",
};

export const FormRegister = () => {
  const { createUser } = useAuth();
  const [availableComunas, setAvailableComunas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { formState, onInputChange, setFormState, onResetForm } =
    useForm(registerFormFields);

  const { store } = useContext(Context);
  const { userStatus } = store.userState;

  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && validExtensions(file)) {
      setSelectedImage(URL.createObjectURL(file));
      setFormState({ ...formState, image: file });
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    formState.region
      ? setAvailableComunas(citiesByRegion[formState.region] || [])
      : setAvailableComunas([]);
  }, [formState.region]);

  const handlerCreateUser = async (e, formState) => {
    e.preventDefault();

    const form = e.target.closest("form");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      formData.append(key, formState[key]);
    });

    const response = await createUser(formData);
    if (response) {
      onResetForm();
      navigate("/perfil");
    }
  };

  return (
    <form className="bg-white w-80 md:w-6/12 lg:min-w-1/4 shadow-lg rounded-2xl my-2">
      <div className="flex justify-center font-bold mt-3 2xl:my-5">
        <div
          className="flex items-center justify-center bg-slate-100 w-28 h-28 2xl:h-36 2xl:w-36 rounded-lg shadow-inner shadow-gray-500/50 ease-in-out duration-200 hover:scale-105 cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={selectedImage || add}
            alt="image"
            className={`object-cover ${
              selectedImage
                ? "w-full h-full border-x-2 border-y-2 border-slate-600 rounded-lg shadow-md  hover:shadow-xl hover:brightness-105"
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
      <div className="flex flex-col justify-center px-5 py-2 md:py-1">
        <label className="text-xs" htmlFor="name">
          Nombre:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={onInputChange}
          required
        />
        <label className="text-xs" htmlFor="lastName">
          Apellido:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          id="lastName"
          name="lastName"
          value={formState.lastName}
          onChange={onInputChange}
          required
        />
        <label className="text-xs" htmlFor="rut">
          Rut:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          id="rut"
          name="rut"
          placeholder="11111111-1"
          maxLength={10}
          value={formState.rut}
          onChange={onInputChange}
          required
        />
        <label className="text-xs" htmlFor="email">
          Correo:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="email"
          id="email"
          name="email"
          placeholder="correo@ejemplo.com"
          value={formState.email}
          onChange={onInputChange}
          required
        />
        <label className="text-xs" htmlFor="password">
          Contraseña:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="password"
          id="password"
          name="password"
          placeholder="******"
          value={formState.password}
          onChange={onInputChange}
          autoComplete="true"
          required
        />
        <label className="text-xs" htmlFor="region">
          Region:
        </label>
        <select
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          id="region"
          name="region"
          value={formState.region}
          onChange={onInputChange}
          required
        >
          <option className="text-xs" disabled value="">
            Selecciona una región
          </option>
          <option className="text-xs" value="Arica y Parinacota">
            Arica y Parinacota
          </option>
          <option className="text-xs" value="Tarapacá">
            Tarapacá
          </option>
          <option className="text-xs" value="Antofagasta">
            Antofagasta
          </option>
          <option className="text-xs" value="Atacama">
            Atacama
          </option>
          <option className="text-xs" value="Coquimbo">
            Coquimbo
          </option>
          <option className="text-xs" value="Valparaíso">
            Valparaíso
          </option>
          <option
            className="text-xs"
            value="Región del Libertador Gral. Bernardo O’Higgins"
          >
            Región del Libertador Gral. Bernardo O’Higgins
          </option>
          <option className="text-xs" value="Región del Maule">
            Región del Maule
          </option>
          <option className="text-xs" value="Región del Biobío">
            Región del Biobío
          </option>
          <option className="text-xs" value="Región de la Araucanía">
            Región de la Araucanía
          </option>
          <option className="text-xs" value="Región de Los Ríos">
            Región de Los Ríos
          </option>
          <option className="text-xs" value="Región de Los Lagos">
            Región de Los Lagos
          </option>
          <option
            className="text-xs"
            value="Región Aisén del Gral. Carlos Ibáñez del Campo"
          >
            Región Aisén del Gral. Carlos Ibáñez del Campo
          </option>
          <option
            className="text-xs"
            value="Región de Magallanes y de la Antártica Chilena"
          >
            Región de Magallanes y de la Antártica Chilena
          </option>
          <option className="text-xs" value="Región Metropolitana de Santiago">
            Región Metropolitana de Santiago
          </option>
        </select>

        <label className="text-xs" htmlFor="comuna">
          Comuna:
        </label>
        <select
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          id="comuna"
          name="comuna"
          title="comuna"
          value={formState.comuna}
          onChange={onInputChange}
          required
        >
          <option className="text-xs" disabled value="">
            Selecciona una Comuna
          </option>
          {availableComunas.map((comuna) => (
            <option key={comuna} value={comuna}>
              {comuna}
            </option>
          ))}
        </select>
        <label className="text-xs" htmlFor="direction">
          Dirección:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          id="direction"
          name="direction"
          direction="direction"
          value={formState.direction}
          onChange={onInputChange}
          required
        />
        <label className="text-xs" htmlFor="cellphone">
          Telefono:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 2xl:p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
          id="cellphone"
          name="cellphone"
          value={formState.cellphone}
          onChange={onInputChange}
          required
        />
        <p className="mt-2 font-extralight text-sm text-center">
          ¿Ya tienes cuenta? Entonces{" "}
          <Link
            to={"/login"}
            className="underline font-semibold text-lime-600 hover:brightness-125 cursor-pointer"
          >
            inicia seseión
          </Link>
        </p>
        <button
          type="submit"
          onClick={(e) => handlerCreateUser(e, formState)}
          className="bg-lime-400 font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 text-white rounded-md mx-4 my-3 px-1 py-2 flex justify-center items-center"
        >
          <span
            className={
              userStatus == "checking" ? "flex items-center" : "hidden"
            }
          >
            <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
          </span>
          <span>Crear Cuenta</span>
        </button>
      </div>
    </form>
  );
};
