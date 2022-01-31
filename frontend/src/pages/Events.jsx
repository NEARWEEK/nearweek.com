import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Section from "../components/ui/general/Section/Section";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Announce from "../components/ui/EventPost/Announce/Announce";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
const Events = () => {
  const [events, setEvents] = useState({ data: [], meta: {} });

  const useStyles = makeStyles(() => ({
    root: {
      margin: "0 auto",
      maxWidth: 1440,
    },
    pageWrapper: {
      marginRight: 16,
      marginLeft: 16,
    },
    topContainer: {
      display: "flex",
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

  useEffect(async () => {
    const data = await Utils.api.getAllEvents();
    if (data) {
      setEvents(data);
    }
  }, []);

  function getLatestEvents() {
    return events.data.filter((event) => event.id !== events.data[0].id);
  }

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box className={classes.root}>
        <Box className={classes.pageWrapper}>
          <Box className={classes.topContainer}>
            <Announce event={events.data[0]} />
          </Box>
          <Box className={classes.latestEvents}>
            <Section title={"Latest Events"}>
              {events.data.length > 0 && (
                <EventsGrid events={getLatestEvents()} />
              )}
            </Section>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Events;
