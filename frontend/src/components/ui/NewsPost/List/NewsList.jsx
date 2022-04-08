import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import * as Utils from "../../../../Utils/Utils";

const NewsList = ({ exclude, show = 3 }) => {
  const [news, setNews] = useState([]);

  const useStyles = makeStyles(() => ({
    container: {
      gap: 22,
      height: "100%",
      display: "flex",
      flexWrap: "wrap",
      maxWidth: "100%",
    },
  }));

  useEffect(async () => {
    const { data } = await Utils.api.getAllNews();
    if (exclude) {
      setNews(data.filter((item) => item.id !== exclude));
    } else {
      setNews(data);
    }
  }, []);

  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {news.length > 0
        ? news.slice(0, show).map((article) => {
            return <ListItem key={article.attributes.Title} data={article} />;
          })
        : null}
    </Box>
  );
};

export default NewsList;
