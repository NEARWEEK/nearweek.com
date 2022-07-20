import { useState } from "react";
import ListItem from "./ListItem";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Button } from "@mui/material";
import { useNews } from "../../hooks/useNews";

const NewsList = ({ exclude, show = 3, showMore = false }) => {
  const { news } = useNews();
  const [moreLength, setMoreLength] = useState(3);

  const useStyles = makeStyles(() => ({
    showMoreBlock: {
      flex: 1,
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

  const showMoreHandler = () => {
    if (moreLength < news.length) {
      const nextLength =
        news.length - moreLength < 3 ? news.length - moreLength : 3;
      setMoreLength(moreLength + nextLength);
    }
  };

  const classes = useStyles();
  return (
    <Box sx={{ gap: 3, display: "flex", flexWrap: "wrap", maxWidth: "100%" }}>
      {news.length > 0 &&
        news
          .slice(0, show === "all" ? news.length : show)
          .slice(0, moreLength)
          .map((article, index) => (
            <>
              {exclude ? (
                <>
                  {exclude !== article.id && (
                    <ListItem
                      key={article.attributes.Title + index}
                      data={article}
                    />
                  )}
                </>
              ) : (
                <ListItem
                  key={article.attributes.Title + index}
                  data={article}
                />
              )}
            </>
          ))}
      {showMore && (
        <div className={classes.showMoreBlock}>
          <span className={classes.showMoreButton}>
            <Button
              disabled={moreLength === news.length}
              onClick={showMoreHandler}
            >
              Show more
            </Button>
          </span>
        </div>
      )}
    </Box>
  );
};

export default NewsList;
