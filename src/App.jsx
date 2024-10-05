import { useState, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Skeleton,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Virtuoso } from "react-virtuoso";
import PropTypes from "prop-types";
import {
  fetchSearchResults,
  nameListSelector,
  searchResultsCountSelector,
  nextPageSelector,
  clearSearchResults,
  setSelectedResult,
  selectedResultSelector,
  searchingSelector,
  searchResultsSelector,
} from "./models/search-results";
import { withModelProps } from "./library/withModelProps";
import styles from "./styles";
import {
  isFavoriteSelector,
  setShowFavorites,
  showFavoritesSelector,
  favoriteNameListSelector,
  favoritesCountSelector,
  favoritesSelector,
  addFavorite,
  removeFavorite,
  setSelectedFavorite,
  selectedFavoriteSelector,
} from "./models/favorites";

function App({
  fetchSearchResults,
  nameListSelector,
  searchResultsCountSelector,
  nextPageSelector,
  clearSearchResults,
  setSelectedResult,
  selectedResultSelector,
  searchingSelector,
  addFavorite,
  searchResultsSelector,
  isFavoriteSelector,
  removeFavorite,
  setShowFavorites,
  showFavoritesSelector,
  favoriteNameListSelector,
  favoritesCountSelector,
  favoritesSelector,
  setSelectedFavorite,
  selectedFavoriteSelector,
}) {
  const [option, setOption] = useState("people");
  const [searchText, setSearchText] = useState("");
  const prevOptionRef = useRef();
  const prevSearchTextRef = useRef();

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleSearch = (event) => {
    const newSearchText = event.target.value.trim();
    setSearchText(newSearchText);
  };

  const handleClick = () => {
    clearSearchResults();
    fetchSearchResults({ option, searchText, page: "1" });
    prevOptionRef.current = option;
    prevSearchTextRef.current = searchText;
  };

  const loadMore = useCallback(() => {
    if (nextPageSelector) {
      fetchSearchResults({ option, searchText, page: nextPageSelector });
    }
  }, [fetchSearchResults, nextPageSelector, option, searchText]);

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    showFavoritesSelector
      ? setSelectedFavorite(index)
      : setSelectedResult(index);
  };

  return (
    <Box component="section" sx={styles.root}>
      <Box component="header" sx={styles.header}>
        <Typography variant="h1" align="center" sx={styles.heading}>
          Star Wars Explorer
        </Typography>
        <Box component="nav" sx={styles.nav}>
          <Select
            sx={{ minWidth: "120px" }}
            value={option}
            onChange={handleChange}
          >
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="films">Films</MenuItem>
            <MenuItem value="starships">Starships</MenuItem>
            <MenuItem value="vehicles">Vehicles</MenuItem>
            <MenuItem value="species">Species</MenuItem>
            <MenuItem value="planets">Planets</MenuItem>
          </Select>
          <TextField
            slotProps={{
              input: {
                endAdornment: <SearchIcon />,
              },
            }}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={
              option === prevOptionRef.current &&
              searchText === prevSearchTextRef.current
            }
          >
            Search
          </Button>
          <FormControlLabel
            control={<Switch checked={showFavoritesSelector} />}
            label="Show Favorites"
            onChange={() => setShowFavorites()}
          />
        </Box>
      </Box>
      <Box component="main" sx={styles.main}>
        {showFavoritesSelector ? (
          selectedFavoriteSelector ? (
            Object.entries(selectedFavoriteSelector).map(([key, value]) => (
              <Typography key={key}>
                {key}: {value}
              </Typography>
            ))
          ) : (
            <Typography>May the force be with you!</Typography>
          )
        ) : selectedResultSelector ? (
          Object.entries(selectedResultSelector).map(([key, value]) => (
            <Typography key={key}>
              {key}: {value}
            </Typography>
          ))
        ) : (
          <Typography>May the force be with you!</Typography>
        )}
      </Box>
      <Box component="aside" sx={styles.sidebar}>
        {searchingSelector && nameListSelector.length === 0 ? (
          Array(10)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} variant="text" sx={{ fontSize: "1rem" }} />
            ))
        ) : (
          <Virtuoso
            style={{ height: "100%", width: "100%" }}
            totalCount={
              showFavoritesSelector
                ? favoritesCountSelector
                : searchResultsCountSelector
            }
            itemContent={(index) => (
              <>
                <Button
                  sx={styles.listItem}
                  onClick={(e) => handleLinkClick(e, index)}
                >
                  {showFavoritesSelector
                    ? favoriteNameListSelector[index]
                    : nameListSelector[index]}
                </Button>

                <IconButton
                  onClick={() =>
                    isFavoriteSelector(
                      showFavoritesSelector
                        ? favoritesSelector[index].name
                        : searchResultsSelector[index].name
                    )
                      ? removeFavorite(
                          showFavoritesSelector
                            ? favoritesSelector[index]
                            : searchResultsSelector[index]
                        )
                      : addFavorite(
                          showFavoritesSelector
                            ? favoritesSelector[index]
                            : searchResultsSelector[index]
                        )
                  }
                >
                  {isFavoriteSelector(
                    showFavoritesSelector
                      ? favoritesSelector[index]?.name
                      : searchResultsSelector[index].name
                  ) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </>
            )}
            endReached={loadMore}
          />
        )}
      </Box>
      <Box component="footer" sx={styles.footer}>
        This is the footer
      </Box>
    </Box>
  );
}

App.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  nameListSelector: PropTypes.array.isRequired,
  searchResultsCountSelector: PropTypes.number.isRequired,
  nextPageSelector: PropTypes.string,
  clearSearchResults: PropTypes.func.isRequired,
  setSelectedResult: PropTypes.func.isRequired,
  selectedResultSelector: PropTypes.object,
  searchingSelector: PropTypes.bool.isRequired,
  addFavorite: PropTypes.func.isRequired,
  searchResultsSelector: PropTypes.array.isRequired,
  isFavoriteSelector: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  setShowFavorites: PropTypes.func.isRequired,
  showFavoritesSelector: PropTypes.bool,
  favoriteNameListSelector: PropTypes.array.isRequired,
  favoritesCountSelector: PropTypes.number.isRequired,
  favoritesSelector: PropTypes.array,
  setSelectedFavorite: PropTypes.func,
  selectedFavoriteSelector: PropTypes.object,
};

const AppWithModelProps = withModelProps({
  searchResultsSelector,
  fetchSearchResults,
  nameListSelector,
  searchResultsCountSelector,
  nextPageSelector,
  clearSearchResults,
  setSelectedResult,
  selectedResultSelector,
  searchingSelector,
  addFavorite,
  isFavoriteSelector,
  removeFavorite,
  setShowFavorites,
  showFavoritesSelector,
  favoriteNameListSelector,
  favoritesCountSelector,
  favoritesSelector,
  setSelectedFavorite,
  selectedFavoriteSelector,
})(App);

export default AppWithModelProps;
