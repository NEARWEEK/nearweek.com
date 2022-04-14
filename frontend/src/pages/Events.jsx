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
import { useStyles } from "./Events.styles";

const Events = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH}`);
  const [events, setEvents] = useState({ data: [], meta: {} });

  const [editions, setEditions] = useState({ data: [], meta: {} });

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
          </Box>
        </Box>
        <Box style={{ backgroundColor: "#f7f7f7" }}>
          <Box className={classes.container}>
            <Box className={classes.wrapper}>
              <SectionHeader title={"Latest Video"} link={"/video"} />
            </Box>
          </Box>
          {!isMobileMatch ? (
            <GridCarousel />
          ) : (
            <Box className={classes.container}>
              <Box className={classes.wrapper}>
                <GridVideo />
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
