import { useEffect, useState } from "react";
import { apiConfig as api } from "../../../config/apiConfig";
import { placeholder } from "../../../Utils/placeholder";

export const useTwitterSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  const getImageUrl = (item) => {
    return item.attributes.Image.data
      ? item.attributes.Image.data.attributes.url
      : placeholder.getRandomPlaceholder("large");
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.getTwitterSpaces();
      if (data) {
        for (let item of data) {
          item.imageSrc = getImageUrl(item);
          item.audioSrc = item.attributes.File.data
            ? new Audio(item.attributes.File.data.attributes.url)
            : null;
        }
        setSpaces(data);
      }
    })();
    return () => setSpaces([]);
  }, []);

  return { spaces };
};
