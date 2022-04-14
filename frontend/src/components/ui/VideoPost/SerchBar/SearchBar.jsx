import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const useStyles = makeStyles((theme) => ({
    panel: {
      display: "flex",
      justifyContent: "center",
      borderBottom: "1px solid #ccc",
      paddingBottom: theme.spacing(2),
      scrollPadding: theme.spacing(2),
    },
    input: {
      border: "1px solid #ccc",
      padding: "0 8px",
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.panel}>
      <Paper component="div" elevation={0} className={classes.input}>
        <IconButton sx={{ p: "10px" }} aria-label="search" disableRipple>
          <SearchIcon />
        </IconButton>
        <InputBase
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
