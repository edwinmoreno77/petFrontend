export const useCalendar = () => {
  const eventsByDb = async (user_id) => {
    try {
      const response = await fetch(
        `http://localhost:5004/getEventsByUserId/${user_id}`
      );
      if (!response.ok) throw new Error("Error al obtener los eventos");

      const data = await response.json();
      const formattedEvents = data.reduce((acc, event) => {
        const eventDateKey = new Date(event.event_date).toDateString();
        if (!acc[eventDateKey]) acc[eventDateKey] = [];
        acc[eventDateKey].push(event);
        return acc;
      }, {});
      return formattedEvents;
    } catch (error) {
      console.log(error);
    }
  };

  const addEvent = async (user_id, newEvent, selectedDate) => {
    try {
      const response = await fetch(
        `http://localhost:5004/createEvents/${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user_id,
            description: newEvent,
            event_date: selectedDate.toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Error al guardar el evento");

      const newEventData = await response.json();
      return newEventData;
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteEvent = async (eventId, user_id) => {
    try {
      const response = await fetch(
        `http://localhost:5004/deleteEvent/${eventId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id }),
        }
      );

      if (!response.ok) throw new Error("Error al eliminar el evento");

      const { events } = await response.json();
      return events;
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const updateEvent = async (user_id, eventToEdit, newEvent, selectedDate) => {
    try {
      const response = await fetch(
        `http://localhost:5004/updateEvent/${eventToEdit}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user_id,
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

      return formattedEvents;
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return {
    eventsByDb,
    addEvent,
    deleteEvent,
    updateEvent,
  };
};
