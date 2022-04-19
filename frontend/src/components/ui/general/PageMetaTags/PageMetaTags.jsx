import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Markdown from "js-markdown";

const PageMetaTags = ({ title, description, type, url }) => {
  const [desc, setDesc] = useState(null);

  useEffect(() => {
    const html = Markdown.parse(description);
    setDesc(html.replace(/<[^>]+>/g, ""));
  }, [description]);

  return (
    <Helmet>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      {desc && <meta property="og:description" content={desc} />}
      <meta name="twitter:title" content={title} />
      {desc && (
        <meta name="twitter:text:title" content={desc.substring(0, 155)} />
      )}
      <meta
        name="twitter:image"
        content={`${window.location.origin}/nearweek-logo.jpg`}
      />
    </Helmet>
  );
};

export default PageMetaTags;
