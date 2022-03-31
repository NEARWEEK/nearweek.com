import React from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, image }) => {
  return (
    <Helmet>
      <meta
        id="og-description"
        property="og:description"
        content={description.substring(0, 155)}
      />
      <meta property="og:type" content={type} />
      <meta id="og-title" property="og:title" content={title} />
      <meta id="og-image" property="og:image" content={image} />
    </Helmet>
  );
};

export default PageMetaTags;
