import React from "react";
import { Paper, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/lazy";
import Box from "@mui/material/Box";

const SliderItem = (props) => {
  const useStyles = makeStyles(() => ({
    slideItem: {
      borderRadius: "24px",
      "& .react-player": {
        borderRadius: "24px",
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      {props.video.attributes?.Link ? (
        <ReactPlayer
          style={{ margin: "0 24px", borderRadius: "24px" }}
          controls={true}
          light={true}
          width="auto"
          height="286px"
          url={`${props.video.attributes.Link}`}
          className={classes.slideItem}
        />
      ) : null}
    </>
  );
};

export default SliderItem;
