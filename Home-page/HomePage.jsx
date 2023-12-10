/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./HomePage.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <h1 className="headerText">مرکز خرید و فروش اجناس</h1>
      </header>
    </>
  );
}

function Main() {
  return (
    <>
      <main>
        <div className="mainOuterContainer">
          <div className="mainInnerContainer">
            <Link to={"Sale-page"}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  padding: "50px",
                  fontSize: "3em",
                }}
              >
                بخش فروش
              </Button>
            </Link>

            <Link to={"/Purchase-page"}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  padding: "50px",
                  fontSize: "3em",
                }}
              >
                بخش خرید
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
