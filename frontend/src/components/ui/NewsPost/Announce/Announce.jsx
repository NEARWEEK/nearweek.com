import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo, MOBILE_WIDTH } from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import Truncate from "react-truncate";
import ReactMarkdown from "react-markdown";

const Announce = ({ article }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const categories = article && article.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

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
      fontSize: isMobileMatch ? "26px" : "42px",
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
      color: "rgba(0, 0, 0, 0.54)",
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
              {!isHyperlink() && (
                <Link
                  color="inherit"
                  href={`/news/${article.attributes.slug}`}
                  underline="none"
                >
                  {article.attributes.Title}
                </Link>
              )}
              {isHyperlink() && (
                <Link
                  color="inherit"
                  href={`${article.attributes.LinkTo}`}
                  underline="none"
                >
                  {article.attributes.Title}
                </Link>
              )}
            </h2>
            <p className={classes.postBody}>
              <Truncate lines={2}>
                <ReactMarkdown>{article.attributes.Body}</ReactMarkdown>
              </Truncate>
            </p>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              {/*<Widget icon={"Visibility"} data={article.attributes.Views} />*/}
              {/*<Widget icon={"ThumbUp"} data={article.attributes.Likes} />*/}
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
