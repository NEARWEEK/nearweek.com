import React from "react";
import { useMatch } from "react-router";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo } from "../../../../Utils/Utils";
import ReactPlayer from "react-player/youtube";

const GridItem = ({ data, key }) => {
  const matchEdition = useMatch(`/video/:viedoId`);

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
    postVideo: {
      borderRadius: "12px 0 0 12px",
      minHeight: "254px",
      "& .react-player__preview": {
        borderRadius: "12px 12px 0 0",
      },
    },
    postContent: {
      minHeight: "25%",
      background: matchEdition ? "#fff" : "#f7f7f7",
      borderRadius: "0 0 12px 12px",
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
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
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
              {data.attributes.Link && (
                <div className={classes.postVideo}>
                  {data.attributes?.Link ? (
                    <ReactPlayer
                      key={key}
                      controls={true}
                      width="100%"
                      height="100%"
                      light={true}
                      url={`${data.attributes.Link}`}
                      className={classes.slideItem}
                    />
                  ) : null}
                </div>
              )}
              <div className={classes.postContent}>
                <div className={classes.contentBody}>
                  <h3 className={classes.postTitle}>
                    <Link
                      color="inherit"
                      href={`/video/${data.id}`}
                      underline="none"
                    >
                      {data.attributes.Title}
                    </Link>
                  </h3>
                </div>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    <Widget icon={"Visibility"} data={data.attributes.Views} />
                    <Widget icon={"ThumbUp"} data={data.attributes.Likes} />
                    <Widget icon={"ChatBubble"} data={"0"} />
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

export default GridItem;
