import { useState, useEffect } from "react";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search albums by name"
      onChange={props.handleChange}
    />
  );
};

export default SearchBar;
