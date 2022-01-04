import React from "react";
import { Paper, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/lazy";

const SliderItem = ({ slide }) => {
  console.log("slide", slide);
  const useStyles = makeStyles(() => ({
    slideItem: {
      width: "100% !important",
      height: "100% !important",
    },
  }));
  const classes = useStyles();
  return (
    <>
      {slide.attributes?.Link ? (
        <ReactPlayer
          controls={true}
          url={`${slide.attributes.Link.data.attributes.url}`}
          className={classes.slideItem}
        />
      ) : null}
    </>
  );
};

export default SliderItem;
