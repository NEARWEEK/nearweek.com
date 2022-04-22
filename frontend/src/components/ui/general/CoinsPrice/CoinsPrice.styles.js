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
    overflowX: "scroll",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      background: "transparent",
      WebkitAppearance: "none",
      width: 0,
      height: 0,
    },
  },
  listItem: {
    color: "#fff",
    padding: "8px",
    borderRadius: "4px",
    margin: "0 4px",
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
