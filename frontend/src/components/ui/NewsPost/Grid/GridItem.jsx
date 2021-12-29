import * as React from "react";
import { getPubDate } from "../../../../Utils/Utils";
import Link from "@mui/material/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import Box from "@mui/material/Box";
import Thumbnail from "./Thumbnail/Thumbnail";

const GridItem = ({ data }) => {
  const matchEdition = useMatch(`/news/:articleId`);

  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flex: "1 1 326px",
    },
    postItem: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "24px",
    },
    itemContainer: {
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
    },
    postImage: {
      borderRadius: "12px 0 0 12px",
    },
    postContent: {
      minHeight: "25%",
      background: matchEdition ? "#fff" : "#f7f7f7",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
    },
    postCategory: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    categoryItem: {
      marginRight: "6px",
      marginLeft: "6px",
    },
    postTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
      "& a": {},
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
    },
    contentFooter: {
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
  }));

  const classes = useStyles();

  return (
    <>
      {data ? (
        <div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            <div className={classes.itemContainer}>
              {data.attributes.Image.data && (
                <div className={classes.postImage}>
                  <Thumbnail data={data} url={`/news/${data.id}`} />
                </div>
              )}
              <div className={classes.postContent}>
                <div className={classes.contentBody}>
                  {data && (
                    <Box display="inline-flex" className={classes.postCategory}>
                      {data.attributes.categories.data ? (
                        <>
                          {data.attributes.categories.data.map(
                            (item, index) => (
                              <>
                                {index > 0 &&
                                  index <
                                    data.attributes.categories.data.length &&
                                  "•"}{" "}
                                <Box
                                  className={classes.categoryItem}
                                  key={index}
                                >
                                  {item.attributes.Name}
                                </Box>
                              </>
                            )
                          )}
                        </>
                      ) : null}
                    </Box>
                  )}
                  <h3 className={classes.postTitle}>
                    <Link
                      color="inherit"
                      href={`/news/${data.id}`}
                      underline="none"
                    >
                      {data.attributes.Title}
                    </Link>
                  </h3>
                </div>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faEye} /> {data.attributes.views}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                      {data.attributes.likes}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faCommentAlt} /> 0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GridItem;
