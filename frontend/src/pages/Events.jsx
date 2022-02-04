import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Section from "../components/ui/general/Section/Section";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Announce from "../components/ui/EventPost/Announce/Announce";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import GridCarousel from "../components/ui/VideoPost/GridCarousel/GridCarousel";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../Utils/Utils";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
const Events = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH}`);
  const [events, setEvents] = useState({ data: [], meta: {} });

  const useStyles = makeStyles(() => ({
    container: {
      margin: "0 auto",
      maxWidth: 1440,
    },
    wrapper: {
      marginRight: 16,
      marginLeft: 16,
    },
    topContainer: {
      display: "flex",
      margin: !isMobileMatch ? 16 : 0,
      gap: 24,
      "@media screen and (max-width: 1080px)": {
        flexDirection: "column",
      },
    },
    blockColumn: {
      flex: 0.5,
    },
    latestEvents: {
      marginTop: "24px",
      width: "100%",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
    filterContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "16px",
      marginBottom: "16px",
      justifyContent: "space-between",
    },
    filterActionContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "16px",
      marginBottom: "16px",
      gap: "24px",
    },
    sortSelect: {
      "& .MuiSelect-select": {
        padding: "8px",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    filterCategory: {
      flexWrap: "wrap",
      alignItems: "center",
      "& .active": {
        backgroundColor: "rgba(13, 0, 255, 0.04)",
      },
    },
  }));

  const [video, setVideo] = useState({ data: [], meta: {} });
  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getLatestVideo(1, 4);
    if (data) {
      setVideo(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllEvents();
    if (data) {
      setEvents(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  function getLatestEvents() {
    return events.data.filter((event) => event.id !== events.data[0].id);
  }

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box>
        {!isMobileMatch ? (
          <Box className={classes.container}>
            <Box className={classes.topContainer}>
              <Announce event={events.data[0]} />
            </Box>
          </Box>
        ) : (
          <Box className={classes.topContainer}>
            <Announce event={events.data[0]} />
          </Box>
        )}
        <Box className={classes.container}>
          <Box className={classes.wrapper}>
            <Box className={classes.latestEvents}>
              <Section title={"Latest Events"}>
                {events.data.length > 0 && (
                  <EventsGrid events={getLatestEvents()} />
                )}
              </Section>
            </Box>
            <Box className={classes.container}>
              <SectionHeader title={"Latest Video"} link={"/video"} />
            </Box>
          </Box>
        </Box>
        <Box style={{ backgroundColor: "#f7f7f7", paddingTop: "36px" }}>
          {!isMobileMatch ? (
            <GridCarousel video={video.data} />
          ) : (
            <Box className={classes.container}>
              <Box className={classes.videoGrid}>
                <GridVideo video={video.data} />
              </Box>
            </Box>
          )}
        </Box>
        <Box className={classes.container}>
          <Box className={classes.wrapper}>
            <Box className={classes.container}>
              <Section title={"Latest Editions"} link={"/editions"}>
                {editions.data.length > 0 && (
                  <EditionsList editions={editions.data} />
                )}
              </Section>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Events;
