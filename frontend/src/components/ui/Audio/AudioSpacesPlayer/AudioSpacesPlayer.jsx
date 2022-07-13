import LazyLoad from "react-lazyload";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";
import Categories from "../Categories/Categories";
import { useEffect, useRef, useState } from "react";
import AudioControls from "./AudioControls/AudioControls";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ListItemText from "@mui/material/ListItemText";

function useNoRenderRef(currentValue) {
  const ref = useRef(currentValue);
  ref.current = currentValue;
  return ref;
}

const AudioSpacesPlayer = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useNoRenderRef(item.audioSrc);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const PlayerMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <IconButton size="small" id="menu-button" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "menu-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy link</ListItemText>
          </MenuItem>
          <Divider />
          {item.attributes.ext_links.map((menuItem) => (
            <MenuItem
              component="a"
              key={menuItem.Name}
              href={menuItem.link_to}
              target="_blank"
            >
              Listen on {menuItem.Name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  return (
    <>
      {item && (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            borderRadius: "12px",
            backgroundColor: "#f7f7f7",
            border: "1px solid #f7f7f7",
          }}
          elevation={0}
        >
          <CardHeader
            sx={{ p: 1, color: "#555" }}
            title={
              <Typography
                variant="span"
                sx={{ fontSize: 12, fontWeight: "bold", wordBreak: "keep-all" }}
              >
                {item.attributes.Title}
              </Typography>
            }
            action={<PlayerMenu />}
          />
          <LazyLoad height={160} once>
            <Box sx={{ pl: 2, pr: 2 }}>
              <CardMedia
                component="img"
                image={item.imageSrc}
                sx={{ height: 160, borderRadius: 2 }}
              />
            </Box>
          </LazyLoad>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <CardContent sx={{ flex: "1 0 auto", pb: 0, pt: 0 }}>
              {/*              <Typography component="div" variant="h5">
                {item.attributes.Title}
              </Typography>*/}
              <Typography
                sx={{
                  p: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
                component="div"
                className="ck-content"
                color="text.secondary"
                dangerouslySetInnerHTML={{
                  __html: item.attributes.Description,
                }}
              />
              <Categories data={item.attributes.categories.data} />
            </CardContent>
            <CardActions sx={{ mt: "auto", pt: 0, pb: 0 }}>
              {item.audioSrc && (
                <AudioControls
                  data={item}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  audioRef={audioRef}
                  onPlayPauseClick={setIsPlaying}
                />
              )}
            </CardActions>
          </Box>
        </Card>
      )}
    </>
  );
};

export default AudioSpacesPlayer;
