import { useState } from "react";
import Box from "@mui/material/Box";
import { useStyles } from "./ReadMore.styles";
import { Collapse } from "react-collapse";
import { addBlankTargets, parseMarkdown } from "../../../../Utils/Utils";
import PostDescription from "../PostDescription/PostDescription";
import Pictures from "../Pictures/Pictures";

const ReadMore = ({ children, images }) => {
  let text = children ? parseMarkdown(children, { dialect: "DERBY" }) : "";
  text = addBlankTargets(text);
  const [isReadMore, setIsReadMore] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [clamped, setClamped] = useState(false);
  const classes = useStyles();
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
  };

  const handleRleState = (rleState) => {
    setClamped(rleState);
  };

  return (
    <Box sx={{ marginBottom: 3 }} className="ck-content">
      {isReadMore ? (
        <>
          <PostDescription
            maxLine={4}
            body={text}
            handleRleState={handleRleState}
          />
        </>
      ) : null}
      <Collapse isOpened={!isReadMore}>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className={classes.content}
        />
        {images ? (
          <>
            {images.length > 0 && (
              <Box
                onClick={toggleShowGallery}
                className={classes.showGalleryLink}
                sx={{ cursor: "pointer" }}
              >
                <> {!showGallery ? "Show gallery" : "Hide gallery"}</>
              </Box>
            )}
            <Collapse isOpened={showGallery}>
              <div className={classes.gallery}>
                <Pictures pictures={images} />
              </div>
            </Collapse>
          </>
        ) : null}
      </Collapse>
      {!children && images && (
        <>
          {images.length > 0 && (
            <Box
              onClick={toggleShowGallery}
              className={classes.showGalleryLink}
              sx={{ cursor: "pointer" }}
            >
              <> {!showGallery ? "Show gallery" : "Hide gallery"}</>
            </Box>
          )}
          <Collapse isOpened={showGallery}>
            <div className={classes.gallery}>
              <Pictures pictures={images} />
            </div>
          </Collapse>
        </>
      )}
      <Box
        onClick={toggleReadMore}
        className={classes.readMoreLink}
        sx={{ cursor: "pointer" }}
      >
        <>{clamped && <> {isReadMore ? "Read more" : "Show less"}</>}</>
      </Box>
    </Box>
  );
};

export default ReadMore;
