import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import {
  fetchSearchResultsEpic,
  initialState as searchInitialState,
} from "../models/search-results";
import { initialState as favoritesInitialState } from "../models/favorites";
import { initialState as snackbarInitialState } from "../models/snackbar";
import { combinedReducers } from "./rootReducer";
import { persistState } from "../library/persistState";

const epicMiddleware = createEpicMiddleware();

const preloadedState = {
  searchResults: searchInitialState,
  snackbar: snackbarInitialState,
};

const createStore = () => {
  const { initialState, persistStateMiddleware } = persistState("favorites");

  const store = configureStore({
    preloadedState: {
      ...preloadedState,
      favorites: Object.keys(initialState).length
        ? initialState
        : favoritesInitialState,
    },
    reducer: combinedReducers,
    middleware: () => [epicMiddleware, persistStateMiddleware],
  });

  epicMiddleware.run(fetchSearchResultsEpic);

  return store;
};

export const store = createStore();
