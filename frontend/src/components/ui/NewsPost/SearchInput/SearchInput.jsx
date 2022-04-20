import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const [value, setValue] = useState("");

  const useStyles = makeStyles((theme) => ({
    panel: {
      display: "flex",
      justifyContent: "center",
      borderBottom: "1px solid #ccc",
      paddingBottom: theme.spacing(2),
      scrollPadding: theme.spacing(2),
    },
  }));

  useEffect(() => {
    if (searchTerm) {
      setValue(searchTerm);
    }
  }, [searchTerm]);

  const classes = useStyles();

  return (
    <>
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />
      <IconButton
        onClick={() => setSearchTerm(value)}
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchInput;
