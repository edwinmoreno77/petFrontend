import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { CustomCarousel } from "../../components/common/Carousel";
import { ConfigurationOptions } from "../../components/profile/ConfigurationOptions";
import { PetCard } from "../../components/common/PetCard";
import { UserLogout } from "../../components/profile/UserLogout";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { user } = store.userState;
  const { onLogout } = actions;

  const [selectedPet, setSelectedPet] = useState(user.pets[0] || null);

  const handlerSelectedPet = (pet) => {
    setSelectedPet(pet);
  };

  useEffect(() => {
    if (user.pets.length === 0) {
      setSelectedPet(null);
    } else if (!user.pets.includes(selectedPet)) {
      setSelectedPet(user.pets[0]);
    }
  }, [user.pets, selectedPet]);

  return (
    <main className="container-fluid bg-slate-100 flex flex-col items-center  min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col justify-center items-center p-3 shadow-xl duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-6xl rounded-xl bg-black text-white mb-4">
        <UserLogout user={user} onLogout={onLogout} />
        <ConfigurationOptions />
      </section>
      <section className="flex flex-col justify-center items-center p-1 md:p-5 shadow-xl  duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-6xl rounded-xl bg-black text-white mb-4">
        <h4 className="p-1 text-xs md:text-sm lg:text-lg font-extrabold text-slate-300">
          Mascotas: {user.pets.length}
        </h4>
        <div className="flex justify-evenly items-center w-full p-6">
          {user.pets?.length < 5 ? (
            user.pets?.map((pet) => (
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
                    alt="pet"
                  />
                </div>
              </div>
            ))
          ) : (
            <CustomCarousel
              pets={user.pets}
              handlerSelectedPet={handlerSelectedPet}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center shadow-xl p-10 transition-all duration-200 ease-in-out text-center  w-full max-w-4xl xl:max-w-6xl  rounded-xl bg-black text-white mb-16 min-h-[600px]">
        {selectedPet ? (
          <PetCard pet={selectedPet} user={user} />
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
