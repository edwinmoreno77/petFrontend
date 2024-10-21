import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const days = daysInMonth(currentYear, currentMonth);
  const selectedDayKey = selectedDate.toDateString();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleNewEventChange = (e) => {
    setNewEvent(e.target.value);
  };

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        if (!updatedEvents[selectedDayKey]) {
          updatedEvents[selectedDayKey] = [];
        }

        const eventAlreadyExists = updatedEvents[selectedDayKey].some(
          (event) => event.text === newEvent.trim() && event.id === eventToEdit
        );

        if (!eventAlreadyExists) {
          if (isEditing && eventToEdit !== null) {
            updatedEvents[selectedDayKey] = updatedEvents[selectedDayKey].map(
              (event) =>
                event.id === eventToEdit
                  ? { ...event, text: newEvent.trim() }
                  : event
            );
            setIsEditing(false);
            setEventToEdit(null);
          } else {
            updatedEvents[selectedDayKey] = [
              ...updatedEvents[selectedDayKey],
              {
                id: uuidv4(),
                text: newEvent.trim(),
              },
            ];
          }
        }

        return updatedEvents;
      });
      setNewEvent("");
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[selectedDayKey] = updatedEvents[selectedDayKey].filter(
        (event) => event.id !== id
      );
      if (updatedEvents[selectedDayKey].length === 0) {
        delete updatedEvents[selectedDayKey];
      }
      return updatedEvents;
    });
  };

  const handleEditEvent = (id) => {
    const eventToEditObj = events[selectedDayKey].find(
      (event) => event.id === id
    );
    setNewEvent(eventToEditObj.text);
    setIsEditing(true);
    setEventToEdit(id);
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-5 mb-24">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">
            {selectedDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
          {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
            <div key={index} className="font-medium text-gray-500">
              {day}
            </div>
          ))}

          {Array(firstDay)
            .fill(null)
            .map((_, index) => (
              <div key={index}></div>
            ))}

          {Array.from({ length: days }, (_, day) => {
            const dayKey = new Date(
              currentYear,
              currentMonth,
              day + 1
            ).toDateString();
            return (
              <button
                key={dayKey}
                className={`p-1 md:p-2 rounded-full transition duration-200 ease-in ${
                  selectedDate.getDate() === day + 1
                    ? "bg-blue-800 text-white"
                    : "hover:bg-paw hover:bg-slate-600 transition duration-300 ease-in"
                }`}
                onClick={() =>
                  setSelectedDate(new Date(currentYear, currentMonth, day + 1))
                }
              >
                {day + 1}
                {events[dayKey] && events[dayKey].length > 0 ? (
                  <span className="block w-2 h-2 mt-1 mx-auto bg-red-500 rounded-full"></span>
                ) : (
                  <span className="block w-2 h-2 mt-1 mx-auto rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">
            Eventos para {selectedDate.toDateString()}
          </h3>

          <ul className="mb-2">
            {events[selectedDayKey] && events[selectedDayKey].length > 0 ? (
              events[selectedDayKey].map((event) => (
                <li
                  key={event.id}
                  className="p-2 mb-2 bg-gray-100 rounded shadow-sm flex justify-between items-center text-gray-700"
                >
                  {event.text}
                  <div className="space-x-5 me-2">
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="text-blue-600 text-xs hover:font-bold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 text-xs hover:font-bold"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No hay eventos para este día.</li>
            )}
          </ul>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newEvent}
              onChange={handleNewEventChange}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Agregar evento"
            />
            <button
              onClick={handleAddEvent}
              className={`${
                isEditing ? "bg-green-600" : "bg-blue-600"
              } text-white p-2 rounded`}
            >
              {isEditing ? "Guardar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
