import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import GridItem from "./GridItem";

const GridVideo = ({ video }) => {
  const useStyles = makeStyles(() => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(306px, 1fr))",
      columnGap: "24px",
      marginLeft: "16px",
      marginRight: "16px",
    },
  }));
  let videoList = [];
  if (video) {
    videoList = [...video];
  }

  const classes = useStyles();

  return (
    <Box className={classes.gridContainer}>
      {videoList.length > 0
        ? videoList.map((_video, i) => {
            return <GridItem key={_video.id} data={_video} />;
          })
        : null}
    </Box>
  );
};

export default GridVideo;
