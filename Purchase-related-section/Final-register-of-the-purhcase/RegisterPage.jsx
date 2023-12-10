/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./RegisterPage.css";
import Header from "../../Componnents/Header/Header";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

function Main() {
  function DialogOfDemandMoreThanSupplyComponnent() {
    return (
      <>
        <Dialog
          open={dialogOfDemandMoreThanSupply}
          onClose={dialogOfDemandMoreThanSupplyHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ direction: "ltr" }}
        >
          <DialogTitle id="alert-dialog-title">{"خطا"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              تعداد درخواستی محصول بیشتر از موجودی میباشد
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogOfDemandMoreThanSupplyHandleClose}>
              بازگشت
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  function DialogOfSuccesRegisterComponnent() {
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
              {productRegisteringTextWrite()} با موفقیت سبد شده و به سبد خرید
              اضافه شد
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </>
    );
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);

  const dialogOfSuccesRegisterHandleClickOpen = () => {
    setDialogOfSuccesRegister(true);
  };

  const dialogOfSuccesRegisterHandleClose = () => {
    setDialogOfSuccesRegister(false);
  };

  const [dialogOfDemandMoreThanSupply, setDialogOfDemandMoreThanSupply] =
    React.useState(false);

  const dialogOFDemandMoreThanSupplyHandleClickOpen = () => {
    setDialogOfDemandMoreThanSupply(true);
  };

  const dialogOfDemandMoreThanSupplyHandleClose = () => {
    setDialogOfDemandMoreThanSupply(false);
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

  const productID = location.hash.substring(1);
  let productsInformations = window.localStorage.getItem(
    "productsInformations"
  );
  productsInformations = JSON.parse(productsInformations);
  const product = productsInformations.find(function (item, index) {
    return item.id === productID;
  });

  let shoppingCartInformations = [];
  const probablyShoppingCartInformations = window.localStorage.getItem(
    "shoppingCartInformations"
  );
  if (probablyShoppingCartInformations) {
    shoppingCartInformations = JSON.parse(probablyShoppingCartInformations);
  }

  const productFarsiName = findProductFarsiName(product.name);
  const productNaumberInputRef = React.useRef(0);
  const productRegisteringDivisionTextRef = React.useRef(0);

  const [alertOfInvalidInputs, setAlertOfInvalidInputs] =
    React.useState("none");

  const [submitButtonOn, setSubmitButtonOn] = React.useState("none");

  function productRegisteringTextWrite() {
    return `خرید ${productNaumberInputRef.current.value} 
    عدد ${productFarsiName} به قیمت ${
      productNaumberInputRef.current.value * product.price
    } تومان`;
  }

  function productNaumberInputHandle() {
    setAlertOfInvalidInputs("default");
    const inputValue = productNaumberInputRef.current.value;
    const isProductChooseNumberInputCorrect = /[1-9]/;
    if (isProductChooseNumberInputCorrect.test(inputValue) && inputValue > 0) {
      setAlertOfInvalidInputs("none");
      setSubmitButtonOn("block");
      document.getElementById("productNaumberInput").style.outline =
        "2px solid blue";
      productRegisteringDivisionTextRef.current.textContent =
        productRegisteringTextWrite();
    } else {
      setSubmitButtonOn("none");
      productRegisteringDivisionTextRef.current.innerHTML = "";
      productNaumberInputRef.current.value = "";
      document.getElementById("productNaumberInput").style.outline =
        "2px solid red";
    }
  }

  function wait2SeconsAndGoToTheLastPage() {
    setTimeout(function () {
      location.assign("../Purchase-page");
    }, 2500);
  }

  function productRegisteringSubmitButtonHandle() {
    const productNaumberInputValue = productNaumberInputRef.current.value;
    if (productNaumberInputValue > product.number) {
      dialogOFDemandMoreThanSupplyHandleClickOpen();
    } else {
      function showDialogOfSuccesRegister() {
        dialogOfSuccesRegisterHandleClickOpen();
        wait2SeconsAndGoToTheLastPage();
      }
      function changeShoppingCartLocalStorage() {
        let productWasAlreadyExist = false;
        shoppingCartInformations.forEach((item, index) => {
          if (item.id === productID) {
            productWasAlreadyExist = true;
            const productNewNumber =
              shoppingCartInformations[index].number +
              parseInt(productNaumberInputValue);
            shoppingCartInformations[index].number = productNewNumber;
            window.localStorage.setItem(
              "shoppingCartInformations",
              JSON.stringify(shoppingCartInformations)
            );
          }
        });
        if (!productWasAlreadyExist) {
          const newShoppingProduct = {
            name: product.name,
            price: product.price,
            number: parseInt(productNaumberInputValue),
            id: productID,
          };
          shoppingCartInformations.push(newShoppingProduct);

          window.localStorage.setItem(
            "shoppingCartInformations",
            JSON.stringify(shoppingCartInformations)
          );
        }
      }
      function changeProductInformationsLocalStorage() {
        const productIndex = productsInformations.findIndex((item, index) => {
          return item.id === productID;
        });
        const productNewNumber =
          productsInformations[productIndex].number - productNaumberInputValue;
        productsInformations[productIndex].number = productNewNumber;
        if (productNewNumber === 0) {
          productsInformations.splice(productIndex, 1);
        }
        window.localStorage.setItem(
          "productsInformations",
          JSON.stringify(productsInformations)
        );
      }
      async function asynchronouseFunctionForRegisterAndStorage() {
        await showDialogOfSuccesRegister();
        changeShoppingCartLocalStorage();
        changeProductInformationsLocalStorage();
      }
      asynchronouseFunctionForRegisterAndStorage();
    }
  }

  return (
    <>
      <main className="main">
        <div
          className="RegistermainInnerContainer"
          style={{
            width: "90%",
            margin: "100px auto",
          }}
        >
          <p>نوع محصول : {productFarsiName}</p>
          <p>موجودی : {product.number} عدد</p>
          <label htmlFor="productNaumberInput">
            تعداد محصول درخواستی :
          </label>{" "}
          <input
            onInput={productNaumberInputHandle}
            ref={productNaumberInputRef}
            type="number"
            placeholder="...,1,2,3"
            id="productNaumberInput"
          />
          <Alert
            variant="filled"
            severity="error"
            sx={{
              display: alertOfInvalidInputs,
              marginRight: "150px",
              marginTop: "5px",
              width: "fit-content",
              direction: "ltr",
            }}
          >
            امکان پذیر نمی باشد
          </Alert>
          <div className="productRegisteringDivision">
            <div
              ref={productRegisteringDivisionTextRef}
              id="productRegisteringDivisionText"
            ></div>
            <Button
              onClick={productRegisteringSubmitButtonHandle}
              variant="contained"
              color="success"
              size="large"
              sx={{ fontSize: "medium", display: submitButtonOn }}
            >
              تایید
            </Button>
          </div>
          <DialogOfDemandMoreThanSupplyComponnent />
          <DialogOfSuccesRegisterComponnent />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header pageTitle="ثبت نهایی خرید" />
      <Main />
    </>
  );
}

export default App;
