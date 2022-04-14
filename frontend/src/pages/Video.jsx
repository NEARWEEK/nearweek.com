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
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "./Video.styles";
import SearchBar from "../components/ui/VideoPost/SerchBar/SearchBar";
import VideoPanel from "../components/ui/VideoPost/VideoPanel/VideoPanel";

const Video = () => {
  console.log("video page");
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.wrapper}>
        <VideoPanel />
        <Section title={"Latest Editions"}>
          <EditionsList />
        </Section>
      </Box>
    </>
  );
};

export default Video;
