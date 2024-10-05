export const persistState = (key) => ({
  initialState: JSON.parse(localStorage.getItem(key)) ?? {},

  persistStateMiddleware: (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem(key, JSON.stringify(store.getState()[key]));
    return result;
  },
});
