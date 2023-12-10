/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./Home-page/HomePage";
import PurchasePage from "./Purchase-related-section/PurchasePage";
import RegisterPage from "./Purchase-related-section/Final-register-of-the-purhcase/RegisterPage";
import SalePage from "./Sales-related-section/SalePage";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/Puechase-page" element={<PurchasePage />}></Route>
          <Route
            path="/Puechase-page/Register-page"
            element={<RegisterPage />}
          ></Route>
          <Route path="/Sale-page" element={<SalePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
