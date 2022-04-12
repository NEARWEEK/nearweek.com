import React, { useEffect } from "react";
import { useMatch } from "react-router";
import makeStyles from "@mui/styles/makeStyles";
import Link from "@mui/material/Link";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo, MOBILE_WIDTH } from "../../../../Utils/Utils";
import ReactPlayer from "react-player/youtube";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

const GridItem = ({ data, key }) => {
  const matchVideo = useMatch(`/video/:viedoId`);
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);

  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flex: "1 1 100%",
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
      //borderRadius: "12px 0 0 12px",
      minHeight: 174,
      "& .react-player__preview": {
        //borderRadius: "12px 12px 0 0",
        "& .react-player__shadow": {
          background: "rgba(255, 255, 255, 0.82) !important",
          backdropFilter: "blur(48px)",
          borderRadius: "72px !important",
          width: "72px !important",
          height: "72px !important",
          "& .react-player__play-icon": {
            borderColor:
              "transparent transparent transparent #0d00ff !important",
          },
        },
      },
    },
    postContent: {
      minHeight: "25%",
      background: matchVideo ? "#fff" : "#f7f7f7",
      //borderRadius: "0 0 12px 12px",
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
      fontSize: 14,
      marginTop: 6,
      marginBottom: 6,
      maxHeight: "4rem",
      overflow: "hidden",
      WebkitLineClamp: 2,
      display: "box",
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
      whiteSpace: "normal",
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
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 },
                        },
                      }}
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
                  <Box display="inline-flex" className={classes.postCategory}>
                    {data.attributes.Tags.data ? (
                      <>
                        {data.attributes.Tags.data.map((item, index) => (
                          <>
                            {index > 0 &&
                              index < data.attributes.Tags.data.length &&
                              "•"}{" "}
                            <Box className={classes.categoryItem} key={index}>
                              {item.attributes.TagName}
                            </Box>
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                  <h3 className={classes.postTitle}>{data.attributes.Title}</h3>
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

export default GridItem;
