import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f7f7f7f7",
  },
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    margin: "0 auto",
    position: "relative",
    "& p img": {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  },
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
