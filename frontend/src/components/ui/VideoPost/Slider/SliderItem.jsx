import React from "react";
import { Paper, Button } from "@mui/material";

const SliderItem = ({ slide }) => {
  console.log("slide", slide);
  return (
    <>
      {slide.attributes?.Link ? (
        <video width="676" controls>
          {" "}
          <source
            src={`${slide.attributes.Link.data.attributes.url}`}
            type={`${slide.attributes.Link.data.attributes.mime}`}
          />{" "}
        </video>
      ) : null}
    </>
  );
};

export default SliderItem;
