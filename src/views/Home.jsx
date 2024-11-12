import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import calendar from "../assets/calendar.svg";
import dayCalendarIcon from "../assets/dayCalendarIcon.svg";
import Swal from "sweetalert2";

export function Home() {
  const { store } = useContext(Context);
  const user = store.userState?.user;
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handlerEvent = async () => {
    if (user?.id) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5004/getEventsByUserId/${user.id}`,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();

        if (response.status == 200) {
          setEvents(data);
        } else if (response.status == 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Su sesión ha expirado",
          }).then(() => {
            navigate("/login");
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  };

  useEffect(() => {
    handlerEvent();
  }, [store.userState.user]);

  const currentDate = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.event_date) > currentDate)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  return (
    <>
      <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center  min-h-screen p-5">
        <div className="flex flex-row justify-start my-8 z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white h-48">
          <div className="flex jsutify-center h-16 w-16 md:w-24 md:h-24 ms-14 mt-7">
            <img
              className="object-cover h-full w-full rounded-full"
              src={user.image}
              alt="user image"
            />
          </div>
          <h1 className="font-extrabold text-xl md:text-2xl mt-14 mx-6">
            {user ? `Bienvenid@, ${user.name}!` : "Cargando..."}
          </h1>
        </div>

        <div className="flex flex-col justify-start items-start text-center w-full max-w-3xl rounded-xl bg-black text-white h-96">
          <div className="flex flex-row justify-start">
            <img
              className="w-6 lg:w-6 me-4 mb-2"
              src={calendar}
              alt="calendar"
            />
            <h1 className="font-extrabold text-lg">Tus próximos eventos:</h1>
          </div>

          {/* SHOWS PENDING ACTIVITIES FOR THE USER--------------------- */}
          {events.length === 0 ? (
            <p className="text-center text-white font-bold">
              Sin eventos pendientes.
            </p>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex justify-start z-10 border-slate-800 p-2 my-2 text-center text-white font-bold hover:scale-105 duration-200 ease-in-out hover:brightness-75 cursor-pointer w-full rounded-xl bg-primary-green"
              >
                {/* CALENDAR ICON */}
                <div className="relative w-10 h-10 mr-4">
                  <img
                    className="w-full h-full"
                    src={dayCalendarIcon}
                    alt="calendar"
                  />
                  {/* EVENT TEXT */}
                  <span className="absolute top-0 left-0 right-0 bottom-0 mt-3 text-center text-md font-extrabold text-gray-600">
                    {new Date(event.event_date).getDate()}
                  </span>
                </div>
                <span className="text-white mt-2">
                  {new Date(event.event_date).toLocaleDateString()}:{" "}
                  {event.description}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
