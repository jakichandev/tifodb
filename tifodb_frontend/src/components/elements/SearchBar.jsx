import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      document.querySelector("button.icons-search").className = "icons-search";
    }
    document.querySelector("button.icons-search").className =
      "icons-search added-value";
  };

  const clearValue = () => {
    setSearchValue("");
    document.querySelector("button.icons-search").className = "icons-search";
  };

  return (
    <div className="search-wrapper">
      <input
        value={searchValue}
        onChange={(event) => handleSearchValue(event)}
        type="text"
        name="search"
        className="search"
        placeholder={
          navigator.userAgent.includes("Mac")
            ? "Cerca una tifoseria | ⌘ + K"
            : "Cerca una tifoseria | Ctrl + K"
        }
      />
      <div className="submit-wrapper">
        <button className="icons-search" type="submit">
          <IoSearchOutline className="search-icon" />
          <MdClear onClick={clearValue} className="clear-value-icon h" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
// This component is a search bar that allows users to search for a specific tifoseria (fan group) in the database.
