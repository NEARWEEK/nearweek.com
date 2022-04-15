import React from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
  return (
    <Helmet>
      <meta
        name="description"
        property="og:description"
        content={description.substring(0, 155)}
      />
      <meta property="og:type" content={type} />
      <meta name="title" property="og:title" content={title} />
      <meta name="url" property="og:url" content={url} />
      <meta
        name="image"
        property="og:image"
        content={location.origin + "/nearweek-logo.png"}
      />
    </Helmet>
  );
};

export default PageMetaTags;
