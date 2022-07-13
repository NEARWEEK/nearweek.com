import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Menu,
  MenuItem,
  Slider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment-duration-format";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward30Icon from "@mui/icons-material/Forward30";
import ListItemText from "@mui/material/ListItemText";
import ContentCopy from "@mui/icons-material/ContentCopy";

const AudioControls = ({
  data,
  isPlaying,
  setIsPlaying,
  audioRef,
  onPlayPauseClick,
}) => {
  const intervalRef = useRef();

  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState((audioRef.current.volume * 100) / 2);
  const [volumeSlider, openVolumeSlider] = useState(false);
  const toggleVolumeSlider = (value) => () => {
    openVolumeSlider(value);
  };
  const { duration } = audioRef.current;

  const onEnded = () => {
    setTrackProgress(0);
    setIsPlaying(false);
  };

  audioRef.current.onended = onEnded;

  const handleProgressChange = (value) => {
    console.log(value);
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value > 0 ? value / 100 : 0;
    }
    setVolume(value);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        //toNextTrack(); /*TODO:*/
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const handleTrackProgressForward = () => {
    setTrackProgress(trackProgress + 30);
  };

  function formatDuration(duration) {
    return duration
      ? moment.duration(duration, "seconds").format("mm:ss", { trim: false })
      : "0.00";
  }

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  return (
    <Box sx={{ flex: 1 }}>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Slider
            size="small"
            min={0}
            max={duration ? duration : 0}
            sx={{ flex: 1, mr: 1, ml: 1 }}
            value={trackProgress}
            onChange={(e) => handleProgressChange(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography variant="span" sx={{ fontSize: 11, color: "#333" }}>
            {audioRef.current.currentTime
              ? formatDuration(audioRef.current.currentTime)
              : "00.00"}
            {/*/ {duration ? formatDuration(duration) : "00.00"}*/}
          </Typography>
        </Grid>
        {/*        <Grid
          item
          sx={{ flex: "0 0 auto", position: "relative" }}
          onMouseEnter={toggleVolumeSlider(true)}
          onMouseLeave={toggleVolumeSlider(false)}
        >
          <VolumeUpIcon />
          {volumeSlider && (
            <Paper
              sx={{
                flex: "1 1 auto",
                height: 56,
                top: "-100%",
                zIndex: 10,
                p: "10px 0",
                position: "absolute",
              }}
            >
              <Slider
                orientation="vertical"
                size="small"
                min={0}
                max={100}
                aria-labelledby="volume-control"
                value={volume}
                defaultValue={20}
                onChange={(e) => handleVolumeChange(e.target.value)}
              />
            </Paper>
          )}
        </Grid>*/}
      </Grid>
      <Grid
        container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item>
          <IconButton
            sx={{ p: 0 }}
            onClick={() => handleProgressChange(trackProgress - 10)}
          >
            <Replay10Icon />
          </IconButton>
          <IconButton
            size="large"
            sx={{
              border: "1px solid #333",
              mr: 1,
              ml: 1,
            }}
            variant="outlined"
            aria-label="play/pause"
            onClick={() => onPlayPauseClick(!isPlaying)}
          >
            {!isPlaying ? (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton
            sx={{ p: 0 }}
            onClick={() => handleProgressChange(trackProgress + 30)}
          >
            <Forward30Icon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudioControls;
