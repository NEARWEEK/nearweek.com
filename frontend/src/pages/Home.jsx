import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Box from "@mui/material/Box";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import NewsList from "../components/ui/NewsPost/List/NewsList";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import VideoSlider from "../components/ui/VideoPost/Slider/VideoSlider";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import Section from "../components/ui/general/Section/Section";

const Home = () => {
  const useStyles = makeStyles(() => ({
    wrapper: {},
    container: {
      margin: "0 auto",
      maxWidth: 1376,
      paddingRight: "16px",
      paddingLeft: "16px",
    },
    videoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "24px",
      width: 1140,
    },
    latestEditions: {
      marginTop: "24px",
      width: "100%",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
    blockNews: {
      display: "flex",
      gap: "24px",
      "@media screen and (max-width: 1280px)": {
        flexDirection: "column",
      },
    },
    blockColumn: {
      flex: 0.5,
      display: "flex",
      flexWrap: "wrap",
      gap: "22px",
      height: "100%",
    },
  }));

  const [editions, setEditions] = useState({ data: [], meta: {} });
  const [news, setNews] = useState({ data: [], meta: {} });
  const [events, setEvents] = useState({ data: [], meta: {} });
  const [video, setVideo] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllNews();
    if (data) {
      setNews(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getLatestEvents();
    if (data) {
      setEvents(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getLatestVideo(1, 4);
    if (data) {
      setVideo(data);
    }
  }, []);

  function getLatestEditions() {
    return editions.data.filter(
      (edition) => edition.id !== editions.data[0].id
    );
  }

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <main>
        <Box className={classes.wrapper}>
          <Box className={classes.container}>
            <Section title={"Top News"} link={"/news"}>
              <Box className={classes.blockNews}>
                <Box className={classes.blockColumn}>
                  <Announce edition={editions.data[0]} />
                </Box>
                <Box className={classes.blockColumn}>
                  <NewsList news={news} limit={3} />
                </Box>
              </Box>
            </Section>
          </Box>
          <Box className={classes.container}>
            <Section title={"Events"} link={"/events"}>
              <EventsGrid events={events} />
            </Section>
          </Box>
          <Box className={classes.container}>
            <SectionHeader title={"Latest Video"} link={"/video"} />
          </Box>
          <Box>
            <VideoSlider video={video} />
          </Box>
          <Box className={classes.container}>
            <Section title={"Latest Editions"} link={"/editions"}>
              {editions.data.length > 0 && (
                <EditionsList editions={getLatestEditions()} />
              )}
            </Section>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
