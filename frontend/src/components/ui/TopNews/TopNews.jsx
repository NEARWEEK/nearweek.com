import * as React from "react";
import rootStyles from "../../../pages/app.module.css";
import styles from "./top_news.module.css";
import SectionHeader from "../SectionHeader/SectionHeader";

const TopNews = () => {
  const ShowMore = <a href="#">Show more</a>;

  return (
    <div className={rootStyles.wrapper}>
      <div className={rootStyles.container}>
        <SectionHeader title={"Top News"} link={ShowMore} />
        <div className={styles.blockNews}></div>
      </div>
    </div>
  );
};

export default TopNews;
