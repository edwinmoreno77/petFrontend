import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useCalendar } from "../calendar/useCalendar";

export const useEventsOfDay = () => {
  const [eventsOfTheDay, setEventsOfTheDay] = useState([]);
  const { store } = useContext(Context);
  const { user } = store.userState;
  const { eventsByDb } = useCalendar();

  useEffect(() => {
    const fetchEvents = async () => {
      const databaseEvents = await eventsByDb(user.id);
      const currentDateStr = new Date().toDateString();

      const todayEvents = Object.values(databaseEvents)
        .flat()
        .filter((event) => {
          const eventDateStr = new Date(event.event_date).toDateString();
          return eventDateStr === currentDateStr;
        });

      setEventsOfTheDay(todayEvents);
    };
    if (user?.id) fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.userState.user]);

  return { eventsOfTheDay };
};
