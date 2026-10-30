/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the main.jsx page for assignment 5. It is responsible for rendering the App component and setting up the React Router. 
  It also imports the necessary CSS for styling the application.
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
