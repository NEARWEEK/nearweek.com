import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Box from "@mui/material/Box";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import NewsList from "../components/ui/NewsPost/List/NewsList";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import Section from "../components/ui/general/Section/Section";
import VideoSlider from "../components/ui/VideoPost/Slider/VideoSlider";
import Subscription from "../components/ui/general/Subscription/Subscription";
import CoinsPrice from "../components/ui/general/CoinsPrice/CoinsPrice";
import { useStyles } from "./Home.styles";
import ChartTabs from "../components/ui/general/Stats/ChartTabs/ChartTabs";

const Home = () => {
  const classes = useStyles();
  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  return (
    <>
      <Navbar />
      <CoinsPrice />
      <main>
        <Box className={classes.wrapper}>
          <Box className={classes.container}>
            <Section title={"Top News"} link={"/news"}>
              <Box className={classes.blockNews}>
                <Box className={classes.blockColumn}>
                  <Announce edition={editions.data[0]} />
                </Box>
                <Box className={classes.blockColumn}>
                  <NewsList show={3} />
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
                <ChartTabs />
              </Section>
            </Box>
          </Box>
          <Box className={classes.container}>
            <Section title={"Events"} link={"/events"}>
              <EventsGrid />
            </Section>
          </Box>
          <Box style={{ backgroundColor: "#f7f7f7" }}>
            <Box className={classes.container}>
              <Box className={classes.wrapper}>
                <SectionHeader title={"Latest Video"} link={"/video"} />
              </Box>
            </Box>
            <VideoSlider />
          </Box>
          <Box className={classes.container}>
            <Section title={"Latest Editions"} link={"/editions"}>
              {editions.data.length > 0 && (
                <EditionsList exclude={editions.data[0].id} />
              )}
            </Section>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
