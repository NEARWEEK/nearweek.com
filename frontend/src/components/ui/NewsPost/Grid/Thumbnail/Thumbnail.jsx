import * as React from "react";
import Link from "@mui/material/Link";
import makeStyles from "@mui/styles/makeStyles";

const Thumbnail = ({ data, url }) => {
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
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
              minWidth: "205px",
              minHeight: "205px",
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
