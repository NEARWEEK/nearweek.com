import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import GridItem from "./GridItem";
import Box from "@mui/material/Box";

const NewsGrid = ({ news }) => {
  const useStyles = makeStyles(() => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(306px, 1fr))",
      columnGap: "24px",
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
