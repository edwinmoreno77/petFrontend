import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useCalendar } from "../hooks/useCalendar";

export const useCalendarLogic = () => {
  const { store } = useContext(Context);
  const { user } = store.userState;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const { eventsByDb, addEvent, deleteEvent, updateEvent } = useCalendar();

  useEffect(() => {
    if (user && user.id) {
      const getEventsByDb = async () => {
        const databaseEvents = await eventsByDb(user.id);
        setEvents(databaseEvents);
      };
      getEventsByDb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

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

  const handlerSelectedDate = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day + 1));
  };

  return {
    selectedDate,
    setSelectedDate,
    events,
    newEvent,
    setNewEvent,
    isEditing,
    setIsEditing,
    eventToEdit,
    setEventToEdit,
    handlePrevMonth,
    handleNextMonth,
    handleNewEventChange,
    handleAddEvent,
    handleDeleteEvent,
    handleEditEvent,
    handleUpdateEvent,
    firstDay,
    days,
    selectedDayKey,
    handlerSelectedDate,
    currentYear,
    currentMonth,
  };
};
