import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const CalendarHeader = ({
  selectedDate,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <section className="flex justify-between items-center mb-4">
      <button
        onClick={handlePrevMonth}
        className="p-2 rounded-full transition duration-200 ease-in-out hover:text-black shadow-sm shadow-lime-500 hover:bg-lime-500"
      >
        &lt;
      </button>
      <motion.h2
        key={`${selectedDate.getFullYear()}-${selectedDate.getMonth()}`}
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-xl font-bold"
      >
        {selectedDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </motion.h2>
      <button
        onClick={handleNextMonth}
        className="p-2 rounded-full transition duration-200 ease-in-out hover:text-black shadow-sm shadow-lime-500 hover:bg-lime-500"
      >
        &gt;
      </button>
    </section>
  );
};

CalendarHeader.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handlePrevMonth: PropTypes.func.isRequired,
  handleNextMonth: PropTypes.func.isRequired,
};
