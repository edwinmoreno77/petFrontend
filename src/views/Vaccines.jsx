import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FormVaccines } from "../components/vaccines/FormVaccines";
import vaccineAddIcon from "../assets/vaccineAddIcon.svg";
import vaccineIcon from "../assets/vaccineIcon.svg";
import Swal from "sweetalert2";

export function Vaccines() {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [selectedPet, setSelectedPet] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();
  const petsPerPage = 3;

  const fetchVaccines = async (petId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5004/getVaccinesByPet/${petId}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();

      if (response.status == 200) {
        setVaccines(data.data);
      } else if (response.status == 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Su sesión ha expirado",
        }).then(() => {
          navigate("/login");
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching vaccines:", error);
    }
  };

  const handlePetChange = (petId) => {
    const selected = user.owned_pets.find((pet) => pet.id === parseInt(petId));
    setSelectedPet(selected);
    fetchVaccines(petId);
  };

  const handleVaccineClick = (vaccine) => {
    setSelectedVaccine(selectedVaccine === vaccine ? null : vaccine);
  };

  const nextPage = () => {
    if (currentIndex < Math.floor(user.owned_pets?.length / petsPerPage)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const displayedPets = user.owned_pets?.slice(
    currentIndex * petsPerPage,
    (currentIndex + 1) * petsPerPage
  );

  return (
    <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center min-h-screen p-5 pb-20">
      <div className="flex flex-col lg:flex-row justify-around z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-5 h-80">
        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="font-extrabold md:text-2xl">Registro de Vacunas</h1>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
            <div className="flex items-center w-80 lg:w-96">
              <button
                onClick={prevPage}
                disabled={currentIndex === 0}
                className="text-xxs md:text-sm p-1 md:p-2 rounded-full  bg-black shadow-sm  hover:bg-lime-500  hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
              >
                &#10094;
              </button>
              <div className="flex overflow-hidden justify-center items-center w-full">
                {displayedPets?.map((pet) => (
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
                        className="border-4 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 min-h-10 max-h-28"
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
                  currentIndex >=
                  Math.floor(user.owned_pets?.length / petsPerPage)
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
            className="w-16 lg:w-32 hover:scale-110 duration-200 ease-in-out hover:brightness-150 mb-10"
            src={vaccineAddIcon}
            alt="añadir vacuna"
            onClick={() => setIsFormVisible(!isFormVisible)}
          />
        </div>
      </div>

      {isFormVisible && (
        <FormVaccines
          petId={selectedPet?.id}
          onVaccineAdded={() => fetchVaccines(selectedPet.id)}
        />
      )}

      {selectedPet && vaccines.length > 0
        ? vaccines.map((vaccine, index) => (
            <div
              key={index}
              onClick={() => handleVaccineClick(vaccine)}
              className={`flex flex-col justify-center items-center z-10 border-slate-800 shadow-slate-600 shadow-md p-1 hover:scale-105 duration-200 hover:bg-primary-green ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-3 ${
                selectedVaccine === vaccine ? "h-auto" : "h-32"
              }`}
            >
              <div className="flex flex-row items-center justify-around w-full p-2 text-xs lg:text-base lg:p-8">
                <div>
                  <img
                    className="w-9 lg:w-16 hover:invert me-2 p-1"
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
        : selectedPet &&
          vaccines.length === 0 && (
            <p className="text-white">
              No hay vacunas registradas para {selectedPet.name}
            </p>
          )}
    </main>
  );
}
