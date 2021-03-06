import React, { useEffect, useState } from "react";
import SliderItem from "./SliderItem";
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

  const useStyles = makeStyles(() => ({
    root: {
      "& .swiper-container": {
        position: "relative",
        width: "100%",
        "& .swiper-slide": {
          height: "360px",
          transition: "all 200ms linear",
          transform: "scale(0.8)",
        },
        "& .swiper-slide-active": {
          transform: "scale(1)",
        },
        "@media (max-width: 860px)": {
          "& .swiper-slide": {
            transform: "scale(1)",
          },
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="swiper-container">
        <Swiper
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            780: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          loopedSlides={1}
          watchSlidesProgress={true}
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
