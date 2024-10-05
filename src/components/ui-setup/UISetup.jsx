import { StrictMode } from "react";
import { Provider } from "react-redux";
import { GlobalStyles, CssBaseline } from "@mui/material";
import { Snackbar } from "../snackbar";
import { store } from "../../store";
import PropTypes from "prop-types";

const UISetup = ({ children }) => (
  <StrictMode>
    <Provider store={store}>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <CssBaseline />
      <Snackbar />
      {children}
    </Provider>
  </StrictMode>
);

UISetup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UISetup;
