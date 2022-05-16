import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useMatch } from "react-router";
import * as Utils from "../../../../Utils/Utils";

const EditionsList = ({ exclude }) => {
  const [editions, setEditions] = useState([]);
  const [moreLength, setMoreLength] = useState(5);
  const matchEdition = useMatch(`/editions/:editionId`);
  const matchEditions = useMatch(`/editions`);

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
      "& button": {
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "20px",
      },
    },
    showMoreButton: {
      margin: "18px 0",
    },
  }));

  let editionsList = [];
  if (editions) {
    editionsList = [...editions];
    if (matchEdition) {
      editionsList = editions.filter(
        (item) => item.id !== Number(matchEdition.params.editionId)
      );
    }
    if (matchEditions) {
      editionsList = editions.slice(1);
    }
  }

  useEffect(() => {
    (async () => {
      const { data } = await Utils.api.getAllEditions();
      if (data) {
        if (exclude) {
          setEditions(data.filter((item) => item.id !== exclude));
        } else {
          setEditions(data);
        }
      }
    })();
  }, []);

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
    <div className="section">
      {editionsList.length > 0
        ? editionsList.slice(0, moreLength).map((edition, i) => {
            return (
              <ListItem
                key={`${edition.attributes.Title}-${i}`}
                data={edition}
              />
            );
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

export default EditionsList;
