import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    maxWidth: "860px",
    minWidth: "480px",
    margin: "0 auto",
    position: "relative",
  },
  content: {
    display: "flex",
    gap: theme.spacing(3),
    flexDirection: "row",
  },
  column: {
    width: "50%",
    height: "100%",
  },
  columnTitle: {
    fontWeight: "700 !important",
    marginBottom: "32px !important",
  },
  fileUploader: {
    "& .fileContainer": {
      boxShadow: "none",
      border: "dashed 1px #0000001f",
      "& .chooseFileButton ": {
        backgroundColor: "#0d00ff",
      },
      "& .deleteImage": {
        background: "#36393e",
        fontSize: "14px",
        fontWeight: 900,
        lineHeight: "24px",
        width: "24px",
        height: "24px",
      },
    },
  },
  inputGroup: {
    marginBottom: "24px !important",
    textAlign: "left",
    "& .MuiDivider-root::before": {
      width: "0 !important",
    },
  },
  input: {
    "& .MuiFilledInput-root": {
      borderRadius: 4,
      "& input": {
        paddingTop: 16,
        paddingRight: 36,
        paddingBottom: 14,
        paddingLeft: 14,
      },
    },
  },
});

export const useStyles = makeStyles(styles, { name: "UploadNews" });
