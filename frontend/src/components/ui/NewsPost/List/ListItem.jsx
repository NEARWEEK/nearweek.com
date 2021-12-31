import Thumbnail from "./Thumbnail/Thumbnail";
import { getPubDate } from "../../../../Utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const ListItem = ({ data, meta }) => {
  const matchEdition = useMatch(`/news/:articleId`);

  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flexDirection: "column",
    },
    postItem: {
      display: "flex",
      flexDirection: "row",
    },
    postImage: {
      borderRadius: "12px 0 0 12px",
    },
    itemContainer: {
      borderRadius: "12px",
      display: "flex",
    },
    postContent: {
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
      marginLeft: "6px",
      marginRight: "6px",
    },
    postTitle: {
      marginTop: "6px",
      marginBottom: "6px",
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
                      underline="none"
                      href={`/news/${data.id}`}
                    >
                      {data.attributes.Title}{" "}
                    </Link>
                  </h3>
                  <p className={classes.postBody}>
                    {data.attributes.Body.substring(0, 130)}
                  </p>
                </div>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faEye} /> {data.attributes.views}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faThumbsUp} />{" "}
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

export default ListItem;