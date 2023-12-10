/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./SalePage.css";
import uuid from "react-uuid";
import Header from "../Componnents/Header/Header";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

function Main() {
  const productRegisteringDivisionTextRef = React.useRef(0);
  const productsSelectDivisionRef = React.useRef();
  const productChooseNumberInputRef = React.useRef(0);
  const productChoosePriceInputRef = React.useRef(0);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function DialogOfSuccesRegisterComponnent() {
    let productName = "banana";
    if (productsSelectDivisionRef.current) {
      productName = productsSelectDivisionRef.current.value;
    }
    return (
      <>
        <Dialog
          open={dialogOfSuccesRegister}
          TransitionComponent={Transition}
          keepMounted
          onClose={dialogOfSuccesRegisterHandleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{ direction: "ltr" }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ fontSize: "large", fontWeight: "700" }}
            >
              تعداد {productChooseNumberInputRef.current.value}{" "}
              {findProductFarsiName(productName)} با قیمت هر عدد{" "}
              {productChoosePriceInputRef.current.value} تومان با مؤفقیت به فروش
              گذاشته شد
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </>
    );
  }

  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);

  const dialogOfSuccesRegisterHandleClickOpen = () => {
    setDialogOfSuccesRegister(true);
  };

  const dialogOfSuccesRegisterHandleClose = () => {
    setDialogOfSuccesRegister(false);
  };

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

  function productRegisteringTextWrite() {
    const productChooseedNumber =
      productChooseNumberInputRef.current.value || 0;
    const productChooseedPrice = productChoosePriceInputRef.current.value || 0;
    const productFarsiName =
      findProductFarsiName(productsSelectDivisionRef.current.value) || "موز";

    productRegisteringDivisionTextRef.current.textContent = `فروش ${productChooseedNumber} 
    عدد ${productFarsiName}${" "}
    به قیمت هرعدد ${productChooseedPrice} تومان
    `;
  }

  React.useEffect(() => {
    productRegisteringTextWrite();
  });

  function productNaumberInputHandle() {
    const inputValue = productChooseNumberInputRef.current.value;
    const isProductChooseNumberInputCorrect = /[1-9]/;

    if (isProductChooseNumberInputCorrect.test(inputValue) && inputValue > 0) {
      productChooseNumberInputRef.current.style.outline = "2px solid blue";
      document.getElementById("submitButton").style.display = "block";
      productRegisteringTextWrite();
    } else {
      productChooseNumberInputRef.current.style.outline = "2px solid red";
      productChooseNumberInputRef.current.value = "";
      document.getElementById("submitButton").style.display = "none";

      productRegisteringDivisionTextRef.current.innerHTML = "";
    }
  }

  function productPriceInputHandle() {
    const inputValue = productChoosePriceInputRef.current.value;
    const isProductChooseNumberInputCorrect = /[1-9]/;

    if (isProductChooseNumberInputCorrect.test(inputValue) && inputValue > 0) {
      document.getElementById("submitButton").style.display = "block";

      productChoosePriceInputRef.current.style.outline = "2px solid blue";
      productRegisteringTextWrite();
    } else {
      document.getElementById("submitButton").style.display = "none";

      productRegisteringDivisionTextRef.current.innerHTML = "";
      productChoosePriceInputRef.current.value = "";
      productChoosePriceInputRef.current.style.outline = "2px solid red";
    }
  }

  function wait2SeconsAndGoToTheLastPage() {
    setTimeout(function () {
      location.assign("/");
    }, 2500);
  }

  const temporaryProductsInformations = window.localStorage.getItem(
    "productsInformations"
  );
  let productsInformations = [];
  if (temporaryProductsInformations) {
    productsInformations = JSON.parse(temporaryProductsInformations);
  }

  function changeLocalStorage() {
    let productWasAlreadyExist = false;
    productsInformations.forEach((item, index) => {
      if (item.name === productsSelectDivisionRef.current.value) {
        if (item.price === parseInt(productChoosePriceInputRef.current.value)) {
          productWasAlreadyExist = true;
          const productNewNumber =
            productsInformations[index].number +
            parseInt(productChooseNumberInputRef.current.value);

          productsInformations[index].number = productNewNumber;
          window.localStorage.setItem(
            "productsInformations",
            JSON.stringify(productsInformations)
          );
        }
      }
    });
    if (!productWasAlreadyExist) {
      const newProduct = {
        name: productsSelectDivisionRef.current.value,
        price: parseInt(productChoosePriceInputRef.current.value),
        number: parseInt(productChooseNumberInputRef.current.value),
        id: uuid(),
      };
      productsInformations.push(newProduct);

      window.localStorage.setItem(
        "productsInformations",
        JSON.stringify(productsInformations)
      );
    }
  }

  function productRegisteringSubmitButtonHandle() {
    dialogOfSuccesRegisterHandleClickOpen();
    wait2SeconsAndGoToTheLastPage();
    changeLocalStorage();
  }

  function ChoosePoductInformations() {
    return (
      <>
        <li className="productChooseInformationItems">
          محصول مورد نظر :{" "}
          <select
            ref={productsSelectDivisionRef}
            onChange={productRegisteringTextWrite}
          >
            <option value="banana">موز</option>
            <option value="orange">پرتقال</option>
            <option value="apple">سیب</option>
          </select>
        </li>
        <li className="productChooseInformationItems">
          <label htmlFor="productChooseNumberInput">تعداد محصول : </label>
          <input
            placeholder="...,1,2,3"
            type="number"
            id="productChooseNumberInput"
            ref={productChooseNumberInputRef}
            onInput={productNaumberInputHandle}
          />
        </li>
        <li className="productChooseInformationItems">
          <label htmlFor="productChoosePriceInput">قیمت محصول : </label>
          <input
            placeholder="1000"
            onInput={productPriceInputHandle}
            ref={productChoosePriceInputRef}
            type="number"
            id="productChoosePriceInputID"
          />
        </li>
      </>
    );
  }

  function ProductRegisteringDivision() {
    return (
      <>
        <div className="productRegisteringDivision">
          <div
            ref={productRegisteringDivisionTextRef}
            id="productRegisteringDivisionTextID"
          ></div>
          <Button
            onClick={productRegisteringSubmitButtonHandle}
            id="submitButton"
            variant="contained"
            color="success"
            size="large"
            sx={{ fontSize: "medium", display: "none" }}
          >
            تایید
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <main>
        <div className="outerContainer">
          <div className="InnerContainer">
            <ChoosePoductInformations />
            <ProductRegisteringDivision />
            <DialogOfSuccesRegisterComponnent />
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header pageTitle="بخش فروش" />
      <Main />
    </>
  );
}

export default App;
