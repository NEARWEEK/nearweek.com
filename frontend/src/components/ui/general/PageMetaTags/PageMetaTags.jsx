import React from "react";
import { Helmet } from "react-helmet";

const PageMetaTags = ({ title, description, type, url }) => {
  return (
    <Helmet>
      <meta property="og:description" content={description.substring(0, 155)} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={window.location.origin + "/nearweek-logo.png"}
      />
      <meta
        property="og:image:secure_url"
        content={window.location.origin + "/nearweek-logo.png"}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:title" content={title} />
      <meta property="og:image:type" content="imge/png" />
    </Helmet>
  );
};

export default PageMetaTags;
