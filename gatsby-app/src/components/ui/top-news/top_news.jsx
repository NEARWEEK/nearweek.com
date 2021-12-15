import * as React from "react";
import * as rootClasses from "../../../pages/app.module.css";
import BlockHeader from "../block-header/block_header";
import Teaser from "../article/teaser/teaser";
import * as classes from "./top_news.module.css";

const TopNews = () => {
  const ShowMore = <a href="#">Show more</a>;

  return (
    <div className={rootClasses.wrapper}>
      <div className={rootClasses.container}>
        <BlockHeader title={"Top News"} link={ShowMore} />
        <div className={classes.blockNews}>
          <Teaser />
        </div>
      </div>
    </div>
  );
};

export default TopNews;
