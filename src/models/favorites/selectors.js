import { createSelector } from "reselect";

export const favoritesSelector = (state) => state?.favorites?.favorites || [];

export const showFavoritesSelector = (state) => state?.favorites?.showFavorites;

export const selectedFavoriteIndexSelector = (state) =>
  state?.favorites?.selectedFavorite;

export const favoritesCountSelector = createSelector(
  favoritesSelector,
  (favorites) => favorites?.length || 0
);

export const isFavoriteSelector = createSelector(
  favoritesSelector,
  (favorites) => (name) =>
    favorites.some(
      (favorite) => favorite.name === name || favorite.title === name
    )
);

export const favoriteNameListSelector = createSelector(
  favoritesSelector,
  (favorites) => favorites.map((favorite) => favorite.name || favorite.title)
);

export const selectedFavoriteSelector = createSelector(
  favoritesSelector,
  selectedFavoriteIndexSelector,
  (favorites, selectedFavoriteIndex) => favorites[selectedFavoriteIndex]
);
