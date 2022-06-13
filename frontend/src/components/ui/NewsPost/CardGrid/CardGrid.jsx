import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import CardItem from "./CardItem";
import Grid from "@mui/material/Grid";

const CardGrid = ({ news = [] }) => {
  return (
    <Grid container spacing={2} xs>
      {news.length > 0
        ? news.map((article, i) => (
            <CardItem key={article.attributes.Title} data={article} />
          ))
        : null}
    </Grid>
  );
};

export default CardGrid;
