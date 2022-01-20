import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import * as Utils from "../../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";

const ImageMedium = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      minHeight: isMobileMatch ? "205px" : "419px",
      borderRadius: "12px 12px 0 0",
    },
  }));
  let medium;
  if (data.attributes.Image?.data) {
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
