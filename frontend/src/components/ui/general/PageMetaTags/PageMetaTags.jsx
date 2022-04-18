import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
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
    setTitle(title);
    //    setTweeterTitle(title);
    //    setTweeterTextTitle(title);
  }, [title]);

  return (
    <Helmet>
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      {/*  <meta property="og:title" content={title} />*/}
    </Helmet>
  );
};

export default PageMetaTags;
