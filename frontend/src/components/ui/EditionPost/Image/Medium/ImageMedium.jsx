import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import * as Utils from "../../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";
import LazyLoad from "react-lazyload";

const ImageMedium = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles((theme) => ({
    img: {
      width: "100%",
      maxHeight: "419px",
      objectFit: "cover",
      [theme.breakpoints.down("sm")]: {
        maxHeight: "205px",
      },
      borderRadius: "12px 12px 0 0",
    },
  }));
  let imageUrl = placeholder.getRandomPlaceholder("medium");
  if (data.attributes.Image?.data) {
    const { large, medium } = data.attributes.Image.data.attributes.formats;
    imageUrl =
      medium?.url || large?.url || placeholder.getRandomPlaceholder("medium");
  }
  const classes = useStyles();
  return (
    <a href={`/newsletter/${data.attributes.slug}`}>
      <LazyLoad height={205} once>
        <img src={imageUrl} className={classes.img} />
      </LazyLoad>
    </a>
  );
};
export default ImageMedium;
