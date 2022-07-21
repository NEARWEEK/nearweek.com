import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  header: {
    borderBottom: "1px solid #ccc",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
  columnLeft: {
    display: "flex",
    justifyContent: "flex-start",
  },
  columnRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuIcon: {
    color: "#000000de !important",
  },
});

export const useStyles = makeStyles(styles, { name: "Navbar" });
