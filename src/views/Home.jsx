import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import calendar from "../assets/calendar.svg";
// import dogGreen from "../assets/dogGreen.png";
// import catGreen from "../assets/catGreen.png";

export function Home() {
  const { store } = useContext(Context);
  const user = store.userState?.user;
  const [events, setEvents] = useState([]);

  const handlerEvent = async () => {
    if (user.pets && user.pets.length > 0) {
      const fetchEvents = async (petId) => {
        try {
          const response = await fetch(
            `http://localhost:5004/getEvents/${petId}`
          );
          const data = await response.json();

          if (response.ok) {
            return data.data;
          } else {
            console.error(data.message);
            return [];
          }
        } catch (error) {
          console.error("Error fetching events:", error);
          return [];
        }
      };

      const allEvents = [];
      for (const pet of user.pets) {
        const petEvents = await fetchEvents(pet.id);

        const petEventsWithImage = petEvents.map((event) => ({
          ...event,
          petImage: pet.image, // Añadir la imagen de la mascota aquí
        }));

        allEvents.push(...petEventsWithImage);
      }

      setEvents(allEvents);
    }
  };

  useEffect(() => {
    handlerEvent();
  }, [user]);

  console.log("Estos son los eventos", events);

  return (
    <>
      <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center  min-h-screen p-5">
        <div className="flex flex-col justify-center items-center z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-5 h-48">
          <div className="flex items-start justify-start h-16 w-16 md:w-24 md:h-24">
            <img
              className="object-cover h-full w-full rounded-full"
              src={user.image}
              alt="user image"
            />
          </div>
          <h1 className="font-extrabold text-xl md:text-2xl my-3">
            {user ? `Bienvenid@, ${user.name}!` : "Cargando..."}
          </h1>
          {/* <div className="flex mt-6 ml-auto">
            <img
              className="w-16 lg:w-32 lg:h-32 me-4 rounded-full bg-white hover:bg-gray-300 hover:scale-110 duration-200 ease-in-out"
              src={dogGreen}
              alt=""
            />
            <img
              className="w-16 lg:w-32 lg:h-32 me-4 rounded-full bg-white hover:bg-gray-300 hover:scale-110 duration-200 ease-in-out"
              src={catGreen}
              alt=""
            />
          </div> */}
        </div>

        <div className="flex flex-col justify-center items-start p-3 text-center w-full max-w-3xl rounded-xl bg-black text-white mb-3 h-96">
          <div className="flex flex-row justify-start mt-5">
            <img className="w-6 lg:w-6 me-4" src={calendar} alt="calendar" />
            <h1 className="font-extrabold text-lg">Tus próximos eventos:</h1>
          </div>

          {/* MUESTRA LAS ACTIVIDADES PENDIENTES DEL USUARIO--------------------- */}
          {events.length === 0 ? (
            <p className="text-center text-white font-bold">
              Sin eventos pendientes.
            </p>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className="flex justify-start z-10 border-slate-800 p-2 my-2 text-center text-white font-bold hover:scale-105 duration-200 ease-in-out hover:brightness-75 cursor-pointer w-full rounded-xl bg-primary-green"
              >
                <img
                  className="w-8 h-8 rounded-full mr-4"
                  src={event.petImage}
                  alt="pet"
                />
                {event.when}: {event.eventType}
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
