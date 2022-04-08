import Thumbnail from "./Thumbnail/Thumbnail";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../../../../Utils/Utils";
import Widget from "../../general/Widget/Widget";
import Truncate from "react-truncate";
import ReactMarkdown from "react-markdown";

const ListItem = ({ data }) => {
  const matchEdition = useMatch(`/news/:articleId`);
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const categories = data.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      width: "100%",
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
      flex: 1,
      flexDirection: !isMobileMatch ? "row" : "column",
    },
    postContent: {
      borderRadius: !isMobileMatch ? "0 12px  12px 0" : "12px",
      background: matchEdition ? "#fff" : "#f7f7f7",
      flex: 1,
      width: "100%",
      maxWidth: "456px",
      display: "flex",
      flexDirection: "column",
    },
    contentBody: {
      display: "flex",
      alignItems: "flex-start",
      padding: "16px 16px 0 16px",
      "& .image-container": {
        marginBottom: "16px",
      },
      "& .image-container .image": {
        marginRight: "16px",
      },
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
      fontSize: isMobileMatch ? "16px" : "20px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    contentFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
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
  }));

  const classes = useStyles();

  return (
    <>
      {data ? (
        <div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            <div className={classes.itemContainer}>
              {!isMobileMatch && (
                <div className={classes.postImage}>
                  {!isHyperlink() && (
                    <Thumbnail
                      data={data}
                      url={`/news/${data.attributes.slug}`}
                    />
                  )}
                  {isHyperlink() && (
                    <Thumbnail data={data} url={`${data.attributes.LinkTo}`} />
                  )}
                </div>
              )}
              <div className={classes.postContent}>
                <div className={classes.contentBody}>
                  {isMobileMatch && (
                    <div className="image-container">
                      <div className={classes.postImage}>
                        {!isHyperlink() && (
                          <Thumbnail
                            data={data}
                            url={`/news/${data.attributes.slug}`}
                          />
                        )}
                        {isHyperlink() && (
                          <Thumbnail
                            data={data}
                            url={`${data.attributes.LinkTo}`}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  <div className="body-container">
                    {data && (
                      <Box
                        display="inline-flex"
                        className={classes.postCategory}
                      >
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
                      {!isHyperlink() && (
                        <Link
                          color="inherit"
                          underline="none"
                          href={`/news/${data.attributes.slug}`}
                        >
                          {data.attributes.Title}
                        </Link>
                      )}
                      {isHyperlink() && (
                        <Link
                          color="inherit"
                          underline="none"
                          href={`${data.attributes.LinkTo}`}
                        >
                          {data.attributes.Title}
                        </Link>
                      )}
                    </h3>
                    {!isMobileMatch && (
                      <div className={classes.postBody}>
                        <ReactMarkdown>{data.attributes.Body}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    <Widget icon={"Visibility"} data={data.attributes.Views} />
                    {/*<Widget icon={"ThumbUp"} data={data.attributes.Likes} />*/}
                  </div>
                  <div className={classes.footerDate}>
                    {getTimeAgo(data.attributes.createdAt)}
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
