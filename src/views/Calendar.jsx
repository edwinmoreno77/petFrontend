import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { EventsList } from "../components/calendar/EventsList";
import { EventAdder } from "../components/calendar/EventAdder";
import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarGrid } from "../components/calendar/CalendarGrid";
import { useCalendar } from "../hooks/useCalendar";

export const Calendar = () => {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const { eventsByDb, addEvent, deleteEvent, updateEvent } = useCalendar();

  const getEventsByDb = async () => {
    const formattedEvents = await eventsByDb(user.id);
    setEvents(formattedEvents);
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
      const newEventData = await addEvent(user.id, newEvent, selectedDate);
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
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const events = await deleteEvent(eventId, user.id);
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
      const formattedEvents = await updateEvent(
        user.id,
        eventToEdit,
        newEvent,
        selectedDate
      );

      setEvents(formattedEvents);
      setNewEvent("");
      setIsEditing(false);
      setEventToEdit(null);
    }
  };

  return (
    <div className="container-fluid bg-black font-bold text-xs lg:text-2xl min-h-screen z-0 bg-image-motivo py-5 px-1">
      <div className="max-w-md sm:max-w-md md:max-w-xl lg:max-w-xl z-10 min-h-96 mx-auto p-4 bg-black border-2 border-slate-800 shadow-slate-600 text-white rounded-lg shadow-md pb-14 relative">
        <CalendarHeader
          selectedDate={selectedDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <CalendarGrid
          firstDay={firstDay}
          days={days}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
          events={events}
        />
        <EventAdder
          selectedDate={selectedDate}
          newEvent={newEvent}
          handleNewEventChange={handleNewEventChange}
          isEditing={isEditing}
          handleUpdateEvent={handleUpdateEvent}
          handleAddEvent={handleAddEvent}
        />
        <EventsList
          events={events}
          selectedDayKey={selectedDayKey}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};
