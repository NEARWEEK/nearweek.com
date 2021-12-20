import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import { useState } from "react";
import List from "./layout/List/List";

const EditionPost = ({ editions }) => {
  const [moreLength, setMoreLength] = useState(5);

  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
      minHeight: "502px",
    },
    showMoreBlock: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f7f7",
      marginBottom: "24px",
      fontWeight: "bold",
    },
    showMoreButton: {
      margin: "24px 0",
    },
  }));

  let editionsList = [];
  if (editions) {
    editionsList = editions.data.slice(1);
  }

  const showMoreHandler = () => {
    if (moreLength < editionsList.length) {
      const nextLength =
        editionsList.length - moreLength < 5
          ? editionsList.length - moreLength
          : 5;
      setMoreLength(moreLength + nextLength);
    }
  };

  const classes = useStyles();
  return (
    <div>
      {editionsList.length > 0
        ? editionsList.slice(0, moreLength).map((edition, i) => {
            return <List key={i} data={edition} />;
          })
        : null}
      <div className={classes.showMoreBlock}>
        <span className={classes.showMoreButton}>
          <Button
            disabled={moreLength === editionsList.length}
            onClick={showMoreHandler}
          >
            Show more
          </Button>
        </span>
      </div>
    </div>
  );
};

export default EditionPost;
