import React, { lazy, Suspense } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import { useStyles } from "./Home.styles";

const Navbar = lazy(() => import("../components/ui/Navbar/Navbar"));

const CoinsPrice = lazy(() =>
  import("../components/ui/general/CoinsPrice/CoinsPrice")
);
const Announce = lazy(() =>
  import("../components/ui/EditionPost/Announce/Announce")
);

const NewsList = lazy(() => import("../components/ui/NewsPost/List/NewsList"));
const EventsGrid = lazy(() =>
  import("../components/ui/EventPost/Grid/EventsGrid")
);
const VideoSlider = lazy(() =>
  import("../components/ui/VideoPost/Slider/VideoSlider")
);

const ChartTabs = lazy(() =>
  import("../components/ui/Stats/ChartTabs/ChartTabs")
);

const EditionsList = lazy(() =>
  import("../components/ui/EditionPost/List/EditionsList")
);

const StatsBlocks = lazy(() =>
  import("../components/ui/Stats/StatsBlocks/StatsBlocks")
);

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Suspense fallback={<div>...</div>}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CoinsPrice />
      </Suspense>
      <main>
        <div>
          <Container maxWidth={1376}>
            <Section title={"Highlights"} link={"/content"}>
              <div className={classes.grid}>
                <div className={classes.column}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Announce />
                  </Suspense>
                </div>
                <div className={classes.column}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewsList show={3} />
                  </Suspense>
                </div>
              </div>
            </Section>
          </Container>
          <Container maxWidth={1376}>
            <Section>
              <Subscription />
            </Section>
          </Container>
          <Box style={{ backgroundColor: "#f7f7f7" }} mt={4} pb={4}>
            <Container maxWidth={1376} mb={4}>
              <Section title={"NEAR’s week by the numbers"}>
                {!isMobileMatch && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChartTabs />
                  </Suspense>
                )}
                <Suspense fallback={<div>Loading...</div>}>
                  <StatsBlocks />
                </Suspense>
              </Section>
            </Container>
          </Box>
          <Container maxWidth={1376}>
            <Section title={"Events"} link={"/events"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EventsGrid />
              </Suspense>
            </Section>
          </Container>
          <Box style={{ backgroundColor: "#f7f7f7" }}>
            <Container maxWidth={1376}>
              <Box>
                <SectionHeader title={"Latest Video"} link={"/video"} />
              </Box>
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
              <VideoSlider />
            </Suspense>
          </Box>
          <Container maxWidth={1376}>
            <Section title={"Latest Editions"} link={"/newsletter"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EditionsList start={0} limit={5} />
              </Suspense>
            </Section>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Home;
