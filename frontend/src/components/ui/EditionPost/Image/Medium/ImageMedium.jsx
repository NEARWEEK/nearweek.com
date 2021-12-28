import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

const ImageMedium = ({ data }) => {
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
    },
  }));

  let medium;
  if (data) {
    medium = `${data.attributes.Image.data.attributes.formats.medium.url}`;
  }
  const classes = useStyles();
  return (
    <a href={`/editions/${data.id}`}>
      {data ? (
        <div
          style={{
            backgroundImage: `url('${medium}')`,
            backgroundSize: "cover",
            minWidth: "676px",
            minHeight: "419px",
          }}
          className={classes.img}
        />
      ) : null}
    </a>
  );
};
export default ImageMedium;
