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
import PriceChart from "../components/ui/general/PriceChart/PriceChart";
import CoinsPrice from "../components/ui/general/CoinsPrice/CoinsPrice";
import { useStyles } from "./Home.styles";
import TransactionHistoryChart from "../components/ui/general/Stats/TransactionHistoryChart/TransactionHistoryChart";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../Utils/Utils";

const blue = {
  50: "#0d00ff26",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0d00ff",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Home = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const classes = useStyles();
  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: #3f4257;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;

    &:hover {
      background-color: ${blue[400]};
    }

    &:focus {
      color: #fff;
      border-radius: 3px;
      outline: 2px solid ${blue[200]};
      outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
      background-color: ${blue[50]};
      color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
  `;

  const TabsList = styled(TabsListUnstyled)`
    padding: 16px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  `;

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
                <Box pb={6}>
                  <Paper elevation={0}>
                    {!isMobileMatch && (
                      <TabsUnstyled defaultValue={0}>
                        <TabsList>
                          <Tab>Transactions</Tab>
                        </TabsList>
                        <TabPanel value={0}>
                          <TransactionHistoryChart />
                        </TabPanel>
                      </TabsUnstyled>
                    )}
                  </Paper>
                </Box>
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
