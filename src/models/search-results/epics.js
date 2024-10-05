import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { fetchSearchResults, setSearchResults } from "./actions";
import { openSnackbar } from "../snackbar";

export const fetchSearchResultsEpic = (action$) =>
  action$.pipe(
    ofType(fetchSearchResults.type),
    switchMap(({ payload }) =>
      ajax
        .getJSON(
          `https://swapi.dev/api/${payload?.option}?search=${payload?.searchText}&page=${payload?.page}`
        )
        .pipe(
          map((response) => setSearchResults(response)),
          catchError((error) =>
            of(openSnackbar({ type: "error", content: error.message }))
          )
        )
    )
  );
