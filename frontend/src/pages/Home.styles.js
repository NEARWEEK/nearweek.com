import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  wrapper: {},
  container: {
    display: "flex",
    margin: "0 auto",
    flexDirection: "column",
    maxWidth: 1376,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  tabs: {
    display: "flex",
  },
  tabHeader: {
    padding: 16,
    borderBottom: "1px solid #ccc",
    marginBottom: 16,
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
  videoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    width: 1140,
  },
  latestEditions: {
    marginTop: "24px",
    width: "100%",
  },
  blockTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: "24px",
  },
  blockNews: {
    display: "flex",
    gap: "24px",
    "@media screen and (max-width: 1280px)": {
      flexDirection: "column",
    },
  },
  blockColumn: {
    flex: 0.5,
    display: "flex",
    maxWidth: "50%",
    "@media screen and (max-width: 1280px)": {
      maxWidth: "100%",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "Home" });
