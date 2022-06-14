import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  tabs: {
    borderBottom: "1px solid #ccc",
  },
  tab: {
    fontWeight: "700 !important",
  },
  headerBlock: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  menuIcon: {
    color: "#000000de !important",
  },
});

export const useStyles = makeStyles(styles, { name: "UserNews" });
