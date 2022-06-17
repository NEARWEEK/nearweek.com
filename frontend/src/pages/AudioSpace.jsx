import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiConfig as api } from "../config/apiConfig";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { placeholder } from "../Utils/placeholder";
import CardActions from "@mui/material/CardActions";
import Categories from "../components/ui/Audio/Categories/Categories";
import LazyLoad from "react-lazyload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@mui/material/CardHeader";

const AudioSpace = () => {
  const [spaces, setSpaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const theme = useTheme();

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

  const getImageUrl = (item) => {
    return item.attributes.Image.data
      ? item.attributes.Image.data.attributes.url
      : placeholder.getRandomPlaceholder("large");
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
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        borderRadius: "12px",
                        backgroundColor: "#f7f7f7",
                        border: "1px solid #f7f7f7",
                      }}
                      elevation={0}
                    >
                      <LazyLoad height={205} once>
                        <CardMedia
                          component="img"
                          image={getImageUrl(item)}
                          sx={{ height: 205 }}
                        />
                      </LazyLoad>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto", pb: 0 }}>
                          <Typography component="div" variant="h5">
                            {item.attributes.Title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            [{item.attributes.Description || "-"}]
                          </Typography>
                          <Categories data={item.attributes.categories.data} />
                        </CardContent>
                        <CardActions sx={{ mt: "auto" }}>
                          <audio
                            controls
                            preload="none"
                            style={{ width: "100%" }}
                          >
                            <source
                              src={item.attributes.File.data.attributes.url}
                              type={item.attributes.File.data.attributes.mime}
                            />
                          </audio>
                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AudioSpace;
