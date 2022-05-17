import { useState } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import { useStyles } from "./ReadMore.styles";
import { Collapse } from "react-collapse";
import { parseMarkdown } from "../../../../Utils/Utils";
import PostDescription from "../PostDescription/PostDescription";
import Pictures from "../Pictures/Pictures";

const ReadMore = ({ children, images }) => {
  const text = children ? parseMarkdown(children) : "";
  const [isReadMore, setIsReadMore] = useState(true);
  const [clamped, setClamped] = useState(false);
  const classes = useStyles();
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleRleState = (rleState) => {
    setClamped(rleState);
  };

  return (
    <Box className={classes.container}>
      {isReadMore ? (
        <>
          <PostDescription
            maxLine={4}
            body={text}
            handleRleState={handleRleState}
          />
        </>
      ) : null}
      <Collapse isOpened={!isReadMore}>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className={classes.content}
        />
        {images ? (
          <Box display="flex" flexDirection="column">
            <Pictures pictures={images} />
          </Box>
        ) : null}
      </Collapse>
      {!children && images && (
        <Box display="flex" flexDirection="column">
          <Pictures pictures={images} />
        </Box>
      )}
      <Box
        onClick={toggleReadMore}
        className={classes.readMoreLink}
        sx={{ cursor: "pointer" }}
      >
        <>{clamped && <> {isReadMore ? "Read more" : "Show less"}</>}</>
      </Box>
    </Box>
  );
};

export default ReadMore;
