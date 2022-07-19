import AudioSpacesPlayer from "../AudioSpacesPlayer/AudioSpacesPlayer";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { apiConfig as api } from "../../../../config/apiConfig";
import { placeholder } from "../../../../Utils/placeholder";
import Categories from "../Categories/Categories";

const TwitterSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

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

  useEffect(() => {
    (async () => {
      const { data } = await api.getAudioCategories();
      if (data) {
        setCategories(data);
      }
    })();
    return () => setCategories([]);
  }, []);

  const handleFilter = (value) => {
    let selected = [...selectedCategories].filter((item) => item !== "all");
    if (!selected.includes(value)) {
      if (value === "all") {
        selected = ["all"];
      } else {
        selected.push(value);
      }
    } else {
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] === value) {
          selected.splice(i, 1);
        }
      }
    }
    setSelectedCategories(selected);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #ccc", mt: 1, mb: 2, p: 1 }}>
        <Categories
          data={categories}
          all
          selected={selectedCategories}
          size="big"
          handleClick={handleFilter}
        />
      </Box>
      <Grid container spacing={2} columns={{ md: 12 }}>
        {spaces.length > 0 &&
          spaces
            .filter((f) => {
              if (selectedCategories.includes("all")) return f;
              return f.attributes.audio_categories.data.find((category) =>
                selectedCategories.includes(category.attributes.Name)
              );
            })
            .map((item, index) => (
              <Grid
                item
                md={3}
                key={index}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <AudioSpacesPlayer item={item} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default TwitterSpaces;
