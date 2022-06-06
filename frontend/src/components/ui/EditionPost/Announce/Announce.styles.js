import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  content: {
    padding: "24px 24px 0",
  },
  postDate: {
    color: "#2013fb",
    fontWeight: "bold",
    fontSize: "14px",
  },
  postTitle: {
    fontSize: "48px",
    fontWeight: "900",
    marginTop: "12px",
    marginBottom: "12px",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  postNumber: {
    color: "#2013fb",
  },
  postBody: {
    fontSize: "16px",
    lineHeight: "24px",
    marginTop: 0,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
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
});

export const useStyles = makeStyles(styles, { name: "EditionAnnounce" });
