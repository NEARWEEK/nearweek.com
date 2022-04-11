import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { dateRangeFormat, getTimeAgo, MOBILE_WIDTH } from "../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../Utils/Utils";
import Navbar from "../components/ui/Navbar/Navbar";
import Box from "@mui/material/Box";
import ReactPlayer from "react-player/youtube";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import Widget from "../components/ui/general/Widget/Widget";
import Section from "../components/ui/general/Section/Section";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import NewsGrid from "../components/ui/NewsPost/Grid/NewsGrid";

const Video = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles((theme) => ({
    container: {
      maxWidth: "1376px",
      minWidth: "200px",
      margin: "0 auto",
      position: "relative",
    },
    wrapper: {
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
        : "linear-gradient(to left, black, transparent 50%, transparent 65%, black 100%)",
      minHeight: isMobileMatch ? "calc(360px - 1px)" : "calc(526px - 1px)",
    },
    videoDescription: {
      marginRight: 16,
      marginLeft: 16,
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      alignSelf: "flex-start",
    },
    videoItem: {
      maxWidth: isMobileMatch ? 600 : 1376,
      margin: "0 auto",
      width: "100%",
      "& .react-player__shadow": {
        background: "rgba(255, 255, 255, 0.82) !important",
        backdropFilter: "blur(48px)",
        borderRadius: "72px !important",
        width: "72px !important",
        height: "72px !important",
        "& .react-player__play-icon": {
          borderColor: "transparent transparent transparent #0d00ff !important",
        },
      },
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
    filterContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "16px",
      marginBottom: "16px",
      justifyContent: "space-between",
    },
    filterActionContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "16px",
      marginBottom: "16px",
      gap: "24px",
    },
    filterCategory: {
      flexWrap: "wrap",
      alignItems: "center",
      "& .active": {
        backgroundColor: "rgba(13, 0, 255, 0.04)",
      },
    },
    postTitle: {
      fontSize: isMobileMatch ? "26px" : "48px",
      color: "#fff",
      margin: "4px 0",
    },
    postDate: {
      marginRight: 24,
    },
    watchVideo: {
      backgroundColor: "transparent !important",
      color: "transparent !important",
      boxShadow: "none",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      paddingRight: "24px",
    },
  }));

  const [video, setVideo] = useState({ data: [], meta: {} });
  const [tags, setTags] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterResult, setFilterResult] = useState({ data: [] });
  const [filters, setFilters] = useState({
    tags: "all",
  });

  useEffect(async () => {
    const data = await Utils.api.getAllVideo();
    if (data) {
      setVideo(data);
      setFilterResult(data);
    }
  }, []);

  useEffect(async () => {
    const { data } = await Utils.api.getVideoTags();
    if (data) {
      const arr = data.map((item) => item.attributes.TagName);
      setTags(arr);
    }
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let { data } = video;
      let fData = [];
      if (filters.tags !== "all") {
        fData = data.filter((item) => {
          return Boolean(
            item.attributes.Tags.data.find(
              (tag) => tag.attributes.TagName === filters.tags
            )
          );
        });
      } else {
        fData = data;
      }
      setFilterResult({ ...filterResult, data: fData });
    };
    applyFilters();
  }, [filters.tags]);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleFilterTags = (value) => {
    setFilters({ ...filters, tags: value });
  };

  const WatchVideo = (props) => {
    const { onClose, title, open, url, videoId } = props;

    useEffect(() => {
      if (open) {
        Utils.api.getOneVideo(videoId).then();
      }
    }, [open]);

    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog onClose={handleClose} open={open} fullScreen>
        <DialogTitle>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          {title}
        </DialogTitle>
        <DialogContent>
          <ReactPlayer
            controls={true}
            playing={true}
            width="100%"
            height="100%"
            url={`${url}`}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const FilterPanel = () => {
    const isActive = (value) => {
      return filters.tags === value;
    };

    return (
      <>
        {isMobileMatch && (
          <Box className={classes.filterContainer}>
            <Stack
              spacing={1}
              direction="row"
              className={classes.filterCategory}
            >
              <Button
                variant="text"
                className={isActive("all") ? "active" : ""}
                style={{ textTransform: "none" }}
                onClick={() => handleFilterTags("all")}
              >
                All categories
              </Button>
              {tags
                ? tags.map((name, index) => (
                    <Button
                      variant="text"
                      key={index}
                      className={isActive(name) ? "active" : ""}
                      onClick={() => handleFilterTags(name)}
                      style={{ textTransform: "none" }}
                    >
                      {name}
                    </Button>
                  ))
                : null}
            </Stack>
          </Box>
        )}
        {!isMobileMatch && (
          <Box className={classes.filterContainer}>
            <Stack
              spacing={1}
              direction="row"
              className={classes.filterCategory}
            >
              <Button
                variant="text"
                className={isActive("all") ? "active" : ""}
                style={{ textTransform: "none" }}
                onClick={() => handleFilterTags("all")}
              >
                All tags
              </Button>
              {tags
                ? tags.map((name, index) => (
                    <Button
                      variant="text"
                      key={index}
                      className={isActive(name) ? "active" : ""}
                      onClick={() => handleFilterTags(name)}
                      style={{ textTransform: "none" }}
                    >
                      {name}
                    </Button>
                  ))
                : null}
            </Stack>
          </Box>
        )}
      </>
    );
  };

  const FilterResult = ({ filterResult }) => {
    return (
      <Section title={"Latest Video"}>
        <FilterPanel />
        {filterResult.data.length > 0 && (
          <GridVideo filteredVideo={filterResult.data} />
        )}
      </Section>
    );
  };

  const classes = useStyles();
  return (
    <>
      <Navbar />
      {video.data.length > 0 && (
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
          <Box className={classes.container}>
            <Paper
              elevation={0}
              component={Link}
              to={""}
              onClick={handleClickOpen}
            >
              <Box className={classes.headerBlock}>
                {!isMobileMatch && (
                  <Box className={classes.videoDescription}>
                    <Paper
                      className={classes.watchVideo}
                      component={Link}
                      to={""}
                      onClick={handleClickOpen}
                    >
                      <h2 className={classes.postTitle}>
                        {" "}
                        {`${video.data[0].attributes.Title}`}
                      </h2>
                    </Paper>
                    <Box className={classes.headerBlockFooter}>
                      <Box display="inline-flex">
                        <div className={classes.postWidgets}>
                          <Widget
                            icon={"Visibility"}
                            data={video.data[0].attributes.Views}
                          />
                          {/*                          <Widget
                            icon={"ThumbUp"}
                            data={video.data[0].attributes.Likes}
                          />*/}
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
                  <h2 className={classes.postTitle}>
                    {`${video.data[0].attributes.Title}`}
                  </h2>
                  <Box className={classes.headerBlockFooter}>
                    <Box display="inline-flex">
                      <div className={classes.postWidgets}>
                        <Widget
                          icon={"Visibility"}
                          data={video.data[0].attributes.Views}
                        />
                        {/*                        <Widget
                          icon={"ThumbUp"}
                          data={video.data[0].attributes.Likes}
                        />*/}
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
            </Paper>
            <WatchVideo
              open={open}
              onClose={handleClose}
              videoId={video.data[0].id}
              title={video.data[0].attributes.Title}
              url={video.data[0].attributes.Link}
            />
            <Box className={classes.wrapper}>
              {filterResult.data.length > 0 && (
                <FilterResult filterResult={filterResult} />
              )}
              <Section title={"Latest Editions"}>
                <EditionsList />
              </Section>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Video;
