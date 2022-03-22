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
        height: 480,
        "& .swiper-slide": {},
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="swiper-container">
        <Swiper
          breakpoints={{
            360: {
              width: 360,
              slidesPerView: 1,
            },
            480: {
              width: 480,
              slidesPerView: 1,
            },
            640: {
              width: 640,
              slidesPerView: 1,
            },
          }}
          slidesPerView={3}
          loopedSlides={1}
          watchSlidesProgress={true}
          slidesOffsetBefore={24}
          spaceBetween={24}
          navigation={true}
          loop={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          loopFillGroupWithBlank={true}
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
