import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./globals.css";
import { CantoTesnet } from "@thirdweb-dev/chains";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={CantoTesnet}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
