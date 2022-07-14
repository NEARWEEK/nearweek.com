import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { apiConfig as api } from "../config/apiConfig";
import Grid from "@mui/material/Grid";
import { placeholder } from "../Utils/placeholder";
import Categories from "../components/ui/Audio/Categories/Categories";
import AudioSpacesPlayer from "../components/ui/Audio/AudioSpacesPlayer/AudioSpacesPlayer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import EventIcon from "@mui/icons-material/Event";
import TwitterIcon from "@mui/icons-material/Twitter";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import TwitterSpaces from "../components/ui/Audio/TwitterSpaces/TwitterSpaces";

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
          item.audioSrc = item.attributes.File.data
            ? new Audio(item.attributes.File.data.attributes.url)
            : null;
        }
        setSpaces(data);
      }
    })();
    return () => setSpaces([]);
  }, []);

  const [tabValue, setTabValue] = useState("0");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

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
          <TabContext value={tabValue}>
            <Tabs
              sx={{ mt: 4 }}
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="tabs"
            >
              <Tab icon={<TwitterIcon />} label="TwitterSpaces" value="0" />
              <Tab icon={<LibraryMusicIcon />} label="AUDIO" value="1" />
              <Tab icon={<EventIcon />} label="SCHEDULE" value="2" />
            </Tabs>
            <TabPanel value="0">
              <TwitterSpaces />
            </TabPanel>
            <TabPanel value="1" sx={{ p: 0 }}>
              <Box>
                <Box
                  sx={{ borderBottom: "1px solid #ccc", mt: 1, mb: 2, p: 1 }}
                >
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
                          {!item.attributes.frame && (
                            <AudioSpacesPlayer item={item} />
                          )}
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
            </TabPanel>
            <TabPanel value="2">
              <Box>
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FKiev&title=Schedule&hl=en_GB&src=dGVzdG5lYXJ3ZWVrQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=dWsudWtyYWluaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                />
              </Box>
            </TabPanel>
          </TabContext>
        </Container>
      </Box>
    </>
  );
};

export default AudioSpace;
