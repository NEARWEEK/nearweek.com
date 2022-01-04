import React, { useRef } from "react";
import SliderItem from "./SliderItem";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from "swiper";

import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../../../../Utils/Utils";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const VideoSlider = ({ video }) => {
  const isMobileMatch = Utils.isMobileMatch();

  const useStyles = makeStyles(() => ({
    swiper: {
      width: "100%",
      height: "100%",
    },
    swiperSlide: {
      textAlign: "center",
      fontSize: "18px",
      background: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& video": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  }));
  const classes = useStyles();
  console.log(video);
  return (
    <div className={classes.swiperSlide}>
      <Swiper
        slidesPerView={isMobileMatch ? 1 : 4}
        spaceBetween={15}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        className="mySwiper"
      >
        {video.data
          ? video.data.map((item, index) => (
              <SwiperSlide key={index}>
                <SliderItem key={index} slide={item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
