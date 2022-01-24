import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/youtube";

const SliderItem = (props) => {
  const useStyles = makeStyles(() => ({
    slideItem: {
      borderRadius: "12px",
      "& .react-player__preview": {
        borderRadius: "12px",
      },
    },
  }));
  const classes = useStyles();

  return (
    <>
      {props.video.attributes?.Link ? (
        <ReactPlayer
          key={props.key}
          controls={true}
          width="100%"
          height="100%"
          light={true}
          url={`${props.video.attributes.Link}`}
          className={classes.slideItem}
        />
      ) : null}
    </>
  );
};

export default SliderItem;
