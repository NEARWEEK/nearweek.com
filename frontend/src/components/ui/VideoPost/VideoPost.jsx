import useMediaQuery from "@mui/material/useMediaQuery";
import { getPubDate, getTimeAgo, MOBILE_WIDTH } from "../../../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Utils from "../../../Utils/Utils";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import PostActions from "../general/PostActions/PostActions";
import EditionsList from "../EditionPost/List/EditionsList";
import * as React from "react";
import ReactPlayer from "react-player/youtube";

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
