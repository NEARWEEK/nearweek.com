import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  latestPost: {
    marginBottom: "36px",
    width: "100%",
    background: "#dbd9d7",
    borderRadius: "12px",
    display: "grid",
    gridTemplateRows: "419px repeat(auto-fill, 253px) 41px",
  },
  content: {
    padding: "24px 24px 0",
  },
  image: {
    borderRadius: "12px 12px 0 0",
    width: "100%",
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
    justifyContent: "space-between",
    padding: "12px 24px",
    borderTop: "1px solid #c8c6c6",
    borderRadius: "0 0 12px 12px",
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
