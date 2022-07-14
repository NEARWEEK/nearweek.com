import React from "react";
import ReadMore from "../../general/ReadMore/ReadMore";
import { useStyles } from "./SectionContent.styles";
import Box from "@mui/material/Box";

const SectionContent = ({ title, items }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionTitle}>{title}</div>
      {items.map((item, index) => (
        <>
          <div className={classes.highlightItem} key={index}>
            <div className={classes.highlightTitle}>
              {item && (
                <Box sx={{ display: "flex" }}>
                  <ReadMore images={item.Images}>{item.Link}</ReadMore>
                </Box>
              )}
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default SectionContent;
