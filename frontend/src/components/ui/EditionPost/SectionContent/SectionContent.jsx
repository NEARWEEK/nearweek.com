import Box from "@mui/material/Box";
import * as React from "react";
import ReadMore from "../../general/ReadMore/ReadMore";
import { useStyles } from "./SectionContent.styles";

const SectionContent = ({ title, items }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.sectionTitle}>{title}</Box>
      {items.map((item, index) => (
        <>
          <Box className={classes.highlightItem} key={index}>
            <Box className={classes.highlightTitle}>
              {item && <ReadMore images={item.Images}>{item.Link}</ReadMore>}
            </Box>
          </Box>
        </>
      ))}
    </>
  );
};

export default SectionContent;
