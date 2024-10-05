import { snackbarReducer, snackbarSliceName } from "../models/snackbar";
import {
  searchResultsReducer,
  searchResultsSliceName,
} from "../models/search-results";
import {
  favoritesReducer,
  favoritesSliceName,
} from "../models/favorites/slice";

export const combinedReducers = {
  [snackbarSliceName]: snackbarReducer,
  [searchResultsSliceName]: searchResultsReducer,
  [favoritesSliceName]: favoritesReducer,
};
