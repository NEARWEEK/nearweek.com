import * as React from "react";
import Link from "@mui/material/Link";
import makeStyles from "@mui/styles/makeStyles";
import { placeholder } from "../../../../../Utils/placeholder";

const Thumbnail = ({ data, url }) => {
  const Image = data?.attributes?.Image || null;
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px 12px 0 0",
    },
  }));
  let imageUrl = placeholder.getRandomPlaceholder("small");
  if (Image.data) {
    const { small, thumbnail } = Image.data.attributes.formats;
    imageUrl = small?.url || thumbnail.url;
  }
  const classes = useStyles();
  return (
    <>
      <Link href={url} underline="none">
        {/*        <div
          style={{
            backgroundImage: `url('${thumbnail}')`,
            backgroundSize: "cover",
            minWidth: "205px",
            minHeight: "205px",
            backgroundPosition: "50% 50%",
          }}
          className={classes.img}
        />*/}
        <img src={imageUrl} className={classes.img} />
      </Link>
    </>
  );
};

export default Thumbnail;
