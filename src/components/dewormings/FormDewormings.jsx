import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import { useForm } from "../../hooks/useForm";
import { useDeworming } from "../../hooks/useDeworming";
import Swal from "sweetalert2";

const dewormingFormFields = {
  pet_id: "",
  date: "",
  medicine: "",
  dose: "",
  weight: "",
  nextDeworming: "",
};

export const FormDewormings = ({ onDewormingAdded }) => {
  const { createDeworming } = useDeworming();
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const { formState, onInputChange, setFormState, onResetForm } =
    useForm(dewormingFormFields);

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

    const payload = {
      pet_id: formState.petId,
      date: formState.date,
      medicine: formState.medicine,
      dose: formState.dose,
      weight: formState.weight,
      nextDeworming: formState.nextDeworming,
    };

    try {
      const response = await createDeworming(payload);
      if (response && response.success) {
        onResetForm();
        closeModal();

        if (onDewormingAdded) onDewormingAdded();
      }
    } catch (error) {
      console.error("Error al enviar la desparasitación:", error);
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
            Registro de Desparasitación
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
                {user.owned_pets.map((pet) => (
                  <option key={pet.id} value={pet.name} />
                ))}
              </datalist>
            </div>
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label>Fecha de la Desparasitación: </label>
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
              <label>Desparasitante Utilizado: </label>
              <input
                type="text"
                name="medicine"
                value={formState.medicine}
                onChange={onInputChange}
                required
                placeholder="Ingresa el nombre del desparacitante utilizado"
                className="input-style bg-white text-black w-full"
              />
            </div>
            <div className="bg-white text-black rounded-xl my-2 py-1 px-2">
              <label>Dosis Utilizada: </label>
              <input
                type="text"
                name="dose"
                value={formState.dose}
                onChange={onInputChange}
                required
                placeholder="Ingresa la dosis del desparasitante utilizado"
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
              <label>Próxima Dosis: </label>
              <input
                type="text"
                name="nextDeworming"
                value={formState.nextDeworming}
                onChange={onInputChange}
                required
                placeholder="DD/MM/AAAA"
                pattern="\d{2}/\d{2}/\d{4}"
                title="Formato de fecha: DD/MM/AAAA"
                className="input-style bg-white text-black w-full"
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

FormDewormings.propTypes = {
  onDewormingAdded: PropTypes.func,
};
