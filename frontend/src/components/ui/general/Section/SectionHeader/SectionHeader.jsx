import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";

const SectionHeader = ({ title, link }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles(() => ({
    blockHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    blockTitle: {
      fontSize: !isMobileMatch ? "48px" : "28px",
      fontWeight: "900",
    },
    blockLink: {
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: " bold",
      "& a": {
        textDecoration: "none",
        color: "blue",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.blockHeader}>
      <h2 className={classes.blockTitle}>{title}</h2>
      {!isMobileMatch && (
        <div className={classes.blockLink}>
          <a href={link}>SHOW MORE</a>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
