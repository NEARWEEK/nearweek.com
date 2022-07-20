import { useEffect, useState } from "react";
import { api } from "../../../Utils/Utils";

export const useEditions = () => {
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllEditions();
      if (data) {
        setEditions(data);
      }
    })();
    return () => setEditions([]);
  }, []);

  return { editions };
};
