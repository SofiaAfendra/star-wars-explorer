import { compose } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { Box, Button, Skeleton, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Virtuoso } from "react-virtuoso";
import { withModelProps } from "../../library/withModelProps";
import { withSidebarProps } from "./withSidebarProps";
import {
  fetchSearchResults,
  nextPageSelector,
  setSelectedResult,
  nameListSelector,
  searchResultsCountSelector,
  searchingSelector,
  searchResultsSelector,
  filtersSelector,
} from "../../models/search-results";
import {
  showFavoritesSelector,
  setSelectedFavorite,
  isFavoriteSelector,
  favoriteNameListSelector,
  favoritesCountSelector,
  favoritesSelector,
  addFavorite,
  removeFavorite,
} from "../../models/favorites";
import styles from "./styles";

const Sidebar = ({
  isFavoriteSelector,
  handleLinkClick,
  loadMore,
  handleFavoriteClick,
  getItemName,
  showSkeleton,
  totalCount,
  getNameList,
}) => (
  <Box component="aside" sx={styles.sidebar}>
    {showSkeleton ? (
      Array(10)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} variant="text" sx={styles.skeleton} />
        ))
    ) : (
      <Virtuoso
        style={styles.list}
        totalCount={totalCount}
        itemContent={(index) => (
          <>
            <Button
              type="button"
              sx={styles.listItem}
              onClick={() => handleLinkClick(index)}
            >
              {getNameList(index)}
            </Button>
            <IconButton onClick={() => handleFavoriteClick(index)}>
              {isFavoriteSelector(getItemName(index)) ? (
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
);

Sidebar.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  nameListSelector: PropTypes.array.isRequired,
  searchResultsCountSelector: PropTypes.number.isRequired,
  nextPageSelector: PropTypes.string,
  setSelectedResult: PropTypes.func.isRequired,
  searchingSelector: PropTypes.bool.isRequired,
  addFavorite: PropTypes.func.isRequired,
  searchResultsSelector: PropTypes.array.isRequired,
  isFavoriteSelector: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  showFavoritesSelector: PropTypes.bool,
  favoriteNameListSelector: PropTypes.array.isRequired,
  favoritesCountSelector: PropTypes.number.isRequired,
  favoritesSelector: PropTypes.array,
  setSelectedFavorite: PropTypes.func,
  filtersSelector: PropTypes.object.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
  getItemName: PropTypes.func.isRequired,
  showSkeleton: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  getNameList: PropTypes.func.isRequired,
};

const ComposedSidebar = compose(
  withModelProps({
    searchResultsSelector,
    fetchSearchResults,
    nameListSelector,
    searchResultsCountSelector,
    nextPageSelector,
    setSelectedResult,
    searchingSelector,
    addFavorite,
    isFavoriteSelector,
    removeFavorite,
    showFavoritesSelector,
    favoriteNameListSelector,
    favoritesCountSelector,
    favoritesSelector,
    setSelectedFavorite,
    filtersSelector,
  }),
  withSidebarProps
)(Sidebar);

export default ComposedSidebar;
