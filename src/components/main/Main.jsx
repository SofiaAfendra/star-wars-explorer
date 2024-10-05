import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { withModelProps } from "../../library/withModelProps";
import { selectedResultSelector } from "../../models/search-results";
import {
  showFavoritesSelector,
  selectedFavoriteSelector,
} from "../../models/favorites";
import styles from "./styles";

const Main = ({
  showFavoritesSelector,
  selectedFavoriteSelector,
  selectedResultSelector,
}) => (
  <Box component="main" sx={styles.main}>
    {showFavoritesSelector ? (
      selectedFavoriteSelector ? (
        Object.entries(selectedFavoriteSelector).map(([key, value]) => (
          <Typography key={key}>
            {key}: {value}
          </Typography>
        ))
      ) : (
        <Typography>May the force be with you!</Typography>
      )
    ) : selectedResultSelector ? (
      Object.entries(selectedResultSelector).map(([key, value]) => (
        <Typography key={key}>
          {key}: {value}
        </Typography>
      ))
    ) : (
      <Typography>May the force be with you!</Typography>
    )}
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
