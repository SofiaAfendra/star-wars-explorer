import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchResults } from "./actions";

export const initialState = {
  searchResults: [],
  next: "",
  searching: false,
  selectedResult: 0,
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults(state, action) {
      const { results, next } = action.payload;
      state.searchResults = [...state.searchResults, ...results];
      state.next = next;
      state.searching = false;
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.next = "";
      state.selectedResult = 0;
    },
    setSelectedResult(state, action) {
      state.selectedResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults, (state) => {
      state.searching = true;
    });
  },
});

export const searchResultsReducer = searchResultsSlice.reducer;
export const searchResultsSliceName = searchResultsSlice.name;
