import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { apiConfig as api } from "../config/apiConfig";

import useTheme from "@mui/material/styles/useTheme";
import Grid from "@mui/material/Grid";
import { placeholder } from "../Utils/placeholder";
import Categories from "../components/ui/Audio/Categories/Categories";
import AudioSpacesPlayer from "../components/ui/Audio/AudioSpacesPlayer/AudioSpacesPlayer";

const AudioSpace = () => {
  const [spaces, setSpaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAudio();
      if (data) {
        for (let item of data) {
          item.imageSrc = getImageUrl(item);
          item.audioSrc = new Audio(item.attributes.File.data.attributes.url);
        }
        setSpaces(data);
      }
    })();
    return () => setSpaces([]);
  }, []);

  const getImageUrl = (item) => {
    return item.attributes.Image.data
      ? item.attributes.Image.data.attributes.url
      : placeholder.getRandomPlaceholder("large");
  };

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
    <>
      <Navbar />
      <Box component="main">
        <Container>
          <Box sx={{ borderBottom: "1px solid #ccc", mt: 6, mb: 2, p: 1 }}>
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
                  return f.attributes.categories.data.find((category) =>
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
        </Container>
      </Box>
    </>
  );
};

export default AudioSpace;
