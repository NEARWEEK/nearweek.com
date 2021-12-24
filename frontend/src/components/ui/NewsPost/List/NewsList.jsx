import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ListItem from "./ListItem";
import { useMatch } from "react-router";

const NewsList = ({ news }) => {
  const useStyles = makeStyles(() => ({}));

  let newsList = [];
  if (news) {
    newsList = [...news.data];
  }

  const classes = useStyles();

  return (
    <>
      {newsList.length > 0
        ? newsList.map((article, i) => {
            return <ListItem key={i} data={article} />;
          })
        : null}
    </>
  );
};

export default NewsList;
