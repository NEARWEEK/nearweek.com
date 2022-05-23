import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
  pageFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid #ccc",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    "& .MuiButton-root": {
      padding: "8px 32px",
    },
  },
  container: {
    flex: 1,
    widths: "100%",
    maxWidth: "860px",
    minWidth: "480px",
  },
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
  },
  content: {
    display: "grid",
    gridGap: theme.spacing(2),
    gridTemplateColumns: "50% 50%",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
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
  textarea: {
    backgroundColor: "#f0f0f0",
    border: 0,
    borderRadius: 4,
    padding: theme.spacing(2),
    width: "100%",
    maxWidth: "100%",
  },
});

export const useStyles = makeStyles(styles, { name: "UploadNews" });
