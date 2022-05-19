import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import * as React from "react";

const styles = (theme) => ({
  pageWrapper: {
    backgroundColor: "#f7f7f7",
  },
  contentContainer: {
    maxWidth: " 900px",
    minWidth: "200px",
    margin: "0 auto",
    position: "relative",
    "& p img": {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  },
  contentWrapper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  headerBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    minHeight: "calc(302px - 6px)",
  },
  headerBlockFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "36px",
    color: "#fff",
    fontSize: "14px",
  },
  link: {
    color: "#fff",
  },
  icon: {
    marginRight: "24px",
  },
  breadcrumb: {
    color: "#ffffff99",
    marginTop: 32,
    [theme.breakpoints.down("sm")]: {
      marginTop: 16,
    },
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 73,
    [theme.breakpoints.down("sm")]: {
      top: 56,
    },
    width: "100%",
    height: "302px",
    "&::before": {
      content: "''",
      display: "block",
      background: "#222222b3",
      position: "absolute",
      width: "100%",
      height: "100%",
    },
  },
  img: {
    width: "100%",
    height: "320px",
  },
  postTitle: {
    fontSize: 26,
    [theme.breakpoints.up("sm")]: {
      fontSize: 48,
    },
    color: "#fff",
    margin: "4px 0",
  },
  postBody: {
    "& > div": {
      borderBottom: "1px solid #e1dff5",
    },
  },
  postDate: {
    marginRight: 24,
  },
  postWidgets: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  actionButton: {
    padding: "12px !important",
    backgroundColor: " #cccccc85 !important",
    borderRadius: "8px !important",
    margin: "0 6px !important",
    fontSize: "12px !important",
    fontWeight: "600 !important",
    letterSpacing: "1.25px !important",
  },
  actionIcon: {
    color: "#fff",
    fontSize: "14px !important",
  },
  blockTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: theme.spacing(3),
  },
});

export const useStyles = makeStyles(styles, { name: "Edition" });
