import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 24%)",
    columnGap: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  },
});

export const useStyles = makeStyles(styles, { name: "StatsBlocks" });
