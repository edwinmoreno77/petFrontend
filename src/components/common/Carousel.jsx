import { useState } from "react";
import PropTypes from "prop-types";

export const CustomCarousel = ({ pets }) => {
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
    <div className="relative w-full max-w-xs md:max-w-lg ">
      {pets.length > 0 ? (
        <>
          <div className="overflow-hidden">
            <div
              className="flex items-center transition-transform duration-300"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsVisible)
                }%)`,
              }}
            >
              {pets.map((pet) => (
                <div key={pet.id} className="relative group mr-2 p-2 w-1/4">
                  <span className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs lg:text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-10">
                    {pet.name}
                  </span>
                  <section className="bg-white w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden">
                    <img
                      className="object-cover w-full h-full group-hover:opacity-80 group-hover:blur-sm group-hover:brightness-50 rounded-xl border-4 group-hover:scale-105 duration-200 ease-in-out"
                      src={pet.image}
                      alt={pet.name}
                    />
                  </section>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black text-xxs p-2 rounded-full shadow-md hover:bg-black hover:text-white transition duration-200 ease-in-out"
            onClick={handlePrev}
          >
            &#10094;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black text-xxs p-2 rounded-full shadow-md hover:bg-black hover:text-white transition duration-200 ease-in-out"
            onClick={handleNext}
          >
            &#10095;
          </button>
        </>
      ) : (
        <p>No hay mascotas para mostrar.</p>
      )}
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
};
