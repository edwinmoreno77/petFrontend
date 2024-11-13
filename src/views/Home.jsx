import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import calendar from "../assets/calendar.svg";
import dayCalendarIcon from "../assets/dayCalendarIcon.svg";
import { Pagination } from "../components/common/Pagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export function Home() {
  const { store } = useContext(Context);
  const user = store.userState?.user;
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const eventsPerPage = 4;

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
    .filter((event) => new Date(event.event_date) >= currentDate)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const paginatedEvents = upcomingEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center min-h-screen p-5 pb-12">
      <div className="flex flex-row justify-evenly items-center my-8 z-10 border-slate-800 shadow-slate-600 shadow-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer text-center w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black text-white h-48">
        <div className="flex justify-center h-16 w-16 md:w-24 md:h-24">
          <Link to={"/profile"}>
            <img
              className="object-cover h-full w-full rounded-full transition ease-in-out duration-200 border-2 hover:border-4 border-lime-500 shadow-md hover:shadow-lime-500 hover:scale-110"
              src={user.image}
              alt="user image"
            />
          </Link>
        </div>
        <h1 className="font-extrabold text-xl md:text-2xl">
          {user ? `Bienvenid@, ${user.name}!` : "Cargando..."}
        </h1>
      </div>

      <div className="flex flex-col justify-start items-start w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black text-white h-96">
        <div className="flex flex-col lg:flex-row lg:justify-between w-full">
          <div className="flex flex-row justify-start">
            <img
              className="w-6 lg:w-6 me-4 mb-2"
              src={calendar}
              alt="calendar"
            />
            <h1 className="font-extrabold text-lg lg:text-sm">
              Tus próximos eventos:
            </h1>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        </div>

        {paginatedEvents.length === 0 ? (
          <p className="text-center text-white font-bold">
            Sin eventos pendientes.
          </p>
        ) : (
          paginatedEvents.map((event) => (
            <div
              key={event.id}
              className="flex justify-start z-10 border-slate-800 p-2 my-2  text-white font-bold text-xs lg:text-sm hover:scale-105 duration-200 ease-in-out hover:brightness-75 cursor-pointer w-full max-w-4xl xl:max-w-5xl rounded-xl bg-primary-green"
            >
              <div className="relative w-10 h-10 mr-4 text-center">
                <img
                  className="w-full h-full"
                  src={dayCalendarIcon}
                  alt="calendar"
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 mt-4 text-md font-extrabold text-gray-600">
                  {new Date(event.event_date).getDate()}
                </span>
              </div>
              <span className="text-white text-xs lg:text-sm mt-2">
                {new Date(event.event_date).toLocaleDateString()}:{" "}
                {event.description}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
