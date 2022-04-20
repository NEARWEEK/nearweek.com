import makeStyles from "@mui/styles/makeStyles";

const styles = (theme) => ({
  container: {
    marginLeft: "auto",
    "& .react-autosuggest__container ": {
      position: "relative",
      width: "100%",
    },
    "& .react-autosuggest__input": {
      width: "100%",
      height: "100%",
      padding: "10px 20px",
      background: "transparent",
      fontWeight: 300,
      fontSize: "16px",
      border: 0,
    },
    "& .react-autosuggest__input--focused": {
      outline: "none",
    },
    "& .react-autosuggest__input--open": {
      /* borderBottomLeftRadius: 0,*/
      /*borderBottomRightRadius: 0,*/
    },
    "& .react-autosuggest__suggestions-container": {
      display: "none",
    },
    "& .react-autosuggest__suggestions-container--open ": {
      display: "block",
      position: "absolute",
      top: "52px",
      right: "-6px",
      maxWidth: "400px",
      width: "100%",
      boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
      padding: "0 16px",
      backgroundColor: " #fff",
      borderRadius: "8px",
      zIndex: 2,
    },
    "& .react-autosuggest__suggestions-list": {
      margin: 0,
      padding: 0,
      listStyleType: " none",
    },
    "& .react-autosuggest__suggestion": {
      cursor: "pointer",
      padding: "10px 0px",
    },
    "& .react-autosuggest__suggestion--highlighted": {
      /*backgroundColor: "#ddd",*/
    },
  },
  img: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
  },
  sectionTitle: {
    "& p:first-letter": {
      textTransform: "capitalize",
    },
  },
  result: {
    display: "flex",
  },
  resultImage: {
    marginRight: "24px",
  },
  resultBody: {
    width: "100%",
    borderBottom: "1px solid #e0e4fb99",
  },
  link: {
    textDecoration: "none",
  },
  createdAt: {
    fontSize: "14px",
    color: "#555",
  },
});

export const useStyles = makeStyles(styles, { name: "Search" });
