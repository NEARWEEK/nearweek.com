import React from "react";
import SliderItem from "./SliderItem";

import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";
import Box from "@mui/material/Box";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const VideoSlider = ({ video }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  return (
    <div>
      <AliceCarousel
        disableButtonsControls={true}
        disableDotsControls={true}
        responsive={{
          0: {
            items: 1,
          },
          800: {
            items: 2,
          },
          1024: {
            items: 4,
          },
        }}
      >
        {video.data
          ? video.data.map((item, i) => {
              return <SliderItem key={i} video={item} index={i} />;
            })
          : null}
      </AliceCarousel>
    </div>
  );
};

export default VideoSlider;
