import React from "react";
import { Paper, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/lazy";
import Box from "@mui/material/Box";

const SliderItem = (props) => {
  const useStyles = makeStyles(() => ({
    slideItem: {
      padding: "0 12px",
      "& .react-player__preview": {
        borderRadius: "6px",
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      {props.video.attributes?.Link ? (
        <ReactPlayer
          controls={true}
          light={true}
          width="auto"
          height="286px"
          url={`${props.video.attributes.Link}`}
          className={"item " + classes.slideItem}
        />
      ) : null}
    </>
  );
};

export default SliderItem;
