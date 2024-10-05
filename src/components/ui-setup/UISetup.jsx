import { StrictMode } from "react";
import { Provider } from "react-redux";
import { GlobalStyles, CssBaseline } from "@mui/material";
import { store } from "../../store";
import PropTypes from "prop-types";

const UISetup = ({ children }) => (
  <StrictMode>
    <Provider store={store}>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
          "@media (max-width:480px)": {
            html: {
              fontSize: "12px",
            },
          },
          "@media (max-width:600px)": {
            html: {
              fontSize: "14px",
            },
          },
        }}
      />
      <CssBaseline />
      {children}
    </Provider>
  </StrictMode>
);

UISetup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UISetup;
