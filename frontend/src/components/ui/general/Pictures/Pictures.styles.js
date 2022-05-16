import makeStyles from "@mui/styles/makeStyles";

const styles = () => ({
  hoverPicture: {
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
});

export const useStyles = makeStyles(styles, { name: "Pictures" });
