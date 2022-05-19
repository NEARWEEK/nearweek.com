import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down("lg")]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
  header: {
    borderBottom: "1px solid #ccc",
  },
  row: {
    display: "flex",
    flex: 1,
  },
  columnLeft: {
    display: "flex",
    justifyContent: "flex-start",
    flex: 0.5,
  },
  columnRight: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 0.5,
  },
  menuIcon: {
    color: "#000000de !important",
  },
});

export const useStyles = makeStyles(styles, { name: "Navbar" });
