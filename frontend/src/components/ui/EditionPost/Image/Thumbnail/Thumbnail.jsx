import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../../../../../Utils/Utils";

const Thumbnail = ({ data, url }) => {
  const isMobileMatch = Utils.isMobileMatch();
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      width: isMobileMatch ? "100%" : "362px",
      height: "205px",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px 12px 0 0",
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
            className={classes.img}
          />{" "}
        </a>
      ) : null}
    </>
  );
};

export default Thumbnail;
