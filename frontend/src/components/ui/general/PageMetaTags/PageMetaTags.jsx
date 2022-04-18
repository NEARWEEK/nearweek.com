import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Markdown from "js-markdown";

const PageMetaTags = ({ title, description, type, url }) => {
  const [desc, setDesc] = useState(null);

  useEffect(() => {
    const html = Markdown.parse(description);
    setDesc(html.replace(/<[^>]+>/g, ""));
  }, [description]);

  const setDescription = (desc) => {
    const el = document.querySelector("meta[property='og:description']");
    el.setAttribute("content", desc);
  };

  const setTitle = (title) => {
    const meta = document.createElement("meta");
    meta.setAttribute("property", "twitter:title");
    meta.setAttribute("content", title);
    document.head.insertBefore(meta, document.head.firstElementChild);
    //document.getElementsByTagName("head")[0].appendChild(meta);
  };

  const _setTitle = (title) => {
    const el = document.querySelector("meta[property='og:title']");
    el.setAttribute("content", title);
  };

  const setTweeterTitle = (title) => {
    const el = document.querySelector("meta[property='twitter:title']");
    el.setAttribute("content", title);
  };

  const setTweeterTextTitle = (title) => {
    const el = document.querySelector("meta[property='twitter:text:title']");
    el.setAttribute("content", title);
  };

  useEffect(() => {
    //setDescription(description.substring(0, 155));
  }, [description]);

  useEffect(() => {
    //setTitle(title);
    //    setTweeterTitle(title);
    //    setTweeterTextTitle(title);
  }, [title]);

  return (
    <Helmet>
      <meta property="og:type" content="article" />
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
