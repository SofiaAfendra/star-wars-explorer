import { createAction } from "@reduxjs/toolkit";
import { searchResultsSlice } from "./slice";

export const fetchSearchResults = createAction(
  "searchResults/fetchSearchResults"
);

export const { setSearchResults, clearSearchResults, setSelectedResult } =
  searchResultsSlice.actions;
