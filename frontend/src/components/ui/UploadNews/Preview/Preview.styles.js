import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  postContent: {
    marginTop: theme.spacing(1.5),
    minHeight: "25%",
    borderRadius: 12,
    background: "#f7f7f7",
    [theme.breakpoints.down("sm")]: {
      background: "#fff",
    },
    display: "grid",
    gridTemplateRows: " 326px 1fr 41px",
  },
  postImage: {
    borderRadius: "12px 0 0 12px",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px 12px 0 0",
  },
  contentBody: {
    padding: "16px 16px 0 16px",
  },
  postCategory: {
    display: "inline-flex",
    color: "#2013fb",
    fontWeight: "bold",
    fontSize: "14px",
  },
  categoryItem: {
    marginRight: "6px",
    marginLeft: "6px",
  },
  postTitle: {
    fontSize: "20px",
    marginTop: "6px",
    marginBottom: "6px",
    overflow: "hidden",
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
  },
  contentFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
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
});

export const useStyles = makeStyles(styles, { name: "Preview" });
