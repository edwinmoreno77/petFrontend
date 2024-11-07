import dewormingAddIcon from "../assets/dewormingAddIcon.svg";
import dewormingIcon from "../assets/dewormingIcon.svg";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FormDewormings } from "../components/dewormings/FormDewormings";

export function Dewormings() {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [selectedPet, setSelectedPet] = useState(null);
  const [dewormings, setDewormings] = useState([]);
  const [selectedDeworming, setSelectedDeworming] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const petsPerPage = 3;

  const handlePetChange = async (petId) => {
    const selected = user.pets.find((pet) => pet.id === parseInt(petId));
    setSelectedPet(selected);

    // LLAMADA AL BACKEND, DESPARACITACIONES POR MASCOTA----------------------------
    if (petId) {
      try {
        const response = await fetch(
          `http://localhost:5004/getDewormingsByPet/${petId}`
        );
        const data = await response.json();

        if (response.ok) {
          setDewormings(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching dewormings:", error);
      }
    }
  };

  const handleDewormingClick = (deworming) => {
    if (selectedDeworming === deworming) {
      setSelectedDeworming(null);
    } else {
      setSelectedDeworming(deworming);
    }
  };

  const nextPage = () => {
    if (currentIndex < Math.floor(user.pets.length / petsPerPage)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const displayedPets = user.pets.slice(
    currentIndex * petsPerPage,
    (currentIndex + 1) * petsPerPage
  );

  return (
    <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center min-h-screen p-5">
      <div className="flex flex-col lg:flex-row justify-around z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-5 h-80">
        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="font-extrabold md:text-2xl">
            Registro de Desparasitaciones
          </h1>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
            {/* CARROUSEL------------------------------------ */}
            <div className="flex items-center w-80 lg:w-96">
              <button
                onClick={prevPage}
                disabled={currentIndex === 0}
                className="text-xxs md:text-sm p-1 md:p-2 rounded-full  bg-black shadow-sm  hover:bg-lime-500  hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
              >
                &#10094;
              </button>
              <div className="flex overflow-hidden w-full justify-center items-center">
                {displayedPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="relative group flex justify-center items-center p-1 md:p-2"
                    onClick={() => handlePetChange(pet.id)}
                  >
                    <span className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs lg:text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                      {pet.name}
                    </span>
                    <div className="w-16 h-16 lg:w-24 lg:h-24 xl:w-24 xl:h-24 group-hover:shadow-md group-hover:shadow-lime-500 rounded-full">
                      <img
                        className="object-cover w-full h-full group-hover:opacity-80 group-hover:blur-sm group-hover:brightness-50 rounded-full border-4  group-hover:shadow-md group-hover:shadow-lime-500 group-hover:scale-105 duration-200 ease-in-out"
                        src={pet.image}
                        alt={pet.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={nextPage}
                disabled={
                  currentIndex >= Math.floor(user.pets.length / petsPerPage)
                }
                className="text-xxs md:text-sm p-1 md:p-2 rounded-full  bg-black shadow-sm  hover:bg-lime-500  hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-16 lg:w-32 hover:scale-110 duration-200 ease-in-out hover:brightness-150"
            src={dewormingAddIcon}
            alt="añadir desparasitación"
            onClick={() => setIsFormVisible(!isFormVisible)}
          />
        </div>
      </div>

      {isFormVisible && <FormDewormings />}

      {/* MUESTRA INFORMACIÓN PRINCIPAL DE LAS DESPARASITACIONES DE LA MASCOTA SELECCIONADA */}
      {selectedPet && dewormings.length > 0
        ? dewormings.map((deworming, index) => (
            <div
              key={index}
              onClick={() => handleDewormingClick(deworming)}
              className={`flex flex-col justify-center items-center z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 hover:bg-primary-green ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-3 ${
                selectedDeworming === deworming ? "h-auto" : "h-32"
              }`}
            >
              <div className="flex flex-row items-center justify-around w-full p-2 text-xs lg:text-base lg:p-8">
                <div>
                  <img
                    className="w-9 lg:w-16 hover:invert me-2"
                    src={dewormingIcon}
                    alt="deworming"
                  />
                </div>
                <ul className="flex justify-evenly items-center gap-5 w-full">
                  <li className="font-bold">
                    Desparasitación de: {selectedPet.name}
                  </li>
                  <li className="font-bold">
                    Tipo de Desparasitante: {deworming.medicine}
                  </li>
                  <li className="font-bold">Fecha: {deworming.date}</li>
                </ul>
              </div>

              {/* DETALLES DE LA DESPARASITACIÓN QUE SE MUESTRAN SOLO CUANDO LA SELECCIONAS--------------- */}
              {selectedDeworming === deworming && (
                <div className="flex flex-col justify-center w-full my-6 px-10">
                  <div>
                    <h2 className="font-bold text-base mb-2">
                      Detalles de la Desparasitación:
                    </h2>
                    <div className="w-full border-t border-gray-800 mb-3"></div>
                  </div>

                  <div className="flex flex-row p-2">
                    <ul className="flex flex-col justify-center w-full">
                      <li className="text-sm">
                        Dosis del Desparasitante: {deworming.dose}
                      </li>
                      <li className="text-sm">
                        Peso de {selectedPet.name}(g): {deworming.weight}
                      </li>
                      <li className="text-sm">
                        Próxima Dosis: {deworming.nextDeworming}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))
        : selectedPet &&
          dewormings.length === 0 && (
            <p className="text-white">
              No hay desparasitaciones registradas para {selectedPet.name}
            </p>
          )}
    </main>
  );
}
