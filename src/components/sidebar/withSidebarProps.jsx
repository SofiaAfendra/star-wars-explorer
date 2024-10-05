import { useCallback } from "react";
import PropTypes from "prop-types";

export const withSidebarProps = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const {
      fetchSearchResults,
      nextPageSelector,
      setSelectedResult,
      setSelectedFavorite,
      showFavoritesSelector,
      filtersSelector: { option, searchText },
      addFavorite,
      removeFavorite,
      isFavoriteSelector,
      favoritesSelector,
      searchResultsSelector,
      nameListSelector,
      searchingSelector,
      searchResultsCountSelector,
      favoritesCountSelector,
      favoriteNameListSelector,
      selectedFavoriteIndexSelector,
      selectedResultIndexSelector,
    } = props;

    const showSkeleton = searchingSelector && nameListSelector.length === 0;

    const totalCount = showFavoritesSelector
      ? favoritesCountSelector
      : searchResultsCountSelector;

    const getNameList = useCallback(
      (index) =>
        showFavoritesSelector
          ? favoriteNameListSelector[index]
          : nameListSelector[index],
      [showFavoritesSelector, favoriteNameListSelector, nameListSelector]
    );

    const loadMore = useCallback(() => {
      if (nextPageSelector) {
        fetchSearchResults({ option, searchText, page: nextPageSelector });
      }
    }, [fetchSearchResults, nextPageSelector, option, searchText]);

    const handleLinkClick = useCallback(
      (index) => {
        showFavoritesSelector
          ? setSelectedFavorite(index)
          : setSelectedResult(index);
      },
      [setSelectedFavorite, setSelectedResult, showFavoritesSelector]
    );

    const getListItem = useCallback(
      (index) =>
        showFavoritesSelector
          ? favoritesSelector[index]
          : searchResultsSelector[index],
      [favoritesSelector, searchResultsSelector, showFavoritesSelector]
    );

    const getFavoriteName = useCallback(
      (index) =>
        favoritesSelector[index].name || favoritesSelector[index].title,
      [favoritesSelector]
    );

    const getSearchResultName = useCallback(
      (index) =>
        searchResultsSelector[index].name || searchResultsSelector[index].title,
      [searchResultsSelector]
    );

    const getItemName = useCallback(
      (index) =>
        showFavoritesSelector
          ? getFavoriteName(index)
          : getSearchResultName(index),
      [showFavoritesSelector, getFavoriteName, getSearchResultName]
    );

    const handleFavoriteClick = useCallback(
      (event, index) => {
        event.stopPropagation();
        isFavoriteSelector(getItemName(index))
          ? removeFavorite(getListItem(index))
          : addFavorite(getListItem(index));
      },
      [
        addFavorite,
        getListItem,
        isFavoriteSelector,
        removeFavorite,
        getItemName,
      ]
    );

    const isSelected = useCallback(
      (index) =>
        showFavoritesSelector
          ? index === selectedFavoriteIndexSelector
          : index === selectedResultIndexSelector,
      [
        selectedFavoriteIndexSelector,
        selectedResultIndexSelector,
        showFavoritesSelector,
      ]
    );

    return (
      <WrappedComponent
        {...props}
        loadMore={loadMore}
        handleLinkClick={handleLinkClick}
        handleFavoriteClick={handleFavoriteClick}
        getItemName={getItemName}
        getNameList={getNameList}
        showSkeleton={showSkeleton}
        totalCount={totalCount}
        isSelected={isSelected}
      />
    );
  };

  EnhancedComponent.propTypes = {
    fetchSearchResults: PropTypes.func.isRequired,
    nextPageSelector: PropTypes.string,
    setSelectedResult: PropTypes.func.isRequired,
    setSelectedFavorite: PropTypes.func.isRequired,
    showFavoritesSelector: PropTypes.bool.isRequired,
    filtersSelector: PropTypes.object.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    isFavoriteSelector: PropTypes.func.isRequired,
    favoritesSelector: PropTypes.array.isRequired,
    searchResultsSelector: PropTypes.array.isRequired,
    nameListSelector: PropTypes.array.isRequired,
    searchingSelector: PropTypes.bool.isRequired,
    searchResultsCountSelector: PropTypes.number.isRequired,
    favoritesCountSelector: PropTypes.number.isRequired,
    favoriteNameListSelector: PropTypes.array.isRequired,
    selectedFavoriteIndexSelector: PropTypes.number,
    selectedResultIndexSelector: PropTypes.number,
  };
  return EnhancedComponent;
};
