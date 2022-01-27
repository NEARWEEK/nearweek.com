import React from "react";
import ListItem from "./ListItem";

const NewsList = ({ news }) => {
  return (
    <>
      {news.length > 0
        ? news.map((article, i) => {
            return <ListItem key={i} data={article} meta={news.meta} />;
          })
        : null}
    </>
  );
};

export default NewsList;
