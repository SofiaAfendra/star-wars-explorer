import { Box } from "@mui/material";
import { Header, Main, Sidebar, Snackbar } from "./components";
import styles from "./styles";

export function App() {
  return (
    <Box component="section" sx={styles.root}>
      <Header />
      <Main />
      <Sidebar />
      <Box component="footer" sx={styles.footer} />
      <Snackbar />
    </Box>
  );
}
