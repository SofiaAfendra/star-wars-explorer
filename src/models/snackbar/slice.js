import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isSnackbarOpen: false,
  snackbarType: "warning",
  snackbarContent: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, { payload: { type, content } }) => {
      state.isSnackbarOpen = true;
      state.snackbarType = type;
      state.snackbarContent = content;
    },
    closeSnackbar: () => initialState,
  },
});

export const snackbarReducer = snackbarSlice.reducer;
export const snackbarSliceName = snackbarSlice.name;
