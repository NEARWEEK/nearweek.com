import * as React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import styles from "./editions.module.css";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import * as Utils from "../Utils/Utils";

const Editions = () => {
  const useStyles = makeStyles(() => ({
    root: {
      margin: "0 auto",
      maxWidth: 892,
    },
    topContainer: {
      marginTop: "36px",
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

  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box className={classes.root}>
        <Box className={classes.topContainer}>
          <Announce edition={editions.data[0]} />
        </Box>
        <div className={classes.latestEditions}>
          <div className={classes.blockTitle}>Latest Editions</div>
          <div className={styles.editionsList}>
            <EditionsList editions={editions.data} />
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

export default Editions;
