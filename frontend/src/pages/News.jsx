import * as React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import styles from "./editions.module.css";
import Announce from "../components/ui/NewsPost/Announce/Announce";
import NewsGrid from "../components/ui/NewsPost/Grid/NewsGrid";

const News = () => {
  const [news, setNews] = useState({ data: [], meta: {} });
  console.log(news);
  const useStyles = makeStyles(() => ({
    mainContainer: {
      margin: "0 auto",
      maxWidth: 1440,
    },
    topContainer: {
      display: "flex",
      gap: "24px",
      "@media screen and (max-width: 1080px)": {
        flexDirection: "column",
        marginRight: "16px",
        marginLeft: "16px",
      },
    },
    blockColumn: {
      flex: 0.5,
    },
    latestArticles: {
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
        <Box className={classes.topContainer}>
          <Box className={classes.blockColumn}>
            <Announce article={news.data[0]} />
          </Box>
          <Box className={classes.blockColumn}>
            {news && <NewsGrid news={news} />}
          </Box>
        </Box>
        <Box className={classes.latestArticles}>
          <div className={classes.blockTitle}>Latest News</div>
          <div className={styles.editionsList}>
            <NewsGrid news={news} />
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
        </Box>
      </Box>
    </>
  );
};

export default News;
