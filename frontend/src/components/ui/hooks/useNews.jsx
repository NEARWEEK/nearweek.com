import { useEffect, useState } from "react";
import { api } from "../../../Utils/Utils";

export const useNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllNews();
      if (data) {
        setNews(data);
      }
    })();
    return () => setNews([]);
  }, []);

  return { news };
};
