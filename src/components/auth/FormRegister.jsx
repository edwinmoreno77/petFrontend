import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useForm } from "../../hooks/useForm";
import { createUser } from "../../api/authRegister";
import { citiesByRegion } from "../../const/citiesByRegion";
import add from "../../assets/addImages.svg";

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

  const [availableComunas, setAvailableComunas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { formState, onInputChange, setFormState, onResetForm } =
    useForm(registerFormFields);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validExtensions = ["png", "jpg", "gif", "jpeg"];
      const extension = file.name.split(".")[1];
      if (!validExtensions.includes(extension)) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La imagen debe ser de tipo: png, jpg, gif, jpeg ",
        });
      }

      setSelectedImage(URL.createObjectURL(file));
      setFormState({ ...formState, image: file });
    }
  };

  useEffect(() => {
    if (formState.region) {
      setAvailableComunas(citiesByRegion[formState.region] || []);
    } else {
      setAvailableComunas([]);
    }
  }, [formState.region]);

  const inputFileRef = useRef(null);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const navigate = useNavigate();

  //TODO: hook handler error messages
  const handlerCreateUser = async (e, formState) => {
    e.preventDefault();

    const form = e.target.closest('form');

    if (!form.checkValidity()) {
      form.reportValidity();
      return; 
    }

    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      formData.append(key, formState[key]);
    });

    const message = await createUser(formData);

    if (message.message == "User already exists") {
      
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message.message,
      });

    } else if (message.message == "User created successfully") {

      Swal.fire({
        position: "center",
        icon: "success",
        title: message.message,
        showConfirmButton: false,
        timer: 2000
      });
      onResetForm();
      navigate("/perfil");

    } else {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message.message,
      });
    }
  };

  return (
    <form className="bg-white w-80 md:w-6/12 lg:min-w-1/4 shadow-lg rounded-2xl my-2">
      <div className="flex justify-center font-bold mt-3 2xl:my-7">
        <div
          className="flex items-center justify-center bg-slate-100 w-28 h-28 2xl:h-40 2xl:w-40 rounded-lg shadow-inner ease-in-out duration-200 hover:scale-105 cursor-pointer"
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
      <div className="flex flex-col justify-center px-3 py-2 md:py-1">
        <label className="text-xs" htmlFor="name">
          Nombre:
        </label>
        <input
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner text-xs p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner text-xs p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="shadow-inner p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
          className="bg-lime-400 font-semibold shadow-md hover:brightness-110  ease-in-out duration-200 text-white rounded-md mx-4 my-3 px-1 py-2"
        >
          Crear Cuenta
        </button>
      </div>
    </form>
  );
};
