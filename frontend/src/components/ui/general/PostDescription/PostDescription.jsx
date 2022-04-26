import * as React from "react";
import Markdown from "js-markdown";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

const PostDescription = ({ body }) => {
  const html = Markdown.parse(body);

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
