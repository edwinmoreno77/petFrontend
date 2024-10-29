import { useState, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import add from "../assets/addImages.svg";
import { validExtensions } from "../utils/validateExtension";

const vaccineFormFields = {
  petName: "",
  date: "",
  weight: "",
  vaccine: "",
  nextVaccine: "",
  image: "",
};

export const FormVaccines = () => {
  const { createVaccine } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { formState, onInputChange, setFormState, onResetForm } =
    useForm(vaccineFormFields);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(key, formState[key]);
    });
    const response = await createVaccine(formData);
    if (response && response.success) {
      onResetForm();
      setSelectedImage(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
      <div
        id="modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white text-xs w-80 shadow-lg rounded-2xl p-1 h-96"
        >
          <h1 className="bg-black text-white text-center font-bold p-2 rounded-t-xl">
            Registro de Vacuna
          </h1>
          <div className="mt-6">
            <div className=" bg-black text-white rounded-xl my-3 py-1 px-2">
              <label>Nombre de la Mascota:</label>
              <input
                type="text"
                name="petName"
                value={formState.petName}
                onChange={onInputChange}
                required
                className="input-style  bg-black text-white"
              />
            </div>
            <div className=" bg-black text-white rounded-xl my-3 py-1 px-2">
              <label>Fecha:</label>
              <input
                type="date"
                name="date"
                value={formState.date}
                onChange={onInputChange}
                required
                className="input-style  bg-black text-white"
              />
            </div>
            <div className=" bg-black text-white rounded-xl my-3 py-1 px-2">
              <label>Peso (g):</label>
              <input
                type="number"
                name="weight"
                value={formState.weight}
                onChange={onInputChange}
                required
                className="input-style  bg-black text-white"
              />
            </div>
            <div className=" bg-black text-white rounded-xl my-3 py-1 px-2">
              <label>Vacuna:</label>
              <input
                type="text"
                name="vaccine"
                value={formState.vaccine}
                onChange={onInputChange}
                required
                className="input-style  bg-black text-white"
              />
            </div>
            <div className=" bg-black text-white rounded-xl my-3 py-1 px-2">
              <label>Próxima Dosis:</label>
              <input
                type="date"
                name="nextVaccine"
                value={formState.nextVaccine}
                onChange={onInputChange}
                required
                className="input-style  bg-black text-white"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="image-container" onClick={handleClick}>
                <img
                  src={selectedImage || add}
                  alt="image"
                  className="image-style w-6"
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

            <div className="flex flex-row justify-around text-sm">
              <button
                type="button"
                className="submit-button bg-black text-white font-bold rounded-md px-3 py-1 mb-3"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="submit-button bg-primary-green text-white font-bold rounded-md px-3 py-1 mb-3"
              >
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};
