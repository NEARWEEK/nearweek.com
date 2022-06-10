import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  content: {
    padding: "24px 24px 0",
  },
  image: {
    maxHeight: 419,
    [theme.breakpoints.down("sm")]: {
      maxHeight: 284,
    },
  },
  postCategory: {
    color: "#2013fb",
    fontWeight: "bold",
    fontSize: "14px",
  },
  postTitle: {
    fontSize: "42px",
    [theme.breakpoints.down("md")]: {
      fontSize: "26px",
    },
    fontWeight: "900",
    marginTop: "12px",
    marginBottom: "12px",
    overflow: "hidden",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
  postNumber: {
    color: "#2013fb",
  },
  postBody: {
    fontSize: "18px",
    lineHeight: "24px",
    marginTop: 0,
  },
  postFooter: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "12px 24px",
    borderTop: "1px solid #c8c6c6",
  },
  postWidgets: {
    display: "flex",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
  },
  postWidget: {
    color: "#656364",
    paddingRight: "24px",
  },
  footerDate: {
    fontSize: "12px",
    color: "#656364",
  },
  categoryItem: {
    marginRight: "6px",
    marginLeft: "6px",
  },
});

export const useStyles = makeStyles(styles, { name: "ArticleAnnounce" });
