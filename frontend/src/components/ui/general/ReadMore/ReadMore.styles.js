import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid #e1dff5",
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  readMoreLink: {
    display: "flex",
    flexDirection: "column",
    color: "#0d00ff",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
});

export const useStyles = makeStyles(styles, { name: "ReadMore" });
