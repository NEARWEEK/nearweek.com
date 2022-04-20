import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import Box from "@mui/material/Box";
import Section from "../components/ui/general/Section/Section";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import { useStyles } from "./Video.styles";
import VideoPanel from "../components/ui/VideoPost/VideoPanel/VideoPanel";

const Video = () => {
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
