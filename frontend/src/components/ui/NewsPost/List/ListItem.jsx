import Thumbnail from "../../Image/Thumbnail/Thumbnail";
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
      marginBottom: "24px",
    },
    postImage: {
      minWidth: "45%",
      borderRadius: "12px 0 0 12px",
    },
    itemContainer: {
      borderRadius: "12px",
      display: "flex",
    },
    postContent: {
      minWidth: "55%",
      background: matchEdition ? "#fff" : "#f7f7f7",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
    },
    postDate: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "28px",
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
                  <h3 className={classes.postTitle}>
                    <a href={`/news/${data.id}`}>{data.attributes.Title} </a>
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
