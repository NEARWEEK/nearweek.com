import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";

const ImageMedium = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : 0,
      minHeight: !isMobileMatch ? 526 : 360,
    },
  }));

  let imageUrl = placeholder.getRandomPlaceholder("medium");
  if (data.attributes.Image.data) {
    const { large, medium, small, thumbnail } =
      data.attributes.Image.data.attributes.formats;
    imageUrl = large?.url || medium?.url || small?.url || thumbnail.url;
  }
  const classes = useStyles();
  return (
    <a href={`/events/${data.attributes.slug}`}>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          height: "100%",
        }}
        className={classes.img}
      />
    </a>
  );
};
export default ImageMedium;
