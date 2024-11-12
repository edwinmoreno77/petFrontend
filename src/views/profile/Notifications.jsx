import { Link } from "react-router-dom";
import { useEventsOfDay } from "../../hooks/calendar/useEventsOfDay";

export const Notifications = () => {
  const { eventsOfTheDay } = useEventsOfDay();

  return (
    <main className="container-fluid bg-black flex flex-col items-center justify-center min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col items-center p-3 text-center w-full max-w-4xl rounded-xl bg-black border-2 border-slate-800 shadow-md min-h-svh text-white mb-10">
        <h1 className="font-bold text-xl md:text-3xl underline mb-5">
          Eventos del dia:
        </h1>
        {eventsOfTheDay.length > 0 ? (
          <ul>
            {eventsOfTheDay.map((event, index) => {
              return (
                <li
                  key={index}
                  className="mb-2 px-8 py-2 bg-lime-500 rounded-xl"
                >
                  <span className="mr-3  text-sm md:text-2xl font-bold">
                    {event.description}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1 className="font-bold text-xl">No tienes pendientes para hoy.</h1>
        )}
        <Link className="w-1/2 mt-10" to={"/profile"}>
          <button className="p-2 w-full rounded-md bg-black border-2 font-semibold hover:brightness-110 hover:scale-110 transition duration-200">
            Volver
          </button>
        </Link>
      </section>
    </main>
  );
};
