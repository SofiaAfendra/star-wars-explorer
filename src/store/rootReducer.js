import { snackbarReducer, snackbarSliceName } from "../models/snackbar";
import { favoritesReducer, favoritesSliceName } from "../models/favorites";
import {
  searchResultsReducer,
  searchResultsSliceName,
} from "../models/search-results";

export const combinedReducers = {
  [snackbarSliceName]: snackbarReducer,
  [searchResultsSliceName]: searchResultsReducer,
  [favoritesSliceName]: favoritesReducer,
};
