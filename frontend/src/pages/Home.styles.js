import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  grid: {
    display: "flex",
    gap: "24px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  column: {
    flex: 0.5,
    display: "flex",
    maxWidth: "50%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "Home" });
