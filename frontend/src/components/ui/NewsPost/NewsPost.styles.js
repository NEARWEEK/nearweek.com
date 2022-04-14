import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  pageWrapper: {
    marginLeft: 16,
    marginRight: 16,
  },
  contentContainer: {
    maxWidth: 900,
    minWidth: 200,
    margin: "0 auto",
    position: "relative",
    "& p img": {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  },
  headerBlock: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: "12px",
  },
  postFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px",
    borderTop: "1px solid #c8c6c6",
    borderRadius: "0 0 12px 12px",
  },
  link: {
    /* color: "#fff",*/
  },
  icon: {
    marginRight: "24px",
  },
  breadcrumb: {
    marginTop: "24px",
    marginBottom: "24px",
  },
  img: {
    width: "100%",
    borderRadius: "12px 12px 0 0",
  },
  postContent: {
    backgroundColor: "#d5dddb",
    borderRadius: "0 0 12px 12px",
  },
  postHeader: {
    padding: "8px 24px",
  },
  postTitle: {
    fontSize: 48,
    [theme.breakpoints.down("sm")]: {
      fontSize: 26,
    },
    fontWeight: [900],
    margin: "4px 0",
  },
  postCategory: {
    marginRight: "24px",
    color: " #2013fb",
    fontSize: "14px",
    fontWeight: "bold",
  },
  categoryItem: {
    marginLeft: "6px",
    marginRight: "6px",
  },
  postWidgets: {
    display: "flex",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
  },
  postWidget: {
    paddingRight: "24px",
  },
  footerDate: {
    fontSize: "12px",
    color: "#656364",
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
    fontSize: "14px !important",
  },
  postActions: {
    marginTop: "36px",
    marginBottom: "36px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiButton-root": {
      margin: "0 8px",
      fontWeight: "700 !important",
      borderRadius: "10px !important",
    },
  },
  likeBtn: {
    color: "#0d00ff  !important",
    backgroundColor: "#e1dff5 !important",
  },
  shareBtn: {
    backgroundColor: "#0d00ff !important",
  },
  twitterBtn: {
    backgroundColor: "#1f9bf0 !important",
  },
  telegramBtn: {
    backgroundColor: "#000000 !important",
  },
  discordBtn: {
    backgroundColor: "#36393e !important",
  },
  containerBody: {
    marginBottom: "26px",
    borderBottom: "1px solid #e1dff5",
  },
  postBody: {
    marginBottom: "8px",
  },
  readMoreLink: {
    display: "flex",
    flexDirection: "column",
    color: "#0d00ff",
    fontWeight: "bold",
    marginBottom: "24px",
  },
  blockTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: "24px",
  },
  highlightItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "#fff",
    marginBottom: "12px",
  },
  highlightTitle: {
    fontSize: "20px",
    margin: "0 24px",
    fontWeight: "bold",
    "& a": {
      color: "#0d00ff",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "Article" });
