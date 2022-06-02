import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import CardItem from "./CardItem";
import Grid from "@mui/material/Grid";

const CardGrid = ({ news }) => {
  const useStyles = makeStyles((theme) => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(264px, 1fr))",
      gap: "24px",
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
    <Grid container spacing={2}>
      {newsList.length > 0
        ? newsList.map((article, i) => (
            <CardItem key={article.attributes.Title} data={article} />
          ))
        : null}
    </Grid>
  );
};

export default CardGrid;
