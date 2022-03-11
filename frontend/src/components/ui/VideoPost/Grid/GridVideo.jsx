import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import GridItem from "./GridItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";
import * as Utils from "../../../../Utils/Utils";

const GridVideo = ({ show }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const [video, setVideo] = useState([]);

  useEffect(async () => {
    const { data } = await Utils.api.getAllVideo();
    if (data) {
      setVideo(data);
    }
  }, []);

  const useStyles = makeStyles(() => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: isMobileMatch
        ? "repeat(auto-fill,minmax(328px, 1fr))"
        : "repeat(auto-fill,minmax(600px, 1fr))",
      columnGap: "24px",
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
