import vaccineIcon from "../assets/vaccineIcon.svg";
import addimages from "../assets/addimages.svg";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FormVaccines } from "../components/vaccines/FormVaccines";

export function Vaccines() {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [selectedPet, setSelectedPet] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const petsPerPage = 3;

  const handlePetChange = async (petId) => {
    const selected = user.pets.find((pet) => pet.id === parseInt(petId));
    setSelectedPet(selected);

    // LLAMADA AL BACKEND, VACUNAS POR MASCOTA----------------------------
    if (petId) {
      try {
        const response = await fetch(
          `http://localhost:5004/getVaccinesByPet/${petId}`
        );
        const data = await response.json();

        if (response.ok) {
          setVaccines(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    }
  };

  const handleVaccineClick = (vaccine) => {
    if (selectedVaccine === vaccine) {
      setSelectedVaccine(null);
    } else {
      setSelectedVaccine(vaccine);
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
          <h1 className="font-extrabold md:text-2xl">Registro de Vacunas</h1>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
            {/* CARROUSEL------------------------------------ */}
            <div className="flex items-center w-80 lg:w-96">
              <button
                onClick={prevPage}
                disabled={currentIndex === 0}
                className="text-xxs md:text-sm mb-8 p-1 md:p-2 rounded-full  bg-black shadow-sm  hover:bg-lime-500  hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
              >
                &#10094;
              </button>
              <div className="flex overflow-hidden w-full">
                {displayedPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex-shrink-0 w-1/3 p-2 flex flex-col items-center"
                  >
                    <img
                      className="border-4 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 min-h-10 max-h-28"
                      src={pet.image}
                      alt={pet.name}
                      onClick={() => handlePetChange(pet.id)}
                    />
                    <div className="mt-2 text-white font-semibold text-center">
                      {pet.name}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={nextPage}
                disabled={
                  currentIndex >= Math.floor(user.pets.length / petsPerPage)
                }
                className="text-xxs md:text-sm mb-8 p-1 md:p-2 rounded-full  bg-black shadow-sm  hover:bg-lime-500  hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-12 lg:w-32 hover:invert"
            src={addimages}
            alt="añadir vacuna"
            onClick={() => setIsFormVisible(!isFormVisible)}
          />
        </div>
      </div>

      {isFormVisible && <FormVaccines />}

      {/* MUESTRA INFORMACIÓN PRINCIPAL DE LAS VACUNAS DE LA MASCOTA SELECCIONADA */}
      {selectedPet && vaccines.length > 0
        ? vaccines.map((vaccine, index) => (
            <div
              key={index}
              onClick={() => handleVaccineClick(vaccine)}
              className={`flex flex-col justify-center items-center z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 hover:bg-primary-green ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-3 ${
                selectedVaccine === vaccine ? "h-auto" : "h-32"
              }`}
            >
              <div className="flex flex-row items-center justify-around w-full p-2 text-xs lg:text-base lg:p-8">
                <div>
                  <img
                    className="w-9 lg:w-16 hover:invert"
                    src={vaccineIcon}
                    alt="vaccine"
                  />
                </div>
                <ul className="flex justify-evenly items-center gap-5 w-full">
                  <li className="font-bold">Vacuna de {selectedPet.name}</li>
                  <li className="font-bold">
                    Tipo de Vacuna: {vaccine.vaccine}
                  </li>
                  <li className="font-bold">Fecha: {vaccine.date}</li>
                </ul>
              </div>

              {/* DETALLES DE LA VACUNA QUE SE MUESTRAN SOLO CUANDO LA SELECCIONAS--------------- */}
              {selectedVaccine === vaccine && (
                <div className="flex flex-col justify-center w-full my-6 px-10">
                  <div>
                    <h2 className="font-bold text-base mb-2">
                      Detalles de la Vacuna:
                    </h2>
                    <div className="w-full border-t border-gray-800 mb-3"></div>
                  </div>

                  <div className="flex flex-row p-2">
                    <ul className="flex flex-col justify-center w-full">
                      <li className="text-sm">
                        Peso de {selectedPet.name}(g): {vaccine.weight}
                      </li>
                      <li className="text-sm">
                        Próxima Dosis: {vaccine.nextVaccine}
                      </li>
                    </ul>

                    <img
                      className="w-1/2 p-5"
                      src={vaccine.image}
                      alt="vaccine"
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        : selectedPet && <p>No hay vacunas registradas para esta mascota</p>}
    </main>
  );
}
