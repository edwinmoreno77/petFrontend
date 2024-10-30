import { PropTypes } from "prop-types";

export const PetCard = ({ pet }) => {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/12 p-5 flex justify-center">
          <div className="w-64 h-64 md:w-full md:h-full rounded-lg ">
            <img
              src={pet.image}
              className="w-full h-full object-cover shadow-xl rounded-lg"
              alt={pet.name}
            />
          </div>
        </div>
        <div className="w-full md:w-7/12 text-center md:pl-5">
          <>
            <h3 className="text-3xl font-bold my-5">{pet.name}</h3>
            <p className="text-lg">Animal: {pet.animal}</p>
            <p className="text-lg">Raza: {pet.race}</p>
            <p className="text-lg">Birthday: {pet.birthday}</p>
            <div className="flex justify-evenly items-center mt-9">
              <button className="bg-lime-700 transition ease-in-out  hover:scale-105 hover:bg-lime-500 text-white py-2 px-4 rounded-lg my-5 inline-block">
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
              <button className="bg-red-800 transition ease-in-out  hover:scale-105 hover:bg-red-600  text-white py-2 px-4 rounded-lg my-5 inline-block">
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
              </button>
            </div>
          </>
        </div>
      </div>
    </section>
  );
};

PetCard.propTypes = {
  pet: PropTypes.object.isRequired,
};
