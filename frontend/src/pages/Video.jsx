import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../Utils/Utils";
import Navbar from "../components/ui/Navbar/Navbar";
import Box from "@mui/material/Box";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import Widget from "../components/ui/general/Widget/Widget";

const Video = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles((theme) => ({
    pageWrapper: {},
    contentContainer: {
      maxWidth: " 1376px",
      minWidth: "200px",
      margin: "0 auto",
      position: "relative",
    },
    contentWrapper: {
      marginLeft: "16px",
      marginRight: "16px",
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      background:
        "linear-gradient(to left, black, transparent 50%, transparent 50%, black 100%)",
      minHeight: "calc(526px - 1px)",
      "&::before": {
        content: "''",
        width: "100%",
        top: 0,
        height: "525px",
        position: "absolute",
        background: "#000",
        left: "calc(-100% - -16px)",
      },
      "&::after": {
        content: "''",
        width: "100%",
        top: 0,
        height: "525px",
        position: "absolute",
        background: "#000",
        right: "calc(-100% - -16px)",
      },
    },
    headerBlockFooter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "36px",
      color: "#fff",
      fontSize: "14px",
    },
    link: {
      color: "#fff",
    },
    icon: {
      marginRight: "24px",
    },
    headerContainer: {
      position: "absolute",
      top: 73,
      [theme.breakpoints.down("sm")]: {
        top: 56,
      },
      width: "100%",
      height: "526px",
    },
    img: {
      width: "100%",
      height: "320px",
    },
    postTitle: {
      fontSize: isMobileMatch ? "26px" : "48px",
      color: "#fff",
      margin: "4px 0",
    },
    postDate: {
      marginRight: 24,
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      paddingRight: "24px",
    },
    containerBody: {
      marginBottom: "26px",
      borderBottom: "1px solid #e1dff5",
    },
    postBody: {
      marginBottom: "8px",
    },
    readMoreLink: {
      display: "flex",
      flexDirection: "column",
      color: "#0d00ff",
      fontWeight: "bold",
      marginBottom: "24px",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
  }));

  const [video, setVideo] = useState(null);

  useEffect(async () => {
    const data = await Utils.api.getAllVideo();
    if (data) {
      setVideo(data);
    }
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      {video && (
        <>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.headerContainer}
          >
            <ReactPlayer
              key={video.id}
              controls={true}
              width="100%"
              height="526px"
              light={true}
              className="video-item"
              url={`${video.data[0].attributes.Link}`}
            />
          </Box>
          <Box className={classes.pageWrapper}>
            <Box className={classes.contentContainer}>
              <Box className={classes.contentWrapper}>
                <Box className={classes.headerBlock}>
                  <Box>
                    <a href={`/video/${video.data[0].id}`}>
                      <h2 className={classes.postTitle}>
                        {" "}
                        {`${video.data[0].attributes.Title}`}
                      </h2>
                    </a>
                    <Box className={classes.headerBlockFooter}>
                      <Box display="inline-flex">
                        <Box className={classes.postDate}>
                          <span>
                            {getTimeAgo(video.data[0].attributes.createdAt)}
                          </span>
                        </Box>
                        <div className={classes.postWidgets}>
                          <Widget
                            icon={"Visibility"}
                            data={video.data[0].attributes.Views}
                          />
                          <Widget
                            icon={"ThumbUp"}
                            data={video.data[0].attributes.Likes}
                          />
                          <Widget icon={"ChatBubble"} data={"0"} />
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box className={classes.blockTitle}>{"Latest Video"}</Box>
                </Box>
                <Box>
                  {video.data.length > 0 && <GridVideo video={video.data} />}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Video;
