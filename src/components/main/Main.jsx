import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { withModelProps } from "../../library/withModelProps";
import { selectedResultSelector } from "../../models/search-results";
import {
  showFavoritesSelector,
  selectedFavoriteSelector,
} from "../../models/favorites";
import styles from "./styles";

const renderContent = (selector) => {
  if (selector) {
    return Object.entries(selector).map(([key, value]) => (
      <Box key={key} component="section" sx={styles.container}>
        <Typography sx={styles.key}>{key}</Typography>
        <Typography sx={styles.value}>{value}</Typography>
      </Box>
    ));
  } else {
    return (
      <Typography sx={styles.helperText}>May the force be with you!</Typography>
    );
  }
};

const Main = ({
  showFavoritesSelector,
  selectedFavoriteSelector,
  selectedResultSelector,
}) => (
  <Box component="main" sx={styles.main}>
    {showFavoritesSelector
      ? renderContent(selectedFavoriteSelector)
      : renderContent(selectedResultSelector)}
  </Box>
);
Main.propTypes = {
  showFavoritesSelector: PropTypes.bool.isRequired,
  selectedFavoriteSelector: PropTypes.object,
  selectedResultSelector: PropTypes.object,
};

const ComposedMain = withModelProps({
  showFavoritesSelector,
  selectedFavoriteSelector,
  selectedResultSelector,
})(Main);

export default ComposedMain;
