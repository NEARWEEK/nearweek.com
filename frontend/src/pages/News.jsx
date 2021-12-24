import * as React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import NewsList from "../components/ui/NewsPost/List/NewsList";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import styles from "./editions.module.css";
import Announce from "../components/ui/NewsPost/Announce/Announce";

const News = () => {
  const [news, setNews] = useState({ data: [], meta: {} });

  const useStyles = makeStyles(() => ({
    mainContainer: {
      margin: "0 auto",
      maxWidth: 892,
    },
    latestEditions: {
      marginTop: "24px",
      width: "100%",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
  }));

  useEffect(async () => {
    const data = await Utils.api.getAllNews();
    if (data) {
      setNews(data);
    }
  }, []);

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.mainContainer}>
        <Announce article={news.data[0]} />
        <div className={classes.latestEditions}>
          <div className={classes.blockTitle}>Latest News</div>
          <div className={styles.editionsList}>
            <NewsList news={news} />
            <div className={styles.subscribeBlock}>
              <div className={styles.formTitle}>
                Subscribe to The NEARWEEK newsletter{" "}
              </div>
              <div className={styles.formWrapper}>
                <input className={styles.formInput} type="text" />
                <button className={styles.formBtn}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default News;
