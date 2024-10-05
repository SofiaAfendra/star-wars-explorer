import PropTypes from "prop-types";
import { compose } from "@reduxjs/toolkit";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { withSnackbarProps } from "./withSnackbarProps";
import { withModelProps } from "../../library";
import {
  closeSnackbar,
  isSnackbarOpen,
  snackbarType,
  snackbarContent,
} from "../../models/snackbar";
import styles from "./styles";

const Snackbar = ({
  handleClose,
  isSnackbarOpen,
  snackbarType,
  snackbarContent,
}) => (
  <MuiSnackbar
    open={isSnackbarOpen}
    sx={styles.snackbar}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <Alert
      variant="filled"
      elevation={5}
      severity={snackbarType || "warning"}
      onClose={handleClose}
    >
      {snackbarContent}
    </Alert>
  </MuiSnackbar>
);
Snackbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isSnackbarOpen: PropTypes.bool.isRequired,
  snackbarType: PropTypes.string,
  snackbarContent: PropTypes.string,
};

const ComposedSnackbar = compose(
  withModelProps({
    closeSnackbar,
    isSnackbarOpen,
    snackbarType,
    snackbarContent,
  }),
  withSnackbarProps
)(Snackbar);

export default ComposedSnackbar;
