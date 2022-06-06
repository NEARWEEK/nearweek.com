import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
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
