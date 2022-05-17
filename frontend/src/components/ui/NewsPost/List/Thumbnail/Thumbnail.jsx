import * as React from "react";
import Link from "@mui/material/Link";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";

const Thumbnail = ({ data, url }) => {
  const Image = data?.attributes?.Image || null;
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles(() => ({
    img: {
      width: isMobileMatch ? 68 : 205,
      height: isMobileMatch ? 68 : "100%",
      objectFit: "cover",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px",
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
      <Link href={url} underline="none">
        <img src={imageUrl} className={"image " + classes.img} />
      </Link>
    </>
  );
};

export default Thumbnail;
