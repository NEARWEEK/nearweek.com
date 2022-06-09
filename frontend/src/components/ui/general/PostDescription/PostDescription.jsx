import * as React from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { addBlankTargets, parseMarkdown } from "../../../../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";

const PostDescription = ({ body, maxLine = 2, handleRleState }) => {
  let html = parseMarkdown(body);

  html = addBlankTargets(html);

  const useStyles = makeStyles((theme) => ({
    textEllipsis: {
      "& p": {
        margin: 0,
        marginBottom: theme.spacing(1),
      },
    },
  }));

  const handleReflow = ({ clamped }) => {
    return handleRleState && handleRleState(clamped);
  };

  const classes = useStyles();

  return (
    <HTMLEllipsis
      unsafeHTML={html}
      maxLine={maxLine}
      ellipsis="..."
      basedOn="words"
      className={classes.textEllipsis}
      onReflow={handleReflow}
    />
  );
};

export default PostDescription;
