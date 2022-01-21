import * as React from "react";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsIcon from "@mui/icons-material/Directions";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import { useState } from "react";
import * as Utils from "../../../../../Utils/Utils";
import { getTimeAgo, groupBy } from "../../../../../Utils/Utils";

const Search = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const useStyles = makeStyles((theme) => ({
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
        width: "400px",
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
  }));

  const classes = useStyles();

  const onSuggestionsFetchRequested = ({ value }) => {
    Utils.api.search(value).then((res) => {
      const results = res.hits.hits.map((h) => {
        return { type: h._index, data: h._source };
      });
      const grouped = groupBy(results, (item) => item.type);
      setSuggestions(grouped);
    });
  };

  const getSectionSuggestions = (section) => {
    return section.data;
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.data.Title;
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSectionTitle = (section) => {
    return (
      <div className={classes.sectionTitle}>
        <p>
          <strong>{section.type}</strong>
        </p>
      </div>
    );
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div className={classes.result}>
        {suggestion.data.Image?.formats.thumbnail && (
          <div className={classes.resultImage}>
            <a href={`/${suggestion.type}/${suggestion.data.id}`}>
              <div
                style={{
                  backgroundImage: `url('${suggestion.data.Image.formats.thumbnail.url}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                }}
                className={classes.img}
              />{" "}
            </a>
          </div>
        )}
        <div className={classes.resultBody}>
          <a
            className={classes.link}
            href={`/${suggestion.type}/${suggestion.data.id}`}
          >
            <div>{suggestion.data.Title}</div>
            <div className={classes.createdAt}>
              {getTimeAgo(suggestion.data.createdAt)}
            </div>
          </a>
        </div>
      </div>
    );
  };

  return (
    <Box className={classes.container}>
      <Paper
        elevation={0}
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 400,
          background: "#f6f6f6",
        }}
      >
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon fontSize="small" />
        </IconButton>
        <Autosuggest
          multiSection={true}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          getSectionSuggestions={getSectionSuggestions}
          renderSectionTitle={renderSectionTitle}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Search",
            value: value,
            onChange: (_, { newValue, method }) => {
              setValue(newValue);
            },
          }}
          highlightFirstSuggestion={true}
        />
        <IconButton
          onClick={() => setValue("")}
          sx={{ p: "10px" }}
          aria-label="clear"
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Search;
