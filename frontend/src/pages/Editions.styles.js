import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  root: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  pageWrapper: {
    margin: "0 auto",
    maxWidth: 892,
  },
  topContainer: {
    marginTop: theme.spacing(4),
  },
  latestEditions: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
  blockTitle: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: theme.spacing(3),
  },
});

export const useStyles = makeStyles(styles, { name: "Editions" });
