import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  headerContainer: {
    position: "absolute",
    backgroundColor: "#000",
    top: 73,
    [theme.breakpoints.down("sm")]: {
      top: 56,
    },
    width: "100%",
    height: 526,
    [theme.breakpoints.down("sm")]: {
      height: 320,
    },
  },
  eventItem: {
    maxWidth: 1376,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 600,
    },
    margin: "0 auto",
    width: "100%",
  },
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    maxWidth: "1376px",
    minWidth: "200px",
    margin: "0 auto",
    position: "relative",
  },
  headerBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background:
      "linear-gradient(to left, black, transparent 50%, transparent 65%, black 100%)",
    height: "100%",
    minHeight: "calc(526px - 1px)",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-end",
      background:
        "linear-gradient(to top, black, transparent 50%, transparent 100%, black 100%)",
      minHeight: "calc(360px - 1px)",
    },
  },
  mobileHeaderBlock: {
    background: "#000",
    padding: "16px",
  },
  headerBlockFooter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
    color: "#fff",
    fontSize: "14px",
  },
  description: {
    marginRight: 16,
    marginLeft: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignSelf: "flex-start",
  },
  postTitle: {
    fontSize: 48,
    [theme.breakpoints.down("sm")]: {
      fontSize: 26,
    },
    color: "#fff",
    margin: "4px 0",
  },
  postDate: {
    marginRight: 24,
  },
  postWidgets: {
    display: "flex",
    alignItems: "center",
  },
  postWidget: {
    paddingRight: "24px",
  },
  containerBody: {
    borderBottom: "1px solid #ccc",
    marginBottom: 24,
  },
});

export const useStyles = makeStyles(styles, { name: "Event" });
