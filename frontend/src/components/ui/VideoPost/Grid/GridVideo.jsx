import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import GridItem from "./GridItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";
import * as Utils from "../../../../Utils/Utils";

const GridVideo = ({ filteredVideo }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const [video, setVideo] = useState([]);

  useEffect(async () => {
    if (!filteredVideo) {
      const { data } = await Utils.api.getAllVideo();
      if (data) {
        setVideo(data);
      }
    } else {
      setVideo(filteredVideo);
    }
  }, []);

  useEffect(() => {
    setVideo(filteredVideo);
  }, [filteredVideo]);

  const useStyles = makeStyles(() => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: isMobileMatch
        ? "repeat(auto-fill,minmax(264px, 1fr))"
        : "repeat(auto-fill,minmax(264px, 1fr))",
      columnGap: "24px",
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.gridContainer}>
      {video.length > 0 &&
        video.map((_video, i) => (
          <GridItem key={`${_video.attributes.Title}-${i}`} data={_video} />
        ))}
    </Box>
  );
};

export default GridVideo;
