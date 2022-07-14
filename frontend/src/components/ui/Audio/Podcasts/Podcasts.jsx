import { useEffect, useState } from "react";
import { apiConfig as api } from "../../../../config/apiConfig";
import { Box, Grid } from "@mui/material";
import Categories from "../Categories/Categories";

const Podcasts = () => {
  const [spaces, setSpaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAudio();
      if (data) {
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
                {item.attributes.frame && (
                  <Box
                    sx={{ flex: 1 }}
                    dangerouslySetInnerHTML={{
                      __html: item.attributes.frame,
                    }}
                  />
                )}
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Podcasts;
