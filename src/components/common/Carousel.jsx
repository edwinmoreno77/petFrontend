import { useState } from "react";
import PropTypes from "prop-types";

export const CustomCarousel = ({ pets, handlerSelectedPet }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsVisible = 4;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= pets.length - itemsVisible ? prevIndex : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  return (
    <div className="flex justify-center items-center relative w-full max-w-md md:max-w-2xl lg:max-w-4xl">
      <div className="overflow-hidden">
        <div
          className="flex items-center transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
          }}
        >
          {pets.map((pet) => (
            <div
              onClick={() => handlerSelectedPet(pet)}
              key={pet.id}
              className="relative group flex justify-center items-center p-1 md:p-2"
            >
              <span className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs lg:text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                {pet.name}
              </span>
              <div className="w-14 h-14 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-36 xl:h-36  group-hover:shadow-md  group-hover:shadow-lime-500 rounded-full overflow-hidden">
                <img
                  className="object-cover w-full h-full group-hover:opacity-80 group-hover:blur-sm group-hover:brightness-50 rounded-full border-4  group-hover:shadow-md group-hover:shadow-lime-500 group-hover:scale-105 duration-200 ease-in-out"
                  src={pet.image}
                  alt="pet"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-xxs md:text-sm p-1 md:p-2 rounded-full bg-black shadow-sm  hover:bg-lime-500 hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2  text-xxs md:text-sm p-1 md:p-2 rounded-full  bg-black shadow-sm  hover:bg-lime-500  hover:shadow-2xl shadow-lime-500 hover:text-black transition duration-200 hover:scale-110 ease-in-out"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
  );
};

CustomCarousel.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  handlerSelectedPet: PropTypes.func.isRequired,
};
