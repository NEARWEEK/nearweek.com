import AudioSpacesPlayer from "../AudioSpacesPlayer/AudioSpacesPlayer";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import Categories from "../Categories/Categories";
import { useAudioCategories } from "../../hooks/useAudioCategories";
import { useTwitterSpaces } from "../../hooks/useTwitterSpaces";

const TwitterSpaces = () => {
  const { spaces } = useTwitterSpaces();
  const { categories } = useAudioCategories();
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

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
