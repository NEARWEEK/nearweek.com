import React, { lazy, Suspense } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Box from "@mui/material/Box";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import { useStyles } from "./Home.styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(() => {
    (async () => {
      const data = await Utils.api.getAllEditions();
      if (data) {
        setEditions(data);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <CoinsPrice />
      </Suspense>
      <main>
        <Box className={classes.wrapper}>
          <Box className={classes.container}>
            <Section title={"Highlights"} link={"/content"}>
              <Box className={classes.blockNews}>
                <Box className={classes.blockColumn}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Announce edition={editions.data[0]} />
                  </Suspense>
                </Box>
                <Box className={classes.blockColumn}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewsList show={3} />
                  </Suspense>
                </Box>
              </Box>
            </Section>
          </Box>
          <Box className={classes.container}>
            <Section>
              <Subscription />
            </Section>
          </Box>
          <Box style={{ backgroundColor: "#f7f7f7" }} mt={4}>
            <Box className={classes.container} mb={4}>
              <Section title={"NEAR’s week by the numbers"}>
                {!isMobileMatch && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChartTabs />
                  </Suspense>
                )}
                <Suspense fallback={<div></div>}>
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
              {editions.data.length > 0 && (
                <Suspense fallback={<div>Loading...</div>}>
                  <EditionsList exclude={editions.data[0].id} />
                </Suspense>
              )}
            </Section>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
