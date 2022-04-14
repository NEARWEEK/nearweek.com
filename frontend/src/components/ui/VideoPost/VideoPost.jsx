import { useMatch } from "react-router";
import Navbar from "../Navbar/Navbar";
import * as React from "react";

const VideoPost = () => {
  const match = useMatch(`/video/:videoId`);

  return (
    <>
      <Navbar />
    </>
  );
};

export default VideoPost;
