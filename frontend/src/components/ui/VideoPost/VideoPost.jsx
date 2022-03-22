import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import * as Utils from "../../../Utils/Utils";
import Navbar from "../Navbar/Navbar";
import * as React from "react";

const VideoPost = () => {
  const match = useMatch(`/video/:videoId`);
  const [video, setVideo] = useState(null);

  useEffect(async () => {
    const { data, meta } = await Utils.api.getOneVideo(match.params.videoId);
    if (data) {
      setVideo(data);
    }
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default VideoPost;
