import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const CalendarGrid = ({
  firstDay,
  days,
  selectedDate,
  currentYear,
  currentMonth,
  events,
  handleSelectedDate,
}) => {
  useEffect(() => {
    handleSelectedDate(selectedDate.getDate() - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      key={`${selectedDate.getFullYear()}-${selectedDate.getMonth()}`}
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="grid grid-cols-7 gap-1 md:gap-1 lg:gap-1 text-center"
    >
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
            className={`p-1 sm:p-1 m-0 text-lg lg:text-base md:p-3 md:m-1 lg:m-3 lg:p-1 rounded-full transition duration-200 ease-in ${
              selectedDate?.getDate() === day + 1
                ? "bg-lime-500 text-white"
                : "hover:bg-paw hover:bg-slate-600 transition duration-300 ease-in"
            }`}
            onClick={() => handleSelectedDate(day)}
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
    </motion.div>
  );
};

CalendarGrid.propTypes = {
  firstDay: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleSelectedDate: PropTypes.func.isRequired,
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  events: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
      })
    )
  ),
};
