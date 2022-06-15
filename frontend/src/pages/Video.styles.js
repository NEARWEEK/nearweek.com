import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    maxWidth: "1376px",
    minWidth: "200px",
    margin: "0 auto",
    position: "relative",
  },
  wrapper: {
    marginLeft: "16px",
    marginRight: "16px",
  },
  videoDescription: {
    marginRight: 16,
    marginLeft: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignSelf: "flex-start",
  },
  videoItem: {
    maxWidth: {
      sm: 600,
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1376, // large screens
    },
    margin: "0 auto",
    width: "100%",
    "& .react-player__shadow": {
      background: "rgba(255, 255, 255, 0.82) !important",
      backdropFilter: "blur(48px)",
      borderRadius: "72px !important",
      width: "72px !important",
      height: "72px !important",
      "& .react-player__play-icon": {
        borderColor: "transparent transparent transparent #0d00ff !important",
      },
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
    marginBottom: {
      sm: 16,
      md: 36, // small laptop
      lg: 36, // desktop
      xl: 36, // large screens
    },
    color: "#fff",
    fontSize: 14,
  },
  link: {
    color: "#fff",
  },
  icon: {
    marginRight: "24px",
  },
  headerContainer: {
    position: "absolute",
    backgroundColor: "#000",
    top: 73,
    [theme.breakpoints.down("sm")]: {
      top: 56,
    },
    width: "100%",
    height: {
      sm: 320,
      md: 526,
      lg: 526,
      xl: 526,
    },
  },
  img: {
    width: "100%",
    height: "320px",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px",
    justifyContent: "space-between",
  },
  filterActionContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px",
    gap: "24px",
  },
  filterCategory: {
    flexWrap: "wrap",
    alignItems: "center",
    "& .active": {
      backgroundColor: "rgba(13, 0, 255, 0.04)",
    },
  },
  postTitle: {
    //    fontSize: useMediaQuery(`(max-width:${MOBILE_WIDTH})`) ? "26px" : "48px",
    fontSize: {
      sm: 26,
      md: 48, // small laptop
      lg: 48, // desktop
      xl: 48, // large screens
    },
    color: "#fff",
    margin: "4px 0",
  },
  postDate: {
    marginRight: 24,
  },
  watchVideo: {
    backgroundColor: "transparent !important",
    color: "transparent !important",
    boxShadow: "none",
  },
  postWidgets: {
    display: "flex",
    alignItems: "center",
  },
  postWidget: {
    paddingRight: "24px",
  },
});

export const useStyles = makeStyles(styles, { name: "Video" });
