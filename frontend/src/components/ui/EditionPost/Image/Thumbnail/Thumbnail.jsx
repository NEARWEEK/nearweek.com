import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";

const Thumbnail = ({ data, url }) => {
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 0 0 12px",
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
              width: "362px",
              height: "205px",
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
