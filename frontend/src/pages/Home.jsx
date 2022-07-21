import { lazy, Suspense } from "react";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import Footer from "../components/ui/Footer/Footer";

const Navbar = lazy(() => import("../components/ui/Navbar/Navbar"));

const CoinsPrice = lazy(() =>
  import("../components/ui/general/CoinsPrice/CoinsPrice")
);
const Announce = lazy(() =>
  import("../components/ui/EditionPost/Announce/Announce")
);

const NewsList = lazy(() =>
  import("../components/ui/NewsPost/CardList/NewsList")
);
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
          <Container maxWidth="xl">
            <Section title={"Highlights"} link={"/content"}>
              <Grid container spacing={3} columns={{ sm: 4, md: 8, lg: 12 }}>
                <Grid item sm={4} md={4} lg={6}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Announce isFront={true} />
                  </Suspense>
                </Grid>
                <Grid item sm={4} md={4} lg={6}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewsList show={3} />
                  </Suspense>
                </Grid>
              </Grid>
            </Section>
          </Container>
          <Container maxWidth="xl">
            <Section>
              <Subscription />
            </Section>
          </Container>
          <Box style={{ backgroundColor: "#f7f7f7" }} mt={4} pb={4}>
            <Container maxWidth="xl" mb={4}>
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
          <Container maxWidth="xl">
            <Section title={"Events"} link={"/events"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EventsGrid />
              </Suspense>
            </Section>
          </Container>
          <Box style={{ backgroundColor: "#f7f7f7" }}>
            <Container maxWidth="xl">
              <Box>
                <SectionHeader title={"Latest Video"} link={"/video"} />
              </Box>
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
              <VideoSlider />
            </Suspense>
          </Box>
          <Container maxWidth="xl">
            <Section title={"Latest Editions"} link={"/newsletter"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EditionsList start={0} limit={5} />
              </Suspense>
            </Section>
          </Container>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
