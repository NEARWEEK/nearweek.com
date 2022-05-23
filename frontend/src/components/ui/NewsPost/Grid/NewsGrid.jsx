import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import GridItem from "./GridItem";
import Box from "@mui/material/Box";

const NewsGrid = ({ news }) => {
  const useStyles = makeStyles((theme) => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(264px, 1fr))",
      columnGap: "24px",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(auto-fill,minmax(264px, 1fr))",
      },
    },
  }));
  let newsList = [];
  if (news) {
    newsList = [...news];
  }

  const classes = useStyles();

  return (
    <Box className={classes.gridContainer}>
      {newsList.length > 0
        ? newsList.map((article, i) => {
            return <GridItem key={i} data={article} />;
          })
        : null}
    </Box>
  );
};

export default NewsGrid;
