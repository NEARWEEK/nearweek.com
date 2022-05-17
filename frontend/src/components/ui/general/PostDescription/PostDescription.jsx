import * as React from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { parseMarkdown } from "../../../../Utils/Utils";

const PostDescription = ({ body, maxLine = 2, handleRleState }) => {
  const html = parseMarkdown(body);

  const handleReflow = ({ clamped }) => {
    return handleRleState && handleRleState(clamped);
  };

  return (
    <HTMLEllipsis
      unsafeHTML={html}
      maxLine={maxLine}
      ellipsis="..."
      basedOn="words"
      onReflow={handleReflow}
    />
  );
};

export default PostDescription;
