import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";

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
  let thumbnail = placeholder.getRandomPlaceholder("small");
  if (Image.data) {
    thumbnail = `${Image.data.attributes.formats.thumbnail.url}`;
  }
  const classes = useStyles();
  return (
    <>
      <a href={url}>
        {/*        <div
          style={{
            backgroundImage: `url('${thumbnail}')`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
          className={"image " + classes.img}
        />*/}
        <img src={thumbnail} className={classes.img} />
      </a>
    </>
  );
};

export default Thumbnail;
