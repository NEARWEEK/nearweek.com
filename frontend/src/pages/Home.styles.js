import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  wrapper: {},
  container: {
    margin: "0 auto",
    maxWidth: 1376,
    paddingRight: "16px",
    paddingLeft: "16px",
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
