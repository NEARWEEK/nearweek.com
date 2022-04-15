import React from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
  return (
    <Helmet>
      <meta property="og:description" content={description.substring(0, 155)} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:text:title" content={title} />
    </Helmet>
  );
};

export default PageMetaTags;
