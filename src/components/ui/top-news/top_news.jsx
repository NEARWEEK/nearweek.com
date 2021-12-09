import * as React from "react";
import * as rootClasses from "../../../pages/index.module.css";
import BlockHeader from "../block-header/block_header";

const TopNews = () => {
  const ShowMore = <a href="#">Show more</a>;

  return (
    <div className={rootClasses.container}>
      <BlockHeader title={"Top News"} link={ShowMore} />
    </div>
  );
};

export default TopNews;
