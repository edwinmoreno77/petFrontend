import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CreatePetForm } from "../components/profile/CreatePetForm";
import logout from "../assets/logout.svg";

import addimages from "../assets/addimages.svg";
import back from "../assets/back.svg";
import { CustomCarousel } from "../components/common/Carousel";
import { ConfigurationOptions } from "../components/profile/configurationOptions";
import { PetCard } from "../components/common/PetCard";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { user } = store.userState;
  const { onLogout } = actions;

  const [addPet, setAddPet] = useState(false);
  const [selectedPet, setSelectedPet] = useState(user.pets[0]);
  const [isSelectedPet, setIsSelectedPet] = useState(false);

  const navigate = useNavigate();

  const hadleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handlerSelectedPet = (pet) => {
    setIsSelectedPet(!selectedPet);
    setSelectedPet(pet);
  };

  const handlerAddPets = () => {
    setIsSelectedPet(!selectedPet);
    setAddPet(!addPet);
  };

  return (
    <main className="container-fluid bg-slate-100 flex flex-col items-center  min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col justify-center items-center p-3 shadow-xl duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-4">
        <div className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2">
          <div className="flex items-center justify-around   md:p-5  lg:p-5 w-96">
            <div className="flex items-start justify-start h-16 w-16 md:w-24 md:h-24">
              <img
                className="object-cover h-full w-full rounded-full"
                src={user.image}
                alt="user image"
              />
            </div>
            <h1 className="font-extrabold text-xl md:text-2xl">{user.name}</h1>
          </div>
          <span onClick={hadleLogout} className="p-5 font-extrabold text-sm">
            <img
              className="w-8 md:w-10 hover:scale-125 duration-200 ease-in-out hover:brightness-150"
              src={logout}
              alt="logout"
            />
          </span>
        </div>
        <ConfigurationOptions />
      </section>
      <div className="flex flex-col justify-center items-center p-3 shadow-xl  duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-4">
        <h4 className="p-1 font-extrabold ">Mascotas: {user.pets.length}</h4>
        <div className="flex justify-evenly items-center w-full p-5 ">
          {user.pets?.length < 5 ? (
            user.pets?.map((pet) => (
              <div
                onClick={() => handlerSelectedPet(pet)}
                key={pet.id}
                className="relative group"
              >
                <span className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs lg:text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                  {pet.name}
                </span>
                <section className="bg-white w-12 h-12 md:w-24 md:h-24 lg:w-24 lg:h-24 rounded-xl">
                  <img
                    className="object-cover w-full h-full group-hover:opacity-80 group-hover:blur-sm group-hover:brightness-50 rounded-xl border-4 group-hover:scale-105 duration-200 ease-in-out"
                    src={pet.image}
                    alt="pet"
                  />
                </section>
              </div>
            ))
          ) : (
            <CustomCarousel
              pets={user.pets}
              handlerSelectedPet={handlerSelectedPet}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center shadow-xl p-3 transition-all duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl  rounded-xl bg-black text-white mb-16 min-h-96">
        <div
          onClick={() => handlerAddPets(addPet)}
          className={` ${
            addPet ? "w-7 h-7 md:w-20 md:h-20" : "w-10 h-10 md:w-24 md:h-24 "
          }  relative group mt-5`}
        >
          <img
            className="w-full h-full md:p-3 lg:p-5 object-cover hover:bg-gray-400 duration-200 ease-in-out rounded-lg"
            src={addPet ? back : addimages}
            alt="add images"
          />
          <span className="hidden z-50 lg:block absolute left-1/2 transform -translate-x-1/2 p-2 mt-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {addPet ? "Volver" : "Agregar mascotas"}
          </span>
        </div>
        {addPet === true && isSelectedPet === false ? (
          <CreatePetForm />
        ) : (
          <PetCard pet={selectedPet} />
        )}
      </div>
    </main>
  );
};
