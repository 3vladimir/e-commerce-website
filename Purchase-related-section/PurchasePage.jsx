/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./PurchasePage.css";
import Header from "../Componnents/Header/Header";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const productsInitailInformations = [
  {
    name: "banana",
    price: 500,
    number: 12,
    id: uuid(),
  },
  {
    name: "banana",
    price: 700,
    number: 8,
    id: uuid(),
  },
  {
    name: "apple",
    price: 200,
    number: 5,
    id: uuid(),
  },
  {
    name: "apple",
    price: 400,
    number: 2,
    id: uuid(),
  },
  {
    name: "apple",
    price: 500,
    number: 9,
    id: uuid(),
  },
  {
    name: "orange",
    price: 300,
    number: 3,
    id: uuid(),
  },
];

function Main() {
  const productsSelectDivisionRef = React.useRef();
  function Select() {
    return (
      <>
        <select
          ref={productsSelectDivisionRef}
          onChange={handleProductCategories}
        >
          <option value="banana">موز</option>
          <option value="orange">پرتقال</option>
          <option value="apple">سیب</option>
        </select>
      </>
    );
  }
  function findProductFarsiName(inputProductName) {
    switch (inputProductName) {
      case "banana": {
        return "موز";
      }
      case "orange": {
        return "پرتقال";
      }
      case "apple": {
        return "سیب";
      }
      default: {
        throw new Error("محصول مورد نظر در سایت موجود نمی باشد");
      }
    }
  }

  React.useEffect(() => {
    window.localStorage.setItem(
      "productName",
      productsSelectDivisionRef.current.value
    );
  });

  let prboblyProductsInformations = window.localStorage.getItem(
    "productsInformations"
  );
  prboblyProductsInformations = JSON.parse(prboblyProductsInformations);
  const productsInformations = prboblyProductsInformations || [
    ...productsInitailInformations,
  ];

  const productName = window.localStorage.getItem("productName");
  React.useEffect(() => {
    productsSelectDivisionRef.current.value = productName;
  });

  const [productErrorOFRunOut, setProductErrorOFRunOut] = React.useState();

  function handleProductCategories() {
    setProductErrorOFRunOut("block");
    const productChoosedValueName = productsSelectDivisionRef.current.value;
    window.localStorage.setItem("productName", productChoosedValueName);
    productsInformations.forEach((item) => {
      if (item.name !== productChoosedValueName) {
        document.getElementById(`${item.id}`).style.display = "none";
      } else {
        document.getElementById(`${item.id}`).style.display = "block";
        setProductErrorOFRunOut("none");
      }
    });
  }
  function PrintProductsInformations() {
    return (
      <>
        <ul className="productsItemsList">
          <p
            style={{
              display: productErrorOFRunOut,
              color: "red",
              fontSize: "large",
            }}
          >
            محصول مورد نظر شما موجود نمی باشد
          </p>
          {productsInformations.map((item) => {
            return (
              <li key={item.id} id={item.id}>
                <div className="productsItems">
                  <div>
                    {`تعداد ${item.number} ${findProductFarsiName(
                      item.name
                    )} با قیمت هر عدد ${item.price} تومان موجود است`}
                  </div>
                  <Link to={`/Purchase-page/Register-page#${item.id}`}>
                    <Button
                      id="button"
                      variant="contained"
                      size="small"
                      sx={{ fontSize: "medium" }}
                    >
                      خرید
                    </Button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  React.useEffect(() => {
    handleProductCategories();
    window.localStorage.setItem(
      "productsInformations",
      JSON.stringify(productsInformations)
    );
  });
  return (
    <>
      <main className="main">
        <div
          className="BuyMainInnerContainer"
          style={{
            width: "90%",
            margin: "100px auto",
          }}
        >
          <Select />
          <PrintProductsInformations />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header pageTitle="بخش خرید" />
      <Main />
    </>
  );
}
export default App;
