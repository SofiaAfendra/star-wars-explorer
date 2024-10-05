import { compose } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { Box, Typography, Skeleton, IconButton } from "@mui/material";
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
  selectedResultIndexSelector,
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
  selectedFavoriteIndexSelector,
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
  isSelected,
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
          <Box
            onClick={() => handleLinkClick(index)}
            component="section"
            sx={[styles.listItem, isSelected(index) && styles.selected]}
          >
            <Typography>{getNameList(index)}</Typography>
            <IconButton onClick={(e) => handleFavoriteClick(e, index)}>
              {isFavoriteSelector(getItemName(index)) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
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
  selectedFavoriteIndexSelector: PropTypes.number,
  selectedResultIndexSelector: PropTypes.number,
  isSelected: PropTypes.func.isRequired,
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
    selectedFavoriteIndexSelector,
    selectedResultIndexSelector,
  }),
  withSidebarProps
)(Sidebar);

export default ComposedSidebar;
