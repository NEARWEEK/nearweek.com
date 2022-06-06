import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";
import LazyLoad from "react-lazyload";

const Thumbnail = ({ data, url }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      width: isMobileMatch ? "68px" : "362px",
      height: isMobileMatch ? "68px" : "205px",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px",
      objectFit: "cover",
    },
  }));
  let imageUrl = placeholder.getRandomPlaceholder("small");
  if (Image.data) {
    const { large, medium, small, thumbnail } = Image.data.attributes.formats;
    imageUrl =
      small?.url ||
      medium?.url ||
      large?.url ||
      placeholder.getRandomPlaceholder("small");
  }
  const classes = useStyles();
  return (
    <>
      <a href={url} target="_blank" rel="noreferrer">
        <LazyLoad height={205} once>
          <img src={imageUrl} className={"image " + classes.img} />
        </LazyLoad>
      </a>
    </>
  );
};

export default Thumbnail;
