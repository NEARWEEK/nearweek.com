import React from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
  console.log(location);
  return (
    <Helmet>
      <meta property="og:description" content={description.substring(0, 155)} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

export default PageMetaTags;
