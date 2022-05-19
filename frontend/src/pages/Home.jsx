import React, { lazy, Suspense } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
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
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <Section title={"Highlights"} link={"/content"}>
              <div className={classes.blockNews}>
                <div className={classes.blockColumn}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Announce />
                  </Suspense>
                </div>
                <div className={classes.blockColumn}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewsList show={3} />
                  </Suspense>
                </div>
              </div>
            </Section>
          </div>
          <div className={classes.container}>
            <Section>
              <Subscription />
            </Section>
          </div>
          <Box style={{ backgroundColor: "#f7f7f7" }} mt={4}>
            <Box className={classes.container} mb={4}>
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
            </Box>
          </Box>
          <Box className={classes.container}>
            <Section title={"Events"} link={"/events"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EventsGrid />
              </Suspense>
            </Section>
          </Box>
          <Box style={{ backgroundColor: "#f7f7f7" }}>
            <Box className={classes.container}>
              <Box className={classes.wrapper}>
                <SectionHeader title={"Latest Video"} link={"/video"} />
              </Box>
            </Box>
            <Suspense fallback={<div>Loading...</div>}>
              <VideoSlider />
            </Suspense>
          </Box>
          <Box className={classes.container}>
            <Section title={"Latest Editions"} link={"/newsletter"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EditionsList start={0} limit={5} />
              </Suspense>
            </Section>
          </Box>
        </div>
      </main>
    </>
  );
};

export default Home;
