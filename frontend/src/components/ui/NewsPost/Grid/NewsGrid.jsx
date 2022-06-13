import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import GridItem from "./GridItem";
import Box from "@mui/material/Box";

const NewsGrid = ({ news = [] }) => {
  const useStyles = makeStyles((theme) => ({
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(264px, 1fr))",
      columnGap: "24px",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(auto-fill,minmax(264px, 1fr))",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.grid}>
      {news.length > 0
        ? news.map((article, i) => {
            return <GridItem key={i} data={article} />;
          })
        : null}
    </Box>
  );
};

export default NewsGrid;
