import { EventsList } from "../components/calendar/EventsList";
import { EventAdder } from "../components/calendar/EventAdder";
import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarGrid } from "../components/calendar/CalendarGrid";
import { useCalendarLogic } from "../hooks/useCalendarLogic";

export const Calendar = () => {
  const {
    selectedDate,
    setSelectedDate,
    events,
    newEvent,
    isEditing,
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
    currentYear,
    currentMonth,
    handlerSelectedDate,
  } = useCalendarLogic();

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
          handlerSelectedDate={handlerSelectedDate}
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
