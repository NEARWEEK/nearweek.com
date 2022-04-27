import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";

const ImageMedium = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const categories = data.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
      minHeight: isMobileMatch ? "262px" : "362px",
      height: "100%",
    },
  }));

  let imageUrl = placeholder.getRandomPlaceholder("medium");
  if (data.attributes.Image?.data?.attributes) {
    const { large, medium } = data.attributes.Image.data.attributes.formats;
    imageUrl = large?.url || medium?.url;
  }

  const classes = useStyles();
  return (
    <>
      {!isHyperlink() && (
        <a href={`/content/${data.attributes.slug}`}>
          {/*<div
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              height: "100%",
            }}
            className={classes.img}
          />*/}
          <img src={imageUrl} className={classes.img} />
        </a>
      )}
      {isHyperlink() && (
        <a href={`${data.attributes.LinkTo}`}>
          {/*          <div
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              height: "100%",
            }}
            className={classes.img}
          />*/}
          <img src={imageUrl} className={classes.img} />
        </a>
      )}
    </>
  );
};
export default ImageMedium;
