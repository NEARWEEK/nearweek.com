import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import * as Utils from "../../../../../Utils/Utils";

const ImageMedium = ({ data }) => {
  const isMobileMatch = Utils.isMobileMatch();
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      minHeight: isMobileMatch ? "205px" : "419px",
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
          }}
          className={classes.img}
        />
      ) : null}
    </a>
  );
};
export default ImageMedium;
