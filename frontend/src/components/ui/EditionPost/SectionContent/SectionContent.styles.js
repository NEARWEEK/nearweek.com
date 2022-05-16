import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  sectionTitle: {
    fontSize: "42px",
    fontWeight: "900",
    marginBottom: theme.spacing(3),
  },
  highlightItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "#fff",
    marginBottom: theme.spacing(2),
  },
  highlightTitle: {
    margin: "0 24px",
    "& a": {
      color: "#0d00ff",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "SectionContent" });
