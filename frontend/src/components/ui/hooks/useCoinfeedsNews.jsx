import { useEffect, useState } from "react";
import { api } from "../../../Utils/Utils";

export const useCoinfeedsNews = () => {
  const [feedsNews, setFeedsNews] = useState([]);

  useEffect(() => {
    (async () => {
      const { newsFeed } = await api.getCoinFeeds();
      setFeedsNews(newsFeed);
    })();
    return () => setFeedsNews([]);
  }, []);

  return { feedsNews };
};
