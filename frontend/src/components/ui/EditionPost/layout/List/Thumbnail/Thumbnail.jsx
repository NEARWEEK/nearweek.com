import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";

const Thumbnail = ({ data }) => {
  const { Image } = data.attributes;
  const useStyles = makeStyles(() => ({
    imageList: {
      margin: 0,
    },
    img: {
      width: "100%",
      borderRadius: "12px 0 0 12px",
    },
  }));
  let thumbnail;
  let small;
  let medium;
  let large;
  const url = "/uploads/";
  if (Image) {
    thumbnail = `${url + Image.data.attributes.formats.thumbnail.url}`;
    small = `${url + Image.data.attributes.formats.small.url}`;
    medium = Image.data.attributes.formats.medium
      ? `${url + Image.data.attributes.formats.medium.url}`
      : `${url + Image.data.attributes.formats.small.url}`;
    large = Image.data.attributes.formats.large
      ? `${url + Image.data.attributes.formats.large.url}`
      : `${url + Image.data.attributes.formats.medium.url}`;
  }
  const classes = useStyles();
  return (
    <a href={`/editions/${data.id}`}>
      {Image ? (
        <div
          style={{
            backgroundImage: `url('${medium}')`,
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            backgroundPosition: "50% 50%",
          }}
          className={classes.img}
        />
      ) : null}
    </a>
  );
};

export default Thumbnail;
