// import vaccine from "../assets/vaccine.svg";
import addimages from "../assets/addimages.svg";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

export function Vaccines() {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetChange = (event) => {
    const petId = event.target.value;
    const selected = user.pets.find((pet) => pet.id === parseInt(petId));
    setSelectedPet(selected);
  };

  const vaccines = selectedPet?.vaccines || [];

  // console.log("datos mascota del usuario:", selectedPet);
  console.log(user.pets);

  return (
    <main className="container-fluid bg-slate-100 flex flex-col items-center min-h-screen p-5">
      <div className="flex flex-col lg:flex-row justify-around p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-5 h-60">
        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="font-extrabold md:text-2xl">Registro de Vacunas</h1>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
            <label className="text-m font-medium text-white">
              Buscar por mascota:
            </label>
            <select
              className="block w-full md:w-60 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handlePetChange}
            >
              <option value="">Selecciona una mascota</option>
              {user.pets && user.pets.length > 0 ? (
                user.pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))
              ) : (
                <option value="">No tienes mascotas registradas</option>
              )}
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-12 lg:w-32 hover:invert"
            src={addimages}
            alt="añadir vacuna"
          ></img>
        </div>
      </div>

      {/* INFORMACIÓN PRINCIPAL DE LA VACUNA */}
      {selectedPet && vaccines.length > 0
        ? vaccines.map((vaccine, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-slate-100 text-black mb-3 h-30 lg:h-32"
            >
              <div className="flex items-center justify-around w-full p-2 text-xs lg:text-base lg:p-8">
                <div>
                  <img
                    className="w-9 lg:w-16 hover:invert"
                    src={vaccine}
                    alt="vaccine"
                  />
                </div>
                <ul className="flex justify-evenly items-center gap-5 w-full">
                  <li className="font-extrabold">
                    Vacuna de {selectedPet.name}
                  </li>
                  <li className="font-extrabold">
                    Tipo de Vacuna: {vaccine.vaccine}
                  </li>
                  <li className="font-extrabold">Fecha: {vaccine.date}</li>
                </ul>
              </div>
            </div>
          ))
        : selectedPet && <p>No hay vacunas registradas para esta mascota</p>}

      {/* INFORMACIÓN ADICIONAL DE LA VACUNA */}
      <div className="flex flex-col justify-center items-center p-3 text-center w-full max-w-3xl rounded-xl bg-black text-white mb-3 h-40 lg:h-60">
        <h2 className="font-extrabold text-lg mb-2">Detalles de la Vacuna:</h2>
        <div className="w-full border-t border-gray-400 mb-3"></div>
        {selectedPet ? (
          <ul className="flex flex-col justify-center w-full">
            <li className="text-sm">Vacuna de: {selectedPet.name}</li>
            <li className="text-sm">
              Tipo de vacuna: {selectedPet.vaccine?.name}
            </li>
            <li className="text-sm">
              Fecha de aplicación: {selectedPet.vaccine?.date}
            </li>
            <li className="text-sm">
              Peso (gramos): {selectedPet.vaccine?.weight}
            </li>
            <li className="text-sm">
              Próxima dosis: {selectedPet.vaccine?.next_vaccine}
            </li>
          </ul>
        ) : (
          <p>No hay detalles disponibles.</p>
        )}
      </div>

      {/* MAL INTENTO */}
      {/* <div className="flex flex-col justify-center items-center p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-slate-100 text-black mb-3 h-30 lg:h-32">
        <div className="flex items-center justify-around w-full p-2 text-xs lg:text-base lg:p-8">
          <div>
            <img className="w-9 lg:w-16 hover:invert" src={vaccine} alt="" />
          </div>
          <ul>
            <li className="font-extrabold">Vacuna de {selectedPet.name}</li>
            <li className="font-extrabold">
              Tipo de Vacuna: {vaccine.vaccine}
            </li>
            <li className="font-extrabold">Fecha: {vaccine.date}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-3 text-center w-full max-w-3xl rounded-xl bg-dark-yellow text-black mb-3 h-40 lg:h-48">
        <h2 className="font-extrabold text-lg mb-2">Detalles de la Vacuna:</h2>
        <div className="w-full border-t border-gray-400 mb-3"></div>
        <ul className="flex flex-col justify-center w-full">
          <li className="text-sm">Vacuna de: {vaccine.pet_id}</li>
          <li className="text-sm">Tipo de vacuna: {vaccine.name}</li>
          <li className="text-sm">Fecha de aplicación: {vaccine.date}</li>
          <li className="text-sm">Peso (gramos): {vaccine.weight}</li>
          <li className="text-sm">Proxima dosis: {vaccine.next_vaccine}</li>
        </ul>
        <img className="w-10 lg:w-20" src={vaccine.image} alt="" />
      </div> */}
    </main>
  );
}
