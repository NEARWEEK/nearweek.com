import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    margin: "0 auto",
    maxWidth: 1440,
  },
  wrapper: {
    marginRight: 16,
    marginLeft: 16,
  },
  topContainer: {
    display: "flex",
    margin: {
      xxs: 0,
      xs: 0,
      sm: 0,
      md: 16,
      lg: 16,
      xl: 16,
    },
    gap: 24,
    "@media screen and (max-width: 1080px)": {
      flexDirection: "column",
    },
  },
  blockColumn: {
    flex: 0.5,
  },
  latestEvents: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
  blockTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: "24px",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px",
    justifyContent: "space-between",
  },
  filterActionContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px",
    gap: "24px",
  },
  sortSelect: {
    "& .MuiSelect-select": {
      padding: "8px",
      fontSize: "16px",
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

export const useStyles = makeStyles(styles, { name: "Events" });
