import { useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Button, Skeleton, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Virtuoso } from "react-virtuoso";
import { Header, Main } from "./components";
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
  filtersSelector,
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
  setSelectedResult,
  searchingSelector,
  addFavorite,
  searchResultsSelector,
  isFavoriteSelector,
  removeFavorite,
  showFavoritesSelector,
  favoriteNameListSelector,
  favoritesCountSelector,
  favoritesSelector,
  setSelectedFavorite,
  filtersSelector: { option, searchText },
}) {
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
      <Header />
      <Main />
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
      <Box component="footer" sx={styles.footer} />
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
  filtersSelector: PropTypes.object.isRequired,
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
  filtersSelector,
})(App);

export default AppWithModelProps;
