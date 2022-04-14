import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    margin: "0 auto",
    maxWidth: 1440,
  },
  wrapper: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  topContainer: {
    display: "flex",
    gap: 24,
    width: "100%",
    "@media screen and (max-width: 1080px)": {
      flexDirection: "column",
    },
  },
  blockColumn: {
    flex: 0.5,
    maxWidth: "50%",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "100%",
    },
  },
  latestArticles: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
  blockTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: theme.spacing(3),
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "space-between",
  },
  filterActionContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    gap: "24px",
  },
  sortSelect: {
    "& .MuiSelect-select": {
      padding: theme.spacing(1),
      fontSize: theme.spacing(2),
      fontWeight: "bold",
    },
  },
  filterCategory: {
    flexWrap: "wrap",
    alignItems: "center",
    "& .active": {
      backgroundColor: "rgba(13, 0, 255, 0.04)",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "News" });
