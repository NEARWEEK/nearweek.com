import React from "react";
import SliderItem from "./SliderItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const VideoSlider = ({ video }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    900: { items: 3 },
    1280: { items: 4 },
  };

  return (
    <AliceCarousel
      disableButtonsControls={true}
      disableDotsControls={true}
      responsive={responsive}
    >
      {video.data
        ? video.data.map((item, i) => {
            return <SliderItem key={i} video={item} index={i} />;
          })
        : null}
    </AliceCarousel>
  );
};

export default VideoSlider;
