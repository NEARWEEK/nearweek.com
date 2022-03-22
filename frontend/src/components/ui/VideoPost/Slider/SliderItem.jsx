import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/youtube";
import Link from "@mui/material/Link";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo } from "../../../../Utils/Utils";

const SliderItem = (props) => {
  const useStyles = makeStyles(() => ({
    contentContainer: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplateRows: "70% 30%",
      "& .player-wrapper": {
        width: "auto",
        height: "auto",
      },
    },
    "& .player-wrapper": {
      width: "auto",
      height: "auto",
      "& .react-player__preview": {
        paddingTop: "56.25%",
        position: "relative",
      },
      "& .react-player__preview > div ": {
        position: "absolute",
      },
      "& .carousel-item": {
        maxWidth: "100%",
        "& .react-player__shadow": {
          background: "rgba(255, 255, 255, 0.82) !important",
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
      background: "#f7f7f7",
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
      {props.video.attributes?.Link ? (
        <>
          <div className={classes.contentContainer}>
            <div className="player-wrapper">
              <ReactPlayer
                key={props.video.id}
                width="100%"
                height="100%"
                controls={true}
                light={true}
                className="carousel-item"
                url={`${props.video.attributes.Link}`}
              />
            </div>
            <div className={classes.postContent}>
              <div className={classes.contentBody}>
                <h3 className={classes.postTitle}>
                  <Link
                    color="inherit"
                    href={`/video/${props.video.id}`}
                    underline="none"
                  >
                    {props.video.attributes.Title}
                  </Link>
                </h3>
              </div>
              <div className={classes.contentFooter}>
                <div className={classes.postWidgets}>
                  <Widget
                    icon={"Visibility"}
                    data={props.video.attributes.Views}
                  />
                  <Widget
                    icon={"ThumbUp"}
                    data={props.video.attributes.Likes}
                  />
                  <Widget icon={"ChatBubble"} data={"0"} />
                </div>
                <div className={classes.footerDate}>
                  {getTimeAgo(props.video.attributes.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SliderItem;
