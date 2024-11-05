import PropTypes from "prop-types";

export const CalendarHeader = ({
  selectedDate,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
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
  );
};

CalendarHeader.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handlePrevMonth: PropTypes.func.isRequired,
  handleNextMonth: PropTypes.func.isRequired,
};
