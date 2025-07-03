import { useEffect, useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import "./Elements.css"; // Assuming you have a CSS file for styling

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const iconClearValueRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
    if (searchValue === undefined || searchValue === "") {
      iconClearValueRef.current.style.display = "none";
    }
    iconClearValueRef.current.style.display = "block";
    console.log("Search value:", searchValue);
  };

  const clearValue = () => {
    setSearchValue("");
    iconClearValueRef.current.style.display = "none";
    searchInputRef.current.focus();
  };

  useEffect(() => {
    if (searchValue === undefined || searchValue === "") {
      iconClearValueRef.current.style.display = "none";
    } else {
      iconClearValueRef.current.style.display = "block";
    }
  }, [searchValue]);

  return (
    <div className="search-wrapper">
      <input
        ref={searchInputRef}
        value={searchValue}
        onChange={(event) => handleSearchValue(event)}
        type="text"
        name="search"
        className="search"
        placeholder={
          navigator.userAgent.includes("Mac")
            ? "Cerca una tifoseria | ⌘+K"
            : "Cerca una tifoseria | Ctrl + K"
        }
      />
      <div className="submit-wrapper">
        <IoSearchOutline className="search-icon" />
        <MdClear
          ref={iconClearValueRef}
          onClick={clearValue}
          className="clear-value-icon"
        />
      </div>
    </div>
  );
};

export default SearchBar;
// This component is a search bar that allows users to search for a specific tifoseria (fan group) in the database.
