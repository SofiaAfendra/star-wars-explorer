import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  favorites: [],
  showFavorites: false,
  selectedFavorite: 0,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.selectedFavorite = 0;
      state.favorites = state.favorites.filter(
        (favorite) =>
          favorite.name !== action.payload.name ||
          favorite.title !== action.payload.title
      );
    },
    setShowFavorites(state) {
      state.showFavorites = !state.showFavorites;
    },
    setSelectedFavorite(state, action) {
      state.selectedFavorite = action.payload;
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const favoritesSliceName = favoritesSlice.name;
