import React, { useRef } from "react";
import SliderItem from "./SliderItem";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";

const VideoSlider = ({ video }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      width="1440px"
      gap="24px"
    >
      {video.data
        ? video.data.map((item, index) => (
            <SliderItem key={index} slide={item} />
          ))
        : null}
    </Box>
  );
};

export default VideoSlider;
