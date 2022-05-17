import { useState } from "react";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import * as React from "react";
import { useStyles } from "./ReadMore.styles";
import { Collapse } from "react-collapse";
import { parseMarkdown } from "../../../../Utils/Utils";
import PostDescription from "../PostDescription/PostDescription";
import Pictures from "../Pictures/Pictures";

const ReadMore = ({ children, images }) => {
  const text = parseMarkdown(children);
  const [isReadMore, setIsReadMore] = useState(true);
  const classes = useStyles();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Box className={classes.container}>
      {isReadMore ? <PostDescription maxLine={4} body={text} /> : null}
      <Collapse isOpened={!isReadMore}>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className={classes.content}
        />
        {images && (
          <Box display="flex" flexDirection="column">
            <Pictures pictures={images} />
          </Box>
        )}
      </Collapse>
      <Box
        onClick={toggleReadMore}
        className={classes.readMoreLink}
        sx={{ cursor: "pointer" }}
      >
        <>
          {text.length > 330 && <> {isReadMore ? "Read more" : "Show less"}</>}
        </>
      </Box>
    </Box>
  );
};

export default ReadMore;
