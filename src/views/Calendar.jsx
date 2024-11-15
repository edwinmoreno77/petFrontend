import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarGrid } from "../components/calendar/CalendarGrid";
import { EventsList } from "../components/calendar/EventsList";
import { EventAdder } from "../components/calendar/EventAdder";
import { useCalendarLogic } from "../hooks/calendar//useCalendarLogic";

export const Calendar = () => {
  const {
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

    //functions
    handleAddEvent,
    handlePrevMonth,
    handleNextMonth,
    handleEditEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    handleNewEventChange,
    handleSelectedDate,
  } = useCalendarLogic();

  return (
    <main className="container-fluid bg-black font-bold text-xs lg:text-2xl min-h-screen z-0 bg-image-motivo py-5 px-1">
      <section className="max-w-md sm:max-w-md md:max-w-xl lg:max-w-xl z-10 min-h-96 mx-auto p-4 bg-black border-2 border-slate-800 shadow-slate-600 text-white rounded-lg shadow-md pb-14 relative">
        <CalendarHeader
          selectedDate={selectedDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <CalendarGrid
          firstDay={firstDay}
          days={days}
          selectedDate={selectedDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
          events={events}
          handleSelectedDate={handleSelectedDate}
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
      </section>
    </main>
  );
};
