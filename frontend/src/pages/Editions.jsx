import * as React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import styles from "./editions.module.css";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import Announce from "../components/ui/EditionPost/layout/Announce/Announce";
import EditionPost from "../components/ui/EditionPost/EditionPost";

const TOKEN = process.env.REACT_APP_API_KEY;

const EditionsPage = () => {
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

  const [editions, setEditions] = useState({ data: [], meta: {} });

  const loadEditions = async () => {
    const headers = new Headers({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    });
    const options = {
      headers,
      credentials: "include",
    };
    const response = await fetch(
      `/api/editions?populate=*&sort=createdAt:desc`,
      options
    );
    return await response.json();
  };

  useEffect(async () => {
    const data = await loadEditions();
    if (data) {
      setEditions(data);
    }
  }, []);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box className={classes.mainContainer}>
        <Announce edition={editions.data[0]} />
        <div className={classes.latestEditions}>
          <div className={classes.blockTitle}>Latest Editions</div>
          <div className={styles.editionsList}>
            <EditionPost editions={editions} />
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

export default EditionsPage;
