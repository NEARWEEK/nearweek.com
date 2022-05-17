import * as React from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { parseMarkdown } from "../../../../Utils/Utils";

const PostDescription = ({ body, maxLine = 2 }) => {
  const html = parseMarkdown(body);

  return (
    <HTMLEllipsis
      unsafeHTML={html}
      maxLine={maxLine}
      ellipsis="..."
      basedOn="words"
    />
  );
};

export default PostDescription;
