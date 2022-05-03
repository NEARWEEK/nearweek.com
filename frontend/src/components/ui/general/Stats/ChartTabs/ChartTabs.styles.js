import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  tabHeader: {
    padding: theme.spacing(2),
    borderBottom: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsGroup: {
    display: "flex",
    gap: 8,
    "& .MuiToggleButton-root": {
      fontSize: "0.75rem",
      lineHeight: 1,
    },
    "& .MuiToggleButton-root.Mui-selected": {
      borderColor: "#0d00ff",
      color: "#0d00ff !important",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "ChartTabs" });
