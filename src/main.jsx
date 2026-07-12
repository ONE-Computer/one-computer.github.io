import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./styles.css";

const page = document.body.dataset.page || "home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App page={page} />
    </MotionConfig>
  </StrictMode>,
);
