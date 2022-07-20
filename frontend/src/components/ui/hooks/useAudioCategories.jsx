import { useEffect, useState } from "react";
import { apiConfig as api } from "../../../config/apiConfig";

export const useAudioCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAudioCategories();
      if (data) {
        setCategories(data);
      }
    })();
    return () => setCategories([]);
  }, []);

  return { categories };
};
