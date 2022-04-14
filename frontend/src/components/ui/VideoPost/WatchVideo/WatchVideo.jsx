import React, { useEffect } from "react";
import * as Utils from "../../../../Utils/Utils";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import ReactPlayer from "react-player/youtube";

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

export default WatchVideo;
