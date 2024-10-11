import { useEffect, useRef, useState } from "react";
import { citiesByRegion } from "../utils/citiesByRegion";
import add from "../assets/addImages.svg";
import pets_register from "../assets/pet_register.png";
import { Link } from "react-router-dom";

export const Register = () => {
  const registerFormFields = {
    name: "",
    lastName: "",
    rut: "",
    email: "",
    password: "",
    region: "",
    comuna: "",
    direction: "",
    phone: "",
  };
  const [formState, setFormState] = useState(registerFormFields);
  const [availableComunas, setAvailableComunas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
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

  return (
    <>
      <div className="container-fluid lg:flex justify-between bg-slate-100  min-h-screen text-slate-600">
        <form className="flex flex-col items-center justify-center bg-slate-100 lg:-me-4 rounded-e-2xl z-10 lg:w-full">
          <h1 className="text-center font-bold p-2">Crear cuenta</h1>
          <div className=" bg-white w-80 md:w-6/12 lg:min-w-1/4 shadow-lg rounded-xl mb-3">
            <div className="flex justify-center font-bold my-10">
              <div
                className="flex items-center justify-center bg-slate-100 w-36 h-32 lg:w-44 lg:h-40 rounded-lg shadow-inner ease-in-out duration-200 hover:scale-105 cursor-pointer"
                onClick={handleClick}
              >
                <img
                  src={selectedImage || add}
                  alt="image"
                  className={`object-contain ${
                    selectedImage
                      ? "border-x-2 border-y-2 border-slate-600 rounded-lg shadow-md hover:shadow-xl hover:brightness-105"
                      : ""
                  }`}
                />
              </div>
              <input
                type="file"
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
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                id="rut"
                name="rut"
                value={formState.rut}
                onChange={onInputChange}
                required
              />
              <label className="text-xs" htmlFor="email">
                Correo:
              </label>
              <input
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                id="email"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                required
              />
              <label className="text-xs" htmlFor="password">
                Contraseña:
              </label>
              <input
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={onInputChange}
                required
              />
              <label className="text-xs" htmlFor="region">
                Region:
              </label>
              <select
                className="shadow-inner text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
                <option
                  className="text-xs"
                  value="Región Metropolitana de Santiago"
                >
                  Región Metropolitana de Santiago
                </option>
              </select>

              <label className="text-xs" htmlFor="comuna">
                Comuna:
              </label>
              <select
                className="shadow-inner text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                id="direction"
                name="direction"
                direction="direction"
                value={formState.direction}
                onChange={onInputChange}
                required
              />
              <label className="text-xs" htmlFor="phone">
                Telefono:
              </label>
              <input
                className="shadow-inner p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={onInputChange}
                required
              />
              <p className="m-3 font-extralight text-sm text-center">
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
                className="bg-lime-400 font-semibold shadow-md hover:brightness-110  ease-in-out duration-200 text-white rounded-md m-4 px-1 py-2"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </form>
        <div className="hidden lg:flex w-full bg-slate-200 justify-center items-center">
          <img
            className="object-cover h-full w-full"
            src={pets_register}
            alt=""
          />
        </div>
      </div>
    </>
  );
};
