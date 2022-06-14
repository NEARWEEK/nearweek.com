import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
import { useStyles } from "./UserNews.styles";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import SubmittedNews from "../components/ui/SubmittedNews/SubmittedNews";
import PendingNews from "../components/ui/PendingNews/PendingNews";
import { apiConfig } from "../config/apiConfig";
import Avatar from "../components/ui/general/Avatar/Avatar";
import CoinFeedsNews from "../components/ui/CoinFeedsNews/CoinFeedsNews";

const UserNews = () => {
  const { wallet } = useStoreState((state) => state.main.entities);
  const accountId = wallet.getAccountId();
  const [value, setValue] = useState("submitted");
  const [submitted, setSubmitted] = useState([]);
  const [countSubmitted, setCountSubmitted] = useState(0);
  const [pending, setPending] = useState([]);
  const [countPending, setCountPending] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await apiConfig.getPending(accountId);
      if (data) {
        setPending(data);
        setCountPending(data.length);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await apiConfig.getSubmitted(accountId);
      if (data) {
        setSubmitted(data);
        setCountSubmitted(data.length);
      }
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCountSubmitted = (count) => {
    setCountSubmitted(count);
  };

  const getCountPending = (count) => {
    setCountPending(count);
  };

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{ heoght: "100%", backgroundColor: "#f7f7f7f7" }}
      >
        <Container maxWidth={1440}>
          <div className={classes.headerBlock}>
            <Avatar size={120} seed={accountId} />
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
                  label={
                    <div>
                      Submitted News{" "}
                      <span style={{ color: "#00000061" }}>
                        {countSubmitted}
                      </span>
                    </div>
                  }
                />
                <Tab
                  className={classes.tab}
                  value="pending"
                  label={
                    <div>
                      Pending News{" "}
                      <span style={{ color: "#00000061" }}>{countPending}</span>
                    </div>
                  }
                />
                <Tab
                  className={classes.tab}
                  value="coinfeeds"
                  label={<div>CoinFeeds News</div>}
                />
              </Tabs>
              <TabPanel value="submitted">
                <SubmittedNews news={submitted} />
              </TabPanel>
              <TabPanel value="pending">
                <PendingNews news={pending} />
              </TabPanel>
              <TabPanel value="coinfeeds">
                <CoinFeedsNews />
              </TabPanel>
            </div>
          </TabContext>
        </Container>
      </Box>
    </>
  );
};

export default UserNews;
