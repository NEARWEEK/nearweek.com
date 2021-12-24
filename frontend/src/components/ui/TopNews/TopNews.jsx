import * as React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import Announce from "../EditionPost/Announce/Announce";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import PostList from "../EditionPost/List/PostList";
import * as Utils from "../../../Utils/Utils";
import NewsList from "../NewsPost/List/NewsList";

const TopNews = () => {
  const useStyles = makeStyles(() => ({
    wrapper: {},
    container: {
      margin: "0 auto",
      maxWidth: 1280,
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
    blockNews: {
      display: "flex",
      gap: "24px",
    },
    blockColumn: {
      flex: 0.5,
    },
  }));

  const ShowMore = <a href="#">Show more</a>;
  const [editions, setEditions] = useState({ data: [], meta: {} });
  const [news, setNews] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllNews();
    if (data) {
      setNews(data);
    }
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <SectionHeader title={"Top News"} link={ShowMore} />
        <Box className={classes.blockNews}>
          <Box className={classes.blockColumn}>
            <Announce edition={editions.data[0]} />
          </Box>
          <Box className={classes.blockColumn}>
            <NewsList news={news} />
          </Box>
        </Box>
        <SectionHeader title={"Latest Editions"} link={ShowMore} />
        <PostList editions={editions} />
      </div>
    </div>
  );
};

export default TopNews;
