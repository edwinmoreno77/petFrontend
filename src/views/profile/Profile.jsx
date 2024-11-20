import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { CustomCarousel } from "../../components/common/Carousel";
import { ConfigurationOptions } from "../../components/profile/ConfigurationOptions";
import { PetCard } from "../../components/common/PetCard";
import { UserLogout } from "../../components/profile/UserLogout";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { user } = store.userState;
  const { pets } = store;
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(
    pets?.length > 0 ? pets[0] : null
  );

  const handlerSelectedPet = (pet) => {
    setSelectedPet(pet);
  };

  useEffect(() => {
    if (pets?.length === 0) {
      setSelectedPet(null);
    } else if (pets && !pets.includes(selectedPet)) {
      setSelectedPet(pets[0]);
    }
  }, [selectedPet]);

  useEffect(() => {
    if (user?.id) {
      actions.fetchPets(user.id, navigate);
    }
  }, [user]);

  return (
    <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center justify-center  min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col z-10 border-2 border-slate-800 shadow-slate-600 shadow-md justify-center items-center p-3 duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black text-white mb-4">
        <UserLogout />
        <ConfigurationOptions />
      </section>
      <section className="flex flex-col z-10 justify-center items-center border-2 border-slate-800 shadow-slate-600 shadow-md p-1 md:p-5   duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black text-white mb-4">
        <h4 className="p-1 text-xs md:text-sm lg:text-lg font-extrabold text-slate-300">
          Mascotas: {pets?.length}
        </h4>
        <div className="flex justify-evenly items-center w-full p-6">
          {pets?.length < 5 ? (
            pets?.map((pet) => (
              <div
                onClick={() => handlerSelectedPet(pet)}
                key={pet.id}
                className="relative group flex justify-center items-center p-1 md:p-2"
              >
                <span className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs lg:text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                  {pet.name}
                </span>
                <div className="w-14 h-14 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-36 xl:h-36 group-hover:shadow-md group-hover:shadow-lime-500 rounded-full ">
                  <img
                    className="object-cover w-full h-full group-hover:opacity-80 group-hover:blur-sm group-hover:brightness-50 rounded-full border-4 group-hover:shadow-md group-hover:shadow-lime-500 group-hover:scale-105 duration-200 ease-in-out"
                    src={pet.image}
                    alt="pets"
                  />
                </div>
              </div>
            ))
          ) : (
            <CustomCarousel
              pets={pets || []}
              handlerSelectedPet={handlerSelectedPet}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col z-10 justify-center items-center border-2 border-slate-800 shadow-slate-600 shadow-md p-10 transition-all duration-200 ease-in-out text-center  w-full max-w-4xl xl:max-w-5xl  rounded-xl bg-black text-white mb-16 min-h-[600px]">
        {selectedPet ? (
          <PetCard
            key={selectedPet.id}
            pet={selectedPet}
            user={user}
            setSelectedPet={setSelectedPet}
          />
        ) : (
          <Link
            to={"/profile/addpets"}
            className="text-xl font-extrabold p-5 rounded cursor-pointer hover:bg-slate-700"
          >
            Agregar mascotas
          </Link>
        )}
      </section>
    </main>
  );
};
