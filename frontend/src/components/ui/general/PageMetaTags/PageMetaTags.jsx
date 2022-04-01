import React from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
  return (
    <Helmet>
      <meta
        id="og-description"
        name="description"
        property="og:description"
        content={description.substring(0, 155)}
      />
      <meta property="og:type" content={type} />
      <meta name="title" id="og-title" property="og:title" content={title} />
      <meta name="url" id="og-url" property="og:url" content={url} />
    </Helmet>
  );
};

export default PageMetaTags;
