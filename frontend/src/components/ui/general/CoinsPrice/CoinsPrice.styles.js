import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    maxWidth: "100vw",
    overflow: "hidden",
    scrollBehavior: "smooth",
    "& li:not(:last-child)": {
      borderRight: "1px solid #e1dff5",
    },
    "&::-webkit-scrollbar": {
      background: "transparent",
      WebkitAppearance: "none",
      width: 0,
      height: 0,
    },
  },
  listItem: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    whiteSpace: "nowrap",
  },
  card: {
    flex: "0 0 auto",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    textTransform: "uppercase",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      border: 0,
      color: "#777",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  },
  blockTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: "24px",
  },
});

export const useStyles = makeStyles(styles, { name: "CoinsPrice" });
