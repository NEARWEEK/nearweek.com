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
import Podcasts from "../components/ui/Audio/Podcasts/Podcasts";

const AudioSpace = () => {
  const [tabValue, setTabValue] = useState("0");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
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
              <Tab icon={<TwitterIcon />} label="Twitter Spaces" value="0" />
              <Tab icon={<LibraryMusicIcon />} label="Podcasts" value="1" />
              <Tab icon={<EventIcon />} label="Schedule" value="2" />
            </Tabs>
            <TabPanel value="0">
              <TwitterSpaces />
            </TabPanel>
            <TabPanel value="1" sx={{ p: 0 }}>
              <Podcasts />
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
