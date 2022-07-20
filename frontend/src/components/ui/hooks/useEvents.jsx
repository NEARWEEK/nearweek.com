import { useEffect, useState } from "react";
import { api } from "../../../Utils/Utils";

export const useEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllEvents();
      if (data) {
        setEvents(data);
      }
    })();
    return () => setEvents([]);
  }, []);

  return { events };
};
