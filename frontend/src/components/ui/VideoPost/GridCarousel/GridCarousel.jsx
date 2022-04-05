import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import ReactPlayer from "react-player/youtube";
import Link from "@mui/material/Link";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo } from "../../../../Utils/Utils";
import * as Utils from "../../../../Utils/Utils";

const GridCarousel = ({ show = 4 }) => {
  const [video, setVideo] = useState([]);

  useEffect(async () => {
    const { data } = await Utils.api.getLatestVideo(1, show);
    if (data) {
      setVideo(data);
    }
  }, []);

  const useStyles = makeStyles(() => ({
    carouselWrapper: {
      overflow: "hidden",
      "& .carousel": {
        display: "flex",
        flexDirection: "row",
        listStyle: "none",
        margin: 0,
        padding: 0,
        position: "relative",
        alignItems: "stretch",
        justifyContent: "center",
        "@media screen and (max-width: 800px)": {
          flexDirection: "column",
          gap: "24px",
        },
      },
      "& .carousel li": {
        flex: "1 0 100%",
        transform: "scale(0.8)",
        maxWidth: "640px",
        width: "100%",
        marginLeft: "12px",
        marginRight: "12px",
        "& .video-player": {
          minHeight: "360px",
        },
        "& .content-container": {
          height: "100%",
          display: "grid",
          gridTemplateRows: "75% 25%",
          "& .post-video": {
            minHeight: "254px",
          },
          "@media screen and (max-width: 1864px)": {
            width: "100%",
          },
          "@media screen and (max-width: 1356px)": {
            width: "100%",
          },
          "@media screen and (max-width: 1064px)": {
            width: "100%",
          },
          "@media screen and (max-width: 896px)": {
            width: "100%",
          },
          "@media screen and (max-width: 600px)": {
            transform: "scale(1)",
          },
        },
      },
      "& .carousel li.current-item": {
        transform: "scale(1)",
      },
      "& .carousel li.next-item": {
        transform: "scale(1)",
      },
      "& .carousel li.prev-item": {
        transform: "scale(0.8)",
        "@media screen and (max-width: 600px)": {
          display: "none",
        },
      },
      "& .carousel li .content-container .carousel-item .react-player__preview":
        {
          borderRadius: "12px 12px 0 0 !important",
          minHeight: "360px",
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
    <div className={classes.carouselWrapper}>
      <ul className="carousel">
        {video.length > 2
          ? video.map((_video, index) => {
              return (
                <>
                  {index === video.length - 1 && (
                    <li key={"dup-" + _video.id}>
                      <div className="content-container">
                        <div className="post-video">
                          <ReactPlayer
                            key={_video.id}
                            controls={true}
                            width="100%"
                            height="100%"
                            light={true}
                            className="carousel-item"
                            url={`${_video.attributes.Link}`}
                          />
                        </div>
                        <div className={classes.postContent}>
                          <div className={classes.contentBody}>
                            <h3 className={classes.postTitle}>
                              <Link
                                color="inherit"
                                href={`/video/${_video.id}`}
                                underline="none"
                              >
                                {_video.attributes.Title}
                              </Link>
                            </h3>
                          </div>
                          <div className={classes.contentFooter}>
                            <div className={classes.postWidgets}>
                              <Widget
                                icon={"Visibility"}
                                data={_video.attributes.Views}
                              />
                              <Widget
                                icon={"ThumbUp"}
                                data={_video.attributes.Likes}
                              />
                            </div>
                            <div className={classes.footerDate}>
                              {getTimeAgo(_video.attributes.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </>
              );
            })
          : null}
        {video.length > 0
          ? video.slice(0, 3).map((_video, index) => {
              return (
                <li
                  className={
                    index === 0
                      ? "current-item"
                      : "" || index === 1
                      ? "next-item"
                      : ""
                  }
                  key={_video.id}
                >
                  <div className="content-container">
                    <div className="post-video">
                      <ReactPlayer
                        key={_video.id}
                        controls={true}
                        width="100%"
                        height="100%"
                        light={true}
                        className="carousel-item"
                        url={`${_video.attributes.Link}`}
                      />
                    </div>
                    <div className={classes.postContent}>
                      <div className={classes.contentBody}>
                        <h3 className={classes.postTitle}>
                          <Link
                            color="inherit"
                            href={`/video/${_video.id}`}
                            underline="none"
                          >
                            {_video.attributes.Title}
                          </Link>
                        </h3>
                      </div>
                      <div className={classes.contentFooter}>
                        <div className={classes.postWidgets}>
                          <Widget
                            icon={"Visibility"}
                            data={_video.attributes.Views}
                          />
                          <Widget
                            icon={"ThumbUp"}
                            data={_video.attributes.Likes}
                          />
                        </div>
                        <div className={classes.footerDate}>
                          {getTimeAgo(_video.attributes.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default GridCarousel;
