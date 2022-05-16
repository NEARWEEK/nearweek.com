import { useState } from "react";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import * as React from "react";
import { useStyles } from "./ReadMore.styles";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const classes = useStyles();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Box className={classes.container}>
      <ReactMarkdown className={classes.content}>
        {isReadMore ? text.slice(0, 230) + "..." : text}
      </ReactMarkdown>
      <Box
        onClick={toggleReadMore}
        className={classes.readMoreLink}
        sx={{ cursor: "pointer" }}
      >
        {isReadMore ? "Read more" : "Show less"}
      </Box>
    </Box>
  );
};

export default ReadMore;
