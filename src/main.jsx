import { createRoot } from "react-dom/client";
import { UISetup } from "./components";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <UISetup>
    <App />
  </UISetup>
);
