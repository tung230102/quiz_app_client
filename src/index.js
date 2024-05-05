import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import { QuizProvider } from "./context/QuizContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.replace("/")}
  >
    <Router>
      <QuizProvider>
        <App />
      </QuizProvider>
    </Router>
  </ErrorBoundary>
  // </React.StrictMode>
);
