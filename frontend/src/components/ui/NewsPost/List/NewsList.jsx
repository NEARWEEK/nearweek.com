import React from "react";
import ListItem from "./ListItem";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";

const NewsList = ({ news }) => {
  const useStyles = makeStyles(() => ({
    container: {
      gap: 22,
      height: "100%",
      display: "flex",
      flexWrap: "wrap",
    },
  }));

  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {news.length > 0
        ? news.map((article) => {
            return <ListItem key={article.attributes.Title} data={article} />;
          })
        : null}
    </Box>
  );
};

export default NewsList;
