import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (event) => {
    setSearchTerm(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  return (
    <TextField
      id="standard-basic"
      placeholder="Search albums by name"
      onChange={props.handleChange}
    />
  );
};

export default SearchBar;
