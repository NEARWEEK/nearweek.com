import * as React from "react";
import Link from "@mui/material/Link";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";

const Thumbnail = ({ data, url }) => {
  const Image = data?.attributes?.Image || null;
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles(() => ({
    img: {
      minWidth: isMobileMatch ? "100%" : "205px",
      minHeight: isMobileMatch ? "205px" : "100%",
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
        <Link href={url} underline="none">
          <div
            style={{
              backgroundImage: `url('${thumbnail}')`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
            className={classes.img}
          />{" "}
        </Link>
      ) : null}
    </>
  );
};

export default Thumbnail;
