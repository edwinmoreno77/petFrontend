import { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import { useForm } from "../../hooks/useForm";
import { useVaccine } from "../../hooks/useVaccine";
import { validExtensions } from "../../utils/validateExtension";
import Swal from "sweetalert2";

const vaccineFormFields = {
  pet_id: "",
  date: "",
  weight: "",
  vaccine: "",
  nextVaccine: "",
  image: "",
};

export const FormVaccines = ({ onVaccineAdded }) => {
  const { createVaccine } = useVaccine();
  const { store } = useContext(Context);
  const { user } = store.userState;
  const inputFileRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedPetAnimal, setSelectedPetAnimal] = useState("");
  const [loading, setLoading] = useState(false);

  const { formState, onInputChange, setFormState, onResetForm } =
    useForm(vaccineFormFields);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && validExtensions(file)) {
      setFormState({ ...formState, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formState.petId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Selecciona una mascota válida antes de enviar",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pet_id", formState.petId);
    formData.append("date", formState.date);
    formData.append("weight", formState.weight);
    formData.append("vaccine", formState.vaccine);
    formData.append("nextVaccine", formState.nextVaccine);

    if (formState.image) {
      formData.append("image", formState.image);
    }

    try {
      const response = await createVaccine(formData);
      if (response && response.success) {
        onResetForm();
        closeModal();

        if (onVaccineAdded) onVaccineAdded();
      }
    } catch (error) {
      console.error("Error al enviar la vacuna:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePetNameChange = (e) => {
    const petName = e.target.value;
    const selectedPet = user.owned_pets.find((pet) => pet.name === petName);

    setFormState({
      ...formState,
      petName,
      petId: selectedPet ? selectedPet.id : "",
    });
    setSelectedPetAnimal(selectedPet ? selectedPet.animal : "");
  };

  return (
    isModalOpen && (
      <div
        id="modal"
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black text-xs w-80 shadow-white shadow-equal rounded-2xl p-4 h-auto"
        >
          <h1 className="bg-black text-white text-center text-sm font-bold p-3 rounded-t-xl">
            Registro de Vacuna
          </h1>
          <div className="my-3">
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label>Nombre de la Mascota: </label>
              <input
                type="text"
                name="petName"
                value={formState.petName}
                onChange={handlePetNameChange}
                required
                list="petNames"
                placeholder="Selecciona a tu mascota"
                className="input-style bg-white text-black w-full"
              />
              <datalist id="petNames">
                <option value="" disabled>
                  Selecciona a tu mascota
                </option>
                {user?.owned_pets.map((pet) => (
                  <option key={pet.id} value={pet.name} />
                ))}
              </datalist>
            </div>
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label>Fecha de la Vacuna: </label>
              <input
                type="text"
                name="date"
                value={formState.date}
                onChange={onInputChange}
                required
                placeholder="DD/MM/AAAA"
                pattern="\d{2}/\d{2}/\d{4}"
                title="Formato de fecha: DD/MM/AAAA"
                className="input-style bg-white text-black w-full"
              />
            </div>
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label>Peso de la Mascota (g): </label>
              <input
                type="number"
                name="weight"
                value={formState.weight}
                onChange={onInputChange}
                required
                placeholder="Ingresa el peso en gramos"
                className="input-style bg-white text-black w-full"
              />
            </div>
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label> Tipo de Vacuna: </label>
              <input
                type="text"
                name="vaccine"
                value={formState.vaccine}
                onChange={onInputChange}
                required
                list="vaccineOptions"
                placeholder="Selecciona el tipo de vacuna"
                className="input-style bg-white text-black w-full"
              />
              <datalist id="vaccineOptions">
                {selectedPetAnimal === "Gato" && (
                  <>
                    <option value="Antirrábica" />
                    <option value="Triple Felina" />
                    <option value="Leucemia Felina" />
                  </>
                )}
                {selectedPetAnimal === "Perro" && (
                  <>
                    <option value="Antirrábica" />
                    <option value="Parvovirus" />
                    <option value="Hepatitis" />
                    <option value="Moquillo" />
                    <option value="Pentavalente" />
                    <option value="Polivalente" />
                  </>
                )}
              </datalist>
            </div>
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label>Próxima Dosis: </label>
              <input
                type="text"
                name="nextVaccine"
                value={formState.nextVaccine}
                onChange={onInputChange}
                required
                placeholder="DD/MM/AAAA"
                pattern="\d{2}/\d{2}/\d{4}"
                title="Formato de fecha: DD/MM/AAAA"
                className="input-style bg-white text-black w-full"
              />
            </div>

            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label htmlFor="image">Imagen de vacuna:</label>
              <input
                id="image"
                type="file"
                name="image"
                ref={inputFileRef}
                className="block input-style bg-white text-black w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-white file:text-blue-700 hover:file:bg-gray-800"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex flex-row justify-around text-sm mt-5">
              <button
                type="button"
                className="submit-button bg-gray-600 text-white font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 rounded-md px-6 py-1 mb-3"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex justify-center items-center bg-primary-green text-white font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 rounded-md px-6 py-1 mb-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading && (
                  <span className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
                  </span>
                )}
                <span>Registrar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

FormVaccines.propTypes = {
  onVaccineAdded: PropTypes.func,
};
