import { useStoreState } from "easy-peasy";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useStyles } from "./UserNews.styles";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import SubmittedNews from "../components/ui/SubmittedNews/SubmittedNews";
import PendingNews from "../components/ui/PendingNews/PendingNews";

const UserNews = () => {
  const { wallet } = useStoreState((state) => state.main.entities);
  const accountId = wallet.getAccountId();

  const [value, setValue] = React.useState("submitted");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <Navbar />
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.headerBlock}>
              <Typography variant="h5" style={{ fontWeight: 900 }}>
                {accountId}
              </Typography>
            </div>
            <TabContext value={value}>
              <div>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  TabIndicatorProps={{
                    style: {
                      display: "none",
                    },
                  }}
                  className={classes.tabs}
                  aria-label="secondary tabs"
                >
                  <Tab
                    className={classes.tab}
                    value="submitted"
                    label="Submitted News"
                  />
                  <Tab
                    className={classes.tab}
                    value="pending"
                    label="Pending News"
                  />
                </Tabs>
                <TabPanel value="submitted">
                  <SubmittedNews />
                </TabPanel>
                <TabPanel value="pending">
                  <PendingNews />
                </TabPanel>
              </div>
            </TabContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNews;
