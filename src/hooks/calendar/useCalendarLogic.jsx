import { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useCalendar } from "../calendar/useCalendar";

export const useCalendarLogic = () => {
  const { store, actions } = useContext(Context);
  const { user } = store.userState;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const { eventsByDb, addEvent, deleteEvent, updateEvent } = useCalendar();

  useEffect(() => {
    const loadEvents = async () => {
      const databaseEvents = await eventsByDb(user.id);
      setEvents(databaseEvents);
    };
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function handleAddEvent() {
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
        actions.onEvents(updatedEvents);
        return updatedEvents;
      });
      setNewEvent("");
      setIsEditing(false);
      setEventToEdit(null);
    }
  }

  async function handleDeleteEvent(eventId) {
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
        actions.onEvents(updatedEvents);
        return updatedEvents;
      });
    }
  }

  async function handleEditEvent(id) {
    const eventToEditObj = events[selectedDayKey].find(
      (event) => event.id === id
    );
    setNewEvent(eventToEditObj.description);
    setIsEditing(true);
    setEventToEdit(id);
  }

  async function handleUpdateEvent() {
    if (eventToEdit && newEvent.trim()) {
      const formattedEvents = await updateEvent(
        user.id,
        eventToEdit,
        newEvent,
        selectedDate
      );
      actions.onEvents(formattedEvents);
      setEvents(formattedEvents);
      setNewEvent("");
      setIsEditing(false);
      setEventToEdit(null);
    }
  }

  const handleSelectedDate = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day + 1));
  };

  return {
    //variables
    days,
    events,
    firstDay,
    newEvent,
    isEditing,
    currentYear,
    selectedDate,
    currentMonth,
    selectedDayKey,

    // functions
    handleAddEvent,
    handlePrevMonth,
    handleNextMonth,
    handleEditEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    handleNewEventChange,
    handleSelectedDate,
  };
};
