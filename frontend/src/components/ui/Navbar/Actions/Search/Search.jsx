import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import Autosuggest from "react-autosuggest";
import { useState } from "react";
import * as Utils from "../../../../../Utils/Utils";
import { getTimeAgo, groupBy } from "../../../../../Utils/Utils";
import { useStyles } from "./Search.styles";

const Search = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
          width: "100%",
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
