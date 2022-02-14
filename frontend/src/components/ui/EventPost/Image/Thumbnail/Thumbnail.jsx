import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";

const Thumbnail = ({ data, url }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      minWidth: isMobileMatch ? "68px" : "362px",
      minHeight: isMobileMatch ? "68px" : "100%",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px",
    },
  }));
  let thumbnail;
  if (Image.data) {
    thumbnail = `${Image.data.attributes.formats.thumbnail.url}`;
  }
  const classes = useStyles();
  return (
    <>
      {Image.data ? (
        <a href={url}>
          <div
            style={{
              backgroundImage: `url('${thumbnail}')`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
            className={"image " + classes.img}
          />{" "}
        </a>
      ) : null}
    </>
  );
};

export default Thumbnail;
