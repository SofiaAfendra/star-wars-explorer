import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { combinedReducers } from "./rootReducer";
import { fetchSearchResultsEpic } from "../models/search-results";
import { initialState as favoritesInitialState } from "../models/favorites";
import { persistState } from "../library/persistState";

const epicMiddleware = createEpicMiddleware();

const createStore = () => {
  const { initialState, persistStateMiddleware } = persistState("favorites");

  const store = configureStore({
    preloadedState: {
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
