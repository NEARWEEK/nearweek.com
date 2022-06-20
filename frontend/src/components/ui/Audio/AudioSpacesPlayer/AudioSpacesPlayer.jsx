import Card from "@mui/material/Card";
import LazyLoad from "react-lazyload";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Categories from "../Categories/Categories";
import CardActions from "@mui/material/CardActions";
import { useEffect, useRef, useState } from "react";
import AudioControls from "./AudioControls/AudioControls";

function useNoRenderRef(currentValue) {
  const ref = useRef(currentValue);
  ref.current = currentValue;
  return ref;
}

const AudioSpacesPlayer = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useNoRenderRef(item.audioSrc);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
    };
  }, []);

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
          <LazyLoad height={205} once>
            <CardMedia
              component="img"
              image={item.imageSrc}
              sx={{ height: 205 }}
            />
          </LazyLoad>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <CardContent sx={{ flex: "1 0 auto", pb: 0 }}>
              <Typography component="div" variant="h5">
                {item.attributes.Title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                [{item.attributes.Description || "-"}]
              </Typography>
              <Categories data={item.attributes.categories.data} />
            </CardContent>
            <CardActions sx={{ mt: "auto" }}>
              <AudioControls
                isPlaying={isPlaying}
                audioRef={audioRef}
                onPlayPauseClick={setIsPlaying}
              />
            </CardActions>
          </Box>
        </Card>
      )}
    </>
  );
};

export default AudioSpacesPlayer;
