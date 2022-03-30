import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";

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
    },
  }));

  let medium;
  if (data.attributes.Image.data) {
    medium = `${data.attributes.Image.data.attributes.formats.medium.url}`;
  }
  const classes = useStyles();
  return (
    <>
      {!isHyperlink() && (
        <a href={`/news/${data.attributes.slug}`}>
          {medium ? (
            <div
              style={{
                backgroundImage: `url('${medium}')`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                width: "100%",
                height: "100%",
              }}
              className={classes.img}
            />
          ) : null}
        </a>
      )}
      {isHyperlink() && (
        <a href={`${data.attributes.LinkTo}`}>
          {medium ? (
            <div
              style={{
                backgroundImage: `url('${medium}')`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                width: "100%",
                height: "100%",
              }}
              className={classes.img}
            />
          ) : null}
        </a>
      )}
    </>
  );
};
export default ImageMedium;
