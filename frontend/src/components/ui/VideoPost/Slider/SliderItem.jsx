import React from "react";
import { Paper, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/lazy";
import Box from "@mui/material/Box";

const SliderItem = (props) => {
  const indexToArea = {
    0: "a",
    1: "b",
    2: "d",
    3: "c",
  };
  const useStyles = makeStyles(() => ({
    slideItem: {
      width: props.index < 2 ? "100% !important" : "80% !important",
      height: "100% !important",
      gridArea: indexToArea[props.index],
    },
  }));
  const classes = useStyles();
  return (
    <>
      {props.slide.attributes?.Link ? (
        <ReactPlayer
          controls={true}
          url={`${props.slide.attributes.Link.data.attributes.url}`}
          className={`item-${props.index} ` + classes.slideItem}
        />
      ) : null}
    </>
  );
};

export default SliderItem;
