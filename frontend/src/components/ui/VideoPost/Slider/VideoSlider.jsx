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
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";
import Box from "@mui/material/Box";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const VideoSlider = ({ video }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);

  const useStyles = makeStyles(() => ({
    wrapper: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "100%",
    },
    flowLeft: {
      zIndex: "10",
      position: "absolute",
      width: "100%",
      height: "100%",
      visibility: "hidden",
      display: " flex",
    },
    flowRight: {
      zIndex: "10",
      position: "absolute",
      width: "100%",
      height: "100%",
      visibility: "hidden",
      display: " flex",
    },
    slider: {
      textAlign: "center",
      fontSize: "18px",
      background: "#fff",
      display: "grid",
      gridTemplateRows: "1fr",
      /*      gridTemplateColumns: "auto 640px 640px auto",*/
      gridTemplateAreas: "'c a b d'",
      gap: "24px",
      justifyItems: "center",
      alignItems: "center",
      "& > div:before": {
        content: "",
        position: "absolute",
        margin: "0 auto",
        maxWidth: "1440px",
      },
      "& video": {
        display: "block",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={"slider " + classes.slider}>
        {/*      <Swiper
        spaceBetween={24}
        initialSlide={1}
        loop={true}
        slidesPerView={isMobileMatch ? 1 : 4}
        centeredSlides={true}
        roundLengths={true}
        loopAdditionalSlides={1}
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
      </Swiper>*/}
        {video.data
          ? video.data.map((item, i) => {
              return <SliderItem key={i} slide={item} index={i} />;
            })
          : null}
      </div>
      <div className={classes.flowLeft}>{""}</div>
      <div className={classes.flowRight}>{""}</div>
    </div>
  );
};

export default VideoSlider;
