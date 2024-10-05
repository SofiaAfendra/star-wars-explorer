import PropTypes from "prop-types";

export const withSnackbarProps = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const { closeSnackbar } = props;

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      closeSnackbar();
    };

    return <WrappedComponent {...props} handleClose={handleClose} />;
  };

  EnhancedComponent.propTypes = {
    closeSnackbar: PropTypes.func.isRequired,
  };

  return EnhancedComponent;
};
