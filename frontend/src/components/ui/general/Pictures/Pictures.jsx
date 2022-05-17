import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import * as React from "react";
import { useStyles } from "./Pictures.styles";
import LazyLoad from "react-lazyload";

const Pictures = ({ pictures }) => {
  const classes = useStyles();
  return (
    <>
      {pictures &&
        pictures.map((picture) => (
          <Box key={picture.Image.data.attributes.caption}>
            <p>
              <LazyLoad height={205} once>
                <img
                  className={classes.hoverPicture}
                  src={picture.Image.data?.attributes.url}
                  alt={picture.Image.data.attributes.caption}
                />
              </LazyLoad>
              {picture.Description && (
                <ReactMarkdown>{picture.Description}</ReactMarkdown>
              )}
            </p>
          </Box>
        ))}
    </>
  );
};

export default Pictures;
