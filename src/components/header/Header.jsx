import { compose } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { withHeaderProps } from "./withHeaderProps";
import { withModelProps } from "../../library";
import {
  fetchSearchResults,
  clearSearchResults,
  setFilters,
} from "../../models/search-results";
import {
  setShowFavorites,
  showFavoritesSelector,
} from "../../models/favorites";
import { OPTIONS_LIST } from "./constants";
import styles from "./styles";

const Header = ({
  showFavoritesSelector,
  setShowFavorites,
  option,
  handleChange,
  handleSearch,
  handleClick,
}) => (
  <Box component="header" sx={styles.header}>
    <Typography variant="h1" align="center" sx={styles.heading}>
      Star Wars Explorer
    </Typography>
    <Box component="section" sx={styles.filters}>
      <Select sx={styles.select} value={option} onChange={handleChange}>
        {OPTIONS_LIST.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <TextField
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
        onChange={handleSearch}
      />
      <Button variant="contained" onClick={handleClick}>
        Search
      </Button>
      <FormControlLabel
        control={<Switch checked={showFavoritesSelector} />}
        label="Show Favorites"
        onChange={() => setShowFavorites()}
      />
    </Box>
  </Box>
);

Header.propTypes = {
  showFavoritesSelector: PropTypes.bool.isRequired,
  setShowFavorites: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const ComposedHeader = compose(
  withModelProps({
    fetchSearchResults,
    clearSearchResults,
    showFavoritesSelector,
    setShowFavorites,
    setFilters,
  }),
  withHeaderProps
)(Header);

export default ComposedHeader;
