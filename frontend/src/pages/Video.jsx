import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../Utils/Utils";
import Navbar from "../components/ui/Navbar/Navbar";
import Box from "@mui/material/Box";
import ReactPlayer from "react-player/youtube";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import Widget from "../components/ui/general/Widget/Widget";
import Section from "../components/ui/general/Section/Section";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";

const Video = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles((theme) => ({
    contentContainer: {
      maxWidth: "1376px",
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
      justifyContent: isMobileMatch ? "flex-end" : "center",
      height: "100%",
      background: isMobileMatch
        ? "linear-gradient(to top, black, transparent 50%, transparent 100%, black 100%)"
        : "linear-gradient(to left, black, transparent 50%, transparent 50%, black 100%)",
      minHeight: isMobileMatch ? "calc(360px - 1px)" : "calc(526px - 1px)",
    },
    videoItem: {
      maxWidth: isMobileMatch ? 600 : 1376,
      margin: "0 auto",
      width: "100%",
    },
    mobileHeaderBlock: {
      background: "#000",
      padding: "16px",
    },
    headerBlockFooter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      marginBottom: isMobileMatch ? 16 : 36,
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
      backgroundColor: "#000",
      top: 73,
      [theme.breakpoints.down("sm")]: {
        top: 56,
      },
      width: "100%",
      height: isMobileMatch ? 320 : 526,
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
  }));

  const [video, setVideo] = useState(null);
  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllVideo();
    if (data) {
      setVideo(data);
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  function getLatestVideo() {
    return video.data.filter((_video) => _video.id !== video.data[0].id);
  }

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
            <Box className={classes.videoItem}>
              <ReactPlayer
                key={video.id}
                controls={true}
                width="100%"
                height={isMobileMatch ? "360px" : "526px"}
                light={true}
                url={`${video.data[0].attributes.Link}`}
              />
            </Box>
          </Box>
          <Box className={classes.pageWrapper}>
            <Box className={classes.contentContainer}>
              <Box className={classes.headerBlock}>
                {!isMobileMatch && (
                  <Box style={{ marginLeft: "16px", marginRight: "16px" }}>
                    <a href={`/video/${video.data[0].id}`}>
                      <h2 className={classes.postTitle}>
                        {" "}
                        {`${video.data[0].attributes.Title}`}
                      </h2>
                    </a>
                    <Box className={classes.headerBlockFooter}>
                      <Box display="inline-flex">
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
                      <Box className={classes.postDate}>
                        <span>
                          {getTimeAgo(video.data[0].attributes.createdAt)}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              {isMobileMatch && (
                <Box className={classes.mobileHeaderBlock}>
                  <a href={`/video/${video.data[0].id}`}>
                    <h2 className={classes.postTitle}>
                      {" "}
                      {`${video.data[0].attributes.Title}`}
                    </h2>
                  </a>
                  <Box className={classes.headerBlockFooter}>
                    <Box display="inline-flex">
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
                    <Box className={classes.postDate}>
                      <span>
                        {getTimeAgo(video.data[0].attributes.createdAt)}
                      </span>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box className={classes.contentWrapper}>
                <Section title={"Latest Video"}>
                  {video.data.length > 0 && (
                    <GridVideo video={getLatestVideo()} />
                  )}
                </Section>
                <Section title={"Latest Editions"}>
                  {editions.data.length > 0 && (
                    <EditionsList editions={editions.data} />
                  )}
                </Section>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Video;
