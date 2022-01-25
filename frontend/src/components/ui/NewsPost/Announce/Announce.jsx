import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo } from "../../../../Utils/Utils";

const Announce = ({ article }) => {
  const useStyles = makeStyles(() => ({
    latestPost: {
      marginBottom: "36px",
      width: "100%",
      background: "#dbd9d7",
      borderRadius: "12px",
    },
    content: {
      padding: "24px 24px 0",
    },
    image: {
      borderRadius: "12px 12px 0 0",
      width: "100%",
    },
    postCategory: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginTop: "12px",
      marginBottom: "12px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "18px",
      lineHeight: "24px",
      marginTop: 0,
    },
    postFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 24px",
      borderTop: "1px solid #c8c6c6",
      borderRadius: "0 0 12px 12px",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
    footerDate: {
      fontSize: "12px",
      color: "#656364",
    },
    categoryItem: {
      marginRight: "6px",
      marginLeft: "6px",
    },
  }));

  const classes = useStyles();
  return (
    <>
      {article ? (
        <div className={classes.latestPost}>
          <div className={classes.image}>
            <ImageMedium data={article} />
          </div>
          <div className={classes.content}>
            <div className={classes.postCategory}>
              {article && (
                <Box display="inline-flex">
                  {article.attributes.categories.data ? (
                    <>
                      {article.attributes.categories.data.map((item, index) => (
                        <>
                          {index > 0 &&
                            index < article.attributes.categories.data.length &&
                            "•"}{" "}
                          <Box className={classes.categoryItem} key={index}>
                            {item.attributes.Name}
                          </Box>
                        </>
                      ))}
                    </>
                  ) : null}
                </Box>
              )}
            </div>
            <h2 className={classes.postTitle}>
              <Link
                color="inherit"
                href={`/news/${article.id}`}
                underline="none"
              >
                {article.attributes.Title}
              </Link>
            </h2>
            <p className={classes.postBody}>
              {article.attributes.Body.substring(0, 130)}
            </p>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              <Widget icon={"Visibility"} data={article.attributes.views} />
              <Widget icon={"ThumbUp"} data={article.attributes.likes} />
              <Widget icon={"ChatBubble"} data={"0"} />
            </div>
            <div className={classes.footerDate}>
              {getTimeAgo(article.attributes.createdAt)}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
