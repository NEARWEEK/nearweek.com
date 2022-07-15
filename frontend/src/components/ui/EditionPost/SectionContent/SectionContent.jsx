import ReadMore from "../../general/ReadMore/ReadMore";
import { useStyles } from "./SectionContent.styles";
import Box from "@mui/material/Box";
import { isHTML, parseMarkdown } from "../../../../Utils/Utils";
import { Collapse } from "react-collapse";
import Pictures from "../../general/Pictures/Pictures";
import React, { useState } from "react";
import { Button } from "@mui/material";

const SectionContent = ({ title, items }) => {
  const [moreLength, setMoreLength] = useState(5);
  const classes = useStyles();

  const showMoreHandler = () => {
    if (moreLength < items.length) {
      const nextLength =
        items.length - moreLength < 5 ? items.length - moreLength : 5;
      setMoreLength(moreLength + nextLength);
    }
  };

  const LinkContent = ({ item, images }) => {
    const [showGallery, setShowGallery] = useState(false);
    const toggleShowGallery = () => {
      setShowGallery(!showGallery);
    };

    if (item.Link && !isHTML(item.Link)) {
      item.Link = parseMarkdown(item.Link);
    }

    return (
      <>
        {item.Link && <Box dangerouslySetInnerHTML={{ __html: item.Link }} />}
        {images ? (
          <>
            {images.length > 0 && (
              <Box
                onClick={toggleShowGallery}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  textTransform: "uppercase",
                  color: "#0d00ff",
                  backgroundColor: "#f7f7f7",
                  padding: 1.5,
                  fontWeight: "bold",
                  marginTop: 3,
                  marginBottom: 3,
                  cursor: "pointer",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {!showGallery ? "Show gallery" : "Hide gallery"}
                </Box>
              </Box>
            )}
            <Collapse isOpened={showGallery}>
              <Box
                sx={{
                  display: "grid",
                  gridGap: 2,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                <Pictures pictures={images} />
              </Box>
            </Collapse>
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className={classes.sectionTitle}>{title}</div>
      {items.slice(0, moreLength).map((item, index) => (
        <>
          <div className={classes.highlightItem} key={index}>
            <div className={classes.highlightTitle}>
              {item && (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/*<ReadMore images={item.Images}>{item.Link}</ReadMore>*/}
                  <LinkContent item={item} images={item.Images} />
                </Box>
              )}
            </div>
          </div>
        </>
      ))}
      {items.length > moreLength && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            marginBottom: "24px",
            fontWeight: "bold",
            "& button": {
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "20px",
            },
          }}
        >
          <Box component="span" sx={{ margin: "18px 0" }}>
            <Button onClick={showMoreHandler}>Show more</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SectionContent;
