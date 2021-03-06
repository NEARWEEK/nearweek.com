import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import EventIcon from "@mui/icons-material/Event";
import TwitterIcon from "@mui/icons-material/Twitter";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
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
                  src="https://calendar.google.com/calendar/embed?src=news%40nearweek.com&ctz=Europe%2FCopenhagen"
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
