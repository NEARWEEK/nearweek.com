import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    flex: 1,
    padding: "0 24px",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  menuItem: {
    color: "inherit",
    textTransform: "uppercase",
    "& a": {
      color: "rgba(0, 0, 0, 0.6)",
      textDecoration: "none",
    },
    "& a.active": {
      color: "#0d00ff",
    },
  },
  menuLink: {
    color: "#555",
    textDecoration: "none",
  },
});

export const useStyles = makeStyles(styles, { name: "Menu" });
