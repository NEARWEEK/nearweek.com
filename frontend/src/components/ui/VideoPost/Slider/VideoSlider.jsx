import React, { useEffect, useState } from "react";
import SliderItem from "./SliderItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import makeStyles from "@mui/styles/makeStyles";
import SwiperCore, { FreeMode, Navigation } from "swiper";
import * as Utils from "../../../../Utils/Utils";

SwiperCore.use([FreeMode, Navigation]);

const VideoSlider = () => {
  const [video, setVideo] = useState([]);

  useEffect(async () => {
    const { data } = await Utils.api.getAllVideo();
    if (data) {
      setVideo(data);
    }
  }, []);

  const isMobileMatch = useMediaQuery(`(max-width:1024px`);

  const useStyles = makeStyles(() => ({
    root: {
      "& .swiper-container": {
        position: "relative",
        width: "100%",
        "& .swiper-slide": {
          height: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 200ms linear",
          transform: "scale(0.8)",
        },
        "& .swiper-slide-active": {
          transform: "scale(1)",
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="swiper-container">
        <Swiper
          slidesPerView={3}
          loopedSlides={1}
          watchSlidesProgress={true}
          navigation={true}
          loop={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          loopFillGroupWithBlank={true}
          loopAdditionalSlides={30}
        >
          {video
            ? video.map((item, i) => {
                return (
                  <SwiperSlide key={item.id}>
                    <SliderItem key={item.id} video={item} index={i} />
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
      </div>
    </div>
  );
};

export default VideoSlider;
