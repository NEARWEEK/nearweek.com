import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

const Image = ({ data }) => {
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
      minHeight: "502px",
    },
  }));

  let medium;
  const url = process.env.REACT_APP_BACKEND_URL;
  if (data) {
    medium = `${
      url + data.attributes.Image.data.attributes.formats.medium.url
    }`;
  }
  const classes = useStyles();
  return (
    <a href={`/editions/${data.id}`}>
      {data ? (
        <div
          style={{
            backgroundImage: `url('${medium}')`,
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
          className={classes.img}
        />
      ) : null}
    </a>
  );
};
export default Image;
