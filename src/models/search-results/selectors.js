import { createSelector } from "reselect";

export const searchResultsSelector = (state) =>
  state?.searchResults?.searchResults || [];

export const nextSelector = (state) => state?.searchResults?.next || "";

export const selectedResultIndexSelector = (state) =>
  state?.searchResults?.selectedResult;

export const searchingSelector = (state) => state?.searchResults?.searching;

export const filtersSelector = (state) => state?.searchResults?.filters || {};

export const searchResultsCountSelector = createSelector(
  searchResultsSelector,
  (searchResults) => searchResults?.length || 0
);

export const nameListSelector = createSelector(
  searchResultsSelector,
  (searchResults) => searchResults?.map((result) => result.name || result.title)
);

export const nextPageSelector = createSelector(nextSelector, (next) => {
  if (!next) {
    return;
  }
  const url = new URL(next);
  return url?.searchParams.get("page");
});

export const selectedResultSelector = createSelector(
  searchResultsSelector,
  selectedResultIndexSelector,
  (searchResults, selectedResultIndex) => searchResults[selectedResultIndex]
);
