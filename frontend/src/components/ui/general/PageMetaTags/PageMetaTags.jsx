import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
  const setDescription = (desc) => {
    const el = document.querySelector("meta[property='og:description']");
    el.setAttribute("content", desc);
  };

  const setTitle = (title) => {
    const el = document.querySelector("meta[property='og:title']");
    el.setAttribute("content", title);
  };

  const setTweeterTitle = (title) => {
    const el = document.querySelector("meta[property='tweeter:title']");
    el.setAttribute("content", title);
  };

  useEffect(() => {
    setDescription(description.substring(0, 155));
  }, [description]);

  useEffect(() => {
    setTitle(title);
    setTweeterTitle(title);
  }, [title]);

  return (
    <Helmet prepend>
      {/*<meta property="og:description" content={description.substring(0, 155)} />*/}
      <meta property="og:type" content="article" />
      {/* <meta property="og:title" content={title} />*/}
      <meta property="og:url" content={url} />
      {/* <meta property="twitter:title" content={title} />*/}
      <meta property="twitter:text:title" content={title} />
    </Helmet>
  );
};

export default PageMetaTags;
