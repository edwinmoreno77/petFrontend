import { useContext, useState } from "react";
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

  return (
    <main className="container-fluid bg-slate-100 flex flex-col items-center  min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col justify-center items-center p-3 shadow-xl duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-6xl rounded-xl bg-black text-white mb-4">
        <UserLogout user={user} onLogout={onLogout} />
        <ConfigurationOptions />
      </section>
      <section className="flex flex-col justify-center items-center p-3 shadow-xl  duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-6xl rounded-xl bg-black text-white mb-4">
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
                <div className="bg-white w-12 h-12 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-36 xl:h-36 rounded-xl">
                  <img
                    className="object-cover w-full h-full group-hover:opacity-80 group-hover:blur-sm group-hover:brightness-50 rounded-xl border-4 group-hover:scale-105 duration-200 ease-in-out"
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
      <section className="flex flex-col justify-center items-center shadow-xl p-3 transition-all duration-200 ease-in-out cursor-pointer text-center  w-full max-w-4xl xl:max-w-6xl  rounded-xl bg-black text-white mb-16 min-h-96">
        {selectedPet ? (
          <PetCard pet={selectedPet} />
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
