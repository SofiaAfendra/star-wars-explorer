import { useState, useCallback } from "react";
import PropTypes from "prop-types";

export const withHeaderProps = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const { fetchSearchResults, clearSearchResults, setFilters } = props;

    const [option, setOption] = useState("people");
    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
      setOption(event.target.value);
    };

    const handleSearch = (event) => {
      const newSearchText = event.target.value.trim();
      setSearchText(newSearchText);
    };

    const handleClick = useCallback(() => {
      clearSearchResults();
      fetchSearchResults({ option, searchText, page: "1" });
      setFilters({ option, searchText });
    }, [
      clearSearchResults,
      fetchSearchResults,
      setFilters,
      option,
      searchText,
    ]);

    return (
      <WrappedComponent
        {...props}
        option={option}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
    );
  };

  EnhancedComponent.propTypes = {
    fetchSearchResults: PropTypes.func.isRequired,
    clearSearchResults: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
  };

  return EnhancedComponent;
};
