import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { usePet } from "../../hooks/usePet";

export const PetCard = ({ pet, user }) => {
  const { deletePet } = usePet();

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/12 p-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-64 h-64 md:w-full md:h-full rounded-lg"
          >
            <img
              src={pet.image}
              className="w-full h-full object-cover shadow-xl rounded-lg"
              alt={pet.name}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full md:w-7/12 text-center md:pl-5"
        >
          <h3 className="text-3xl font-bold my-5">{pet.name}</h3>
          <p className="text-lg">Animal: {pet.animal}</p>
          <p className="text-lg">Raza: {pet.race}</p>
          <p className="text-lg">Cumpleaños: {pet.birthday}</p>
          <div className="flex justify-evenly items-center mt-9">
            <button
              onClick={() => deletePet(pet.id, user.id)}
              className="flex gap-1 border-2 border-black hover:border-red-800 text-red-800 font-bold transition ease-in-out hover:brightness-125 py-2 px-4 rounded-lg my-5"
            >
              Eliminar
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

PetCard.propTypes = {
  pet: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
