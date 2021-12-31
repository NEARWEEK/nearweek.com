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

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const VideoSlider = ({ video }) => {
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
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 72,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        loop={true}
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
