import PropTypes from "prop-types";

export const EventAdder = ({
  selectedDate,
  newEvent,
  handleNewEventChange,
  isEditing,
  handleUpdateEvent,
  handleAddEvent,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-xs md:text-base font-bold mb-2">
        Eventos para el{" "}
        {selectedDate.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h3>

      <div className="flex space-x-2 my-5">
        <input
          type="text"
          value={newEvent}
          onChange={handleNewEventChange}
          className="flex-1 p-2 border text-gray-600 text-sm md:text-lg border-gray-300 rounded"
          placeholder="Agregar evento"
        />
        <button
          onClick={isEditing ? handleUpdateEvent : handleAddEvent}
          className={`${
            isEditing ? "bg-lime-800" : "bg-lime-500"
          } text-white p-2 rounded lg:text-base hover:brightness-125`}
        >
          {isEditing ? "Guardar" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

EventAdder.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  newEvent: PropTypes.string.isRequired,
  handleNewEventChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleUpdateEvent: PropTypes.func.isRequired,
  handleAddEvent: PropTypes.func.isRequired,
};
