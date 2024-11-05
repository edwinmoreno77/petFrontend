import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Calendar = () => {
  const { store } = useContext(Context);
  const { user } = store.userState;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const getEventsByDb = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/getEventsByUserId/${user.id}`
      );
      if (!response.ok) throw new Error("Error al obtener los eventos");

      const data = await response.json();
      const formattedEvents = data.reduce((acc, event) => {
        const eventDateKey = new Date(event.event_date).toDateString();
        if (!acc[eventDateKey]) acc[eventDateKey] = [];
        acc[eventDateKey].push(event);
        return acc;
      }, {});

      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventsByDb();
  }, [user.id]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const days = daysInMonth(currentYear, currentMonth);
  const selectedDayKey = selectedDate.toDateString();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () =>
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () =>
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));

  const handleNewEventChange = (e) => setNewEvent(e.target.value);

  const handleAddEvent = async () => {
    if (newEvent.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5004/createEvents/${user.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              description: newEvent,
              event_date: selectedDate.toISOString(),
            }),
          }
        );

        if (!response.ok) throw new Error("Error al guardar el evento");

        const newEventData = await response.json();
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          const eventDateKey = selectedDate.toDateString();

          if (!updatedEvents[eventDateKey]) updatedEvents[eventDateKey] = [];
          updatedEvents[eventDateKey] = [
            ...updatedEvents[eventDateKey],
            newEventData,
          ];
          return updatedEvents;
        });

        setNewEvent("");
        setIsEditing(false);
        setEventToEdit(null);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5004/deleteEvent/${eventId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        }
      );

      if (!response.ok) throw new Error("Error al eliminar el evento");

      const { events } = await response.json();
      if (events) {
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          for (const date in updatedEvents) {
            updatedEvents[date] = updatedEvents[date].filter(
              (event) => event.id !== eventId
            );
            if (updatedEvents[date].length === 0) delete updatedEvents[date];
          }
          return updatedEvents;
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditEvent = (id) => {
    const eventToEditObj = events[selectedDayKey].find(
      (event) => event.id === id
    );
    setNewEvent(eventToEditObj.description);
    setIsEditing(true);
    setEventToEdit(id);
  };

  const handleUpdateEvent = async () => {
    if (eventToEdit && newEvent.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5004/updateEvent/${eventToEdit}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              description: newEvent,
              date: selectedDate.toISOString(),
            }),
          }
        );

        if (!response.ok) throw new Error("Error al actualizar el evento");

        const { events: updatedEvents } = await response.json();
        const formattedEvents = updatedEvents.reduce((acc, event) => {
          const eventDateKey = new Date(event.event_date).toDateString();
          if (!acc[eventDateKey]) acc[eventDateKey] = [];
          acc[eventDateKey].push(event);
          return acc;
        }, {});

        setEvents(formattedEvents);
        setNewEvent("");
        setIsEditing(false);
        setEventToEdit(null);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <div className="container-fluid bg-black font-bold text-xs lg:text-2xl min-h-screen z-0 bg-image-motivo py-5 px-1">
      <div className="max-w-md sm:max-w-md md:max-w-xl lg:max-w-xl z-10 min-h-96 mx-auto p-4 bg-black border-2 border-slate-800 shadow-slate-600 text-white rounded-lg shadow-md pb-14 relative">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full transition duration-200 ease-in-out hover:text-black shadow-sm shadow-lime-500 hover:bg-lime-500"
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
            className="p-2 rounded-full transition duration-200 ease-in-out hover:text-black shadow-sm shadow-lime-500 hover:bg-lime-500"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-1 lg:gap-1 text-center">
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
                className={`p-1 m-0 text-lg lg:text-base md:p-2 md:m-3 lg:m-3 lg:p-2 rounded-full transition duration-200 ease-in ${
                  selectedDate.getDate() === day + 1
                    ? "bg-lime-500 text-white"
                    : "hover:bg-paw hover:bg-slate-600 transition duration-300 ease-in"
                }`}
                onClick={() =>
                  setSelectedDate(new Date(currentYear, currentMonth, day + 1))
                }
              >
                {day + 1}
                {events[dayKey] && events[dayKey].length > 0 ? (
                  <span className="block w-2 h-2 mt-1 mx-auto bg-red-800 rounded-full"></span>
                ) : (
                  <span className="block w-2 h-2 mt-1 mx-auto rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

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

          <ul className="mb-2">
            {events[selectedDayKey] && events[selectedDayKey].length > 0 ? (
              events[selectedDayKey].map((event) => (
                <li
                  key={event.id}
                  className="p-2 mb-2 bg-gray-100 rounded shadow-sm flex justify-between items-center text-black"
                >
                  <span className="text-gray-600 text-sm md:text-base font-serif">
                    {event.description}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="mr-2 p-1 transition duration-200 ease-in-out hover:scale-125 rounded-full text-white shadow-sm shadow-gray-400 hover:bg-lime-500"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-1 transition duration-200 ease-in-out hover:scale-125 rounded-full text-white shadow-sm shadow-gray-400 hover:bg-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No hay eventos para este día.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
