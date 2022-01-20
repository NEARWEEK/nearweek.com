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
import DirectionsIcon from "@mui/icons-material/Directions";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import { useState } from "react";
import * as Utils from "../../../../../Utils/Utils";
import { groupBy } from "../../../../../Utils/Utils";

const Search = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  console.log("suggestions", suggestions);

  const useStyles = makeStyles((theme) => ({
    container: {
      marginLeft: "auto",
      "& .react-autosuggest__container ": {
        position: "relative",
      },
      "& .react-autosuggest__input": {
        width: " 240px",
        height: " 30px",
        padding: "10px 20px",
        fontFamily: "Helvetica, sans-serif",
        fontWeight: 300,
        fontSize: "16px",
        border: "1px solid #aaa",
        borderRadius: "4px",
      },
      "& .react-autosuggest__input--focused": {
        outline: "none",
      },
      "& .react-autosuggest__input--open": {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      "& .react-autosuggest__suggestions-container": {
        display: "none",
      },
      "& .react-autosuggest__suggestions-container--open ": {
        display: "block",
        position: "absolute",
        top: "51px",
        width: "280px",
        border: "1px solid #aaa",
        backgroundColor: " #fff",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        zIndex: 2,
      },
      "& .react-autosuggest__suggestions-list": {
        margin: 0,
        padding: 0,
        listStyleType: " none",
      },
      "& .react-autosuggest__suggestion ": {
        cursor: "pointer",
        padding: "10px 20px",
      },
      "& .react-autosuggest__suggestion--highlighted": {
        backgroundColor: "#ddd",
      },
    },
    img: {
      width: "48px",
      height: "48px",
    },
    result: {
      display: "flex",
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
    return <strong>{section.type}</strong>;
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div className={classes.result}>
        {suggestion.data.Image.formats.thumbnail && (
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
        )}
        <div>{suggestion.data.Title}</div>
        {/* <div className="shortCode">{suggestion.Body}</div>*/}
      </div>
    );
  };

  return (
    <Box className={classes.container}>
      <Paper
        elevation={0}
        component="div"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          background: "#f6f6f6",
        }}
      >
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
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
      </Paper>
    </Box>
  );
};

export default Search;
