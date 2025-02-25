import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { BrowserRouter as Router } from "react-router";
import ColorSwitcher from "./components/ColorSwitcher.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster richColors />
          <ColorSwitcher />
        </QueryClientProvider>
      </ModalProvider>
    </Router>
  </StrictMode>
);
