import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import ToggleButton from "@mui/material/ToggleButton";
import DailyTransactionsChart from "../DailyTransactionsChart/DailyTransactionsChart";
import NewAccountsChart from "../NewAccountsChart/NewAccountsChart";
import ActiveAccountsChart from "../ActiveAccountsChart/ActiveAccountsChart";
import NewContractsChart from "../NewContractsChart/NewContractsChart";
import ActiveContractsChart from "../ActiveContractsChart/ActiveContractsChart";
import React, { useState } from "react";
import { styled } from "@mui/system";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { useStyles } from "./ChartTabs.styles";
import TvlChart from "../TvlChart/TvlChart";

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

const ChartTabs = () => {
  const [checkedPeriod, setCheckedPeriod] = useState("1w");
  const [checkedProtocol, setCheckedProtocol] = useState("near");

  const classes = useStyles();

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
    display: flex;
    align-items: center;
  `;

  return (
    <Box pb={6}>
      <Paper elevation={0}>
        <TabsUnstyled defaultValue={0}>
          <div className={classes.tabHeader}>
            <TabsList>
              <Tab>Total Value Locked</Tab>
              <Tab>Transactions</Tab>
              <Tab>New Accounts</Tab>
              <Tab>Active Accounts</Tab>
              <Tab>New Contracts</Tab>
              <Tab>Active Contracts</Tab>
            </TabsList>
            <div className={classes.buttonsGroup}>
              <ToggleButton
                selected={checkedPeriod === "1w"}
                value="1w"
                onChange={() => {
                  setCheckedPeriod("1w");
                }}
              >
                1W
              </ToggleButton>
              <ToggleButton
                selected={checkedPeriod === "1m"}
                value="1m"
                onChange={() => {
                  setCheckedPeriod("1m");
                }}
              >
                1M
              </ToggleButton>
              <ToggleButton
                selected={checkedPeriod === "all"}
                value="all"
                onChange={() => {
                  setCheckedPeriod("all");
                }}
              >
                All
              </ToggleButton>
            </div>
          </div>
          <TabPanel value={0}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              mt={2}
              pr={2}
              pl={2}
              className={classes.buttonsGroup}
            >
              <ToggleButton
                value="near"
                selected={checkedProtocol == "near"}
                onChange={() => setCheckedProtocol("near")}
              >
                Near
              </ToggleButton>
              <ToggleButton
                value="aurora"
                selected={checkedProtocol == "aurora"}
                onChange={() => setCheckedProtocol("aurora")}
              >
                Aurora
              </ToggleButton>
            </Box>
            {checkedProtocol && (
              <TvlChart protocol={checkedProtocol} show={checkedPeriod} />
            )}
          </TabPanel>
          <TabPanel value={1}>
            <DailyTransactionsChart show={checkedPeriod} />
          </TabPanel>
          <TabPanel value={2}>
            <NewAccountsChart show={checkedPeriod} />
          </TabPanel>
          <TabPanel value={3}>
            <ActiveAccountsChart show={checkedPeriod} />
          </TabPanel>
          <TabPanel value={4}>
            <NewContractsChart show={checkedPeriod} />
          </TabPanel>
          <TabPanel value={5}>
            <ActiveContractsChart show={checkedPeriod} />
          </TabPanel>
        </TabsUnstyled>
      </Paper>
    </Box>
  );
};

export default ChartTabs;
