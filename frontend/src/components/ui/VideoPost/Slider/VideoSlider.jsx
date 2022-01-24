import React from "react";
import SliderItem from "./SliderItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import makeStyles from "@mui/styles/makeStyles";

import SwiperCore, { FreeMode, Navigation } from "swiper";

SwiperCore.use([FreeMode, Navigation]);

import "swiper/css/navigation";

const VideoSlider = ({ video }) => {
  const isMobileMatch = useMediaQuery(`(max-width:1024px`);

  const useStyles = makeStyles(() => ({
    root: {
      "& .swiper-container": {
        position: "relative",
        height: "380px",
      },
      "& .swiper-wrapper": {
        justifyContent: !isMobileMatch ? "center" : "unset",
      },
      "& .swiper-slide": {
        minWidth: !isMobileMatch ? "676px" : "auto",
        height: "380px",
        display: "flex",
        alignItems: "center",
        /* justifyContent: "center",*/
        transition: "all 200ms linear",
        transform: "scale(0.8)",
      },
      "& .swiper-slide-duplicate-prev": {
        transform: video.data.length <= 2 ? "scale(1)" : "scale(0.8)",
      },
      "& .swiper-slide-duplicate-next": {
        transform: video.data.length >= 4 ? "scale(1)" : "scale(0.8)",
      },
      "& .swiper-slide-duplicate-active": {
        transform: "scale(1)",
      },
      "& .swiper-slide__content": {
        height: "380px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="swiper-container">
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          loop={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: video.data.length >= 3 ? 3 : 3,
              spaceBetween: 24,
            },
            1240: {
              slidesPerView: video.data.length >= 4 ? 4 : 3,
              spaceBetween: 24,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {video.data
            ? video.data.map((item, i) => {
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
