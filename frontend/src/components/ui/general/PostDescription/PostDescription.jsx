import * as React from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { parseMarkdown } from "../../../../Utils/Utils";

const PostDescription = ({ body }) => {
  const html = parseMarkdown(body);

  return (
    <HTMLEllipsis
      unsafeHTML={html}
      maxLine="2"
      ellipsis="..."
      basedOn="words"
    />
  );
};

export default PostDescription;
