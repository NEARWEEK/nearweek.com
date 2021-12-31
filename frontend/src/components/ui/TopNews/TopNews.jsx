import * as React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import Announce from "../EditionPost/Announce/Announce";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import EditionsList from "../EditionPost/List/EditionsList";
import * as Utils from "../../../Utils/Utils";
import NewsList from "../NewsPost/List/NewsList";
import EventsGrid from "../EventPost/Grid/EventsGrid";
import VideoSlider from "../VideoPost/Slider/VideoSlider";

const TopNews = () => {
  const useStyles = makeStyles(() => ({
    wrapper: {
      "@media screen and (max-width: 1280px)": {
        marginRight: "16px",
        marginLeft: "16px",
      },
    },
    container: {
      margin: "0 auto",
      maxWidth: 1440,
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

  const ShowMore = <a href="#">Show more</a>;
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
    const data = await Utils.api.getAllEvents();
    if (data) {
      setEvents(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllVideo();
    if (data) {
      setVideo(data);
    }
  }, []);

  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <SectionHeader title={"Top News"} link={ShowMore} />
        <Box className={classes.blockNews}>
          <Box className={classes.blockColumn}>
            <Announce edition={editions.data[0]} />
          </Box>
          <Box className={classes.blockColumn}>
            <NewsList news={news} />
          </Box>
        </Box>
      </Box>
      <Box className={classes.container}>
        <SectionHeader title={"Events"} link={ShowMore} />
        <EventsGrid events={events} />
      </Box>
      <Box className={classes.container}>
        <SectionHeader title={"Latest Video"} link={ShowMore} />
      </Box>
      <Box>
        <VideoSlider video={video} />
      </Box>
      <Box className={classes.container}>
        <SectionHeader title={"Latest Editions"} link={ShowMore} />
        <EditionsList editions={editions} />
      </Box>
    </Box>
  );
};

export default TopNews;
