import * as rootClasses from "../../../pages/app.module.css";
import * as classes from "../top-news/top_news.module.css";
import Teaser from "../article/teaser/teaser";
import * as React from "react";

const Post = (props) => {
  return (
    <div className={rootClasses.wrapper}>
      <div className={rootClasses.container}>
        <div className={classes.blockNews}>
          <Teaser />
        </div>
      </div>
    </div>
  );
};

export default Post;
