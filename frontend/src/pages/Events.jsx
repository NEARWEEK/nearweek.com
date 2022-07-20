import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container, useMediaQuery } from "@mui/material";
import Section from "../components/ui/general/Section/Section";
import Announce from "../components/ui/EventPost/Announce/Announce";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import GridCarousel from "../components/ui/VideoPost/GridCarousel/GridCarousel";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import { useStyles } from "./Events.styles";
import useTheme from "@mui/material/styles/useTheme";
import { useEvents } from "../components/ui/hooks/useEvents";
import { useEditions } from "../components/ui/hooks/useEditions";

const Events = () => {
  const theme = useTheme();
  const isMobileMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const { events } = useEvents();
  const { editions } = useEditions();

  function getLatestEvents() {
    return events.filter((event) => event.id !== events[0].id);
  }

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box component="main">
        {!isMobileMatch ? (
          <Container maxWidth="lg">
            <Box className={classes.topContainer}>
              <Announce event={events[0]} />
            </Box>
          </Container>
        ) : (
          <Box className={classes.topContainer}>
            <Announce event={events[0]} />
          </Box>
        )}
        <Container maxWidth="lg">
          <Box className={classes.latestEvents}>
            <Section title={"Latest Events"}>
              {events.length > 0 && <EventsGrid events={getLatestEvents()} />}
            </Section>
          </Box>
        </Container>
        <Box style={{ backgroundColor: "#f7f7f7" }}>
          <Container maxWidth="lg">
            <SectionHeader title={"Latest Video"} link={"/video"} />
          </Container>
          {!isMobileMatch ? (
            <GridCarousel />
          ) : (
            <Container maxWidth="lg">
              <GridVideo />
            </Container>
          )}
        </Box>
        <Container maxWidth="lg">
          <Section title={"Latest Editions"} link={"/editions"}>
            {editions.length > 0 && <EditionsList editions={editions} />}
          </Section>
        </Container>
      </Box>
    </>
  );
};

export default Events;
