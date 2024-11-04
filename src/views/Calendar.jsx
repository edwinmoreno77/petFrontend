import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Calendar = () => {
  const { store } = useContext(Context);
  const { user } = store.userState;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // const [eventToEdit, setEventToEdit] = useState(null);

  const getEventsByDb = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/getEventsByUserId/${user.id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los eventos");
      }
      const data = await response.json();
      const formattedEvents = data.reduce((acc, event) => {
        const eventDateKey = new Date(event.event_date).toDateString();
        if (!acc[eventDateKey]) {
          acc[eventDateKey] = [];
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

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

  const handleAddEvent = async () => {
    if (newEvent.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5004/createEvents/${user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              description: newEvent,
              event_date: selectedDate.toISOString(),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Error al guardar el evento");
        }
        const savedEvent = await response.json();

        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          const eventDateKey = selectedDate.toDateString();

          if (!updatedEvents[eventDateKey]) {
            updatedEvents[eventDateKey] = [];
          }

          updatedEvents[eventDateKey] = [
            ...updatedEvents[eventDateKey],
            savedEvent,
          ];

          return updatedEvents;
        });

        setNewEvent("");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/deleteEvent/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          updatedEvents[selectedDayKey] = updatedEvents[selectedDayKey].filter(
            (event) => event.id !== eventId
          );
          if (updatedEvents[selectedDayKey].length === 0) {
            delete updatedEvents[selectedDayKey];
          }
          return updatedEvents;
        });
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el evento:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditEvent = (id) => {
    const eventToEditObj = events[selectedDayKey].find(
      (event) => event.id === id
    );
    setNewEvent(eventToEditObj.text);
    setIsEditing(true);
    // setEventToEdit(id);
  };

  return (
    <div className="container-fluid bg-black font-bold text-sm lg:text-2xl min-h-screen z-0 bg-image-motivo py-5 px-1">
      <div className="sm:max-w-sm md:max-w-xl lg:max-w-2xl z-10 min-h-96 mx-auto p-4 bg-black border-2 border-slate-800 shadow-slate-600 text-white rounded-lg shadow-md pb-14 relative">
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

        <div className="grid grid-cols-7 gap-1 md:gap-10 text-center">
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
              className="flex-1 p-2 border text-black border-gray-300 rounded"
              placeholder="Agregar evento"
            />
            <button
              onClick={handleAddEvent}
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
                  className="p-2 mb-2 bg-gray-100 rounded shadow-sm flex justify-between items-center text-gray-700"
                >
                  {event.description}
                  <div className="space-x-5 me-2">
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="text-lime-700 transition duration-200 ease-in-out hover:scale-125 text-xs hover:font-bold"
                    >
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
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 transition duration-200 ease-in-out hover:scale-125 text-xs hover:font-bold"
                    >
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
