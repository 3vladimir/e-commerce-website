/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

function Header({ pageTitle }) {
  const [shoppingCartEmpty, setShoppingCartEmpty] = React.useState("none");
  const [shoppingCartOpen, setShoppingCartOpen] = React.useState("none");
  function openTheSoppingCart() {
    if (shoppingCartOpen === "none") {
      setShoppingCartOpen("block");
    } else {
      setShoppingCartOpen("none");
    }
  }
  function ShoppingCartComponnent() {
    let shoppingCartInformations = [];
    const probablyShoppingCartInformations = window.localStorage.getItem(
      "shoppingCartInformations"
    );
    if (probablyShoppingCartInformations) {
      shoppingCartInformations = JSON.parse(probablyShoppingCartInformations);
    }
    if (shoppingCartInformations.length === 0) {
      setShoppingCartEmpty("block");
    } else {
      setShoppingCartEmpty("none");
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

    let productsInformations = window.localStorage.getItem(
      "productsInformations"
    );
    productsInformations = JSON.parse(productsInformations);

    return (
      <>
        <div
          className="shoppingCartListInnerContainer"
          style={{ display: shoppingCartOpen }}
        >
          <ul className="shoppingCacrtList">
            <p
              style={{
                display: shoppingCartEmpty,
                textAlign: "center",
                color: "brown",
                fontSize: "large",
              }}
            >
              سبد خرید خالی میباشد
            </p>
            {shoppingCartInformations.map(
              (shoppingcartInfItem, shoppingCartInfIndex) => {
                return (
                  <li
                    key={shoppingcartInfItem.id}
                    id={`x${shoppingcartInfItem.id}`}
                  >
                    <div className="shopiingCartItems">
                      <div>
                        {shoppingcartInfItem.number}{" "}
                        {findProductFarsiName(shoppingcartInfItem.name)} به مبلغ{" "}
                        {shoppingcartInfItem.price * shoppingcartInfItem.number}{" "}
                        تومان
                      </div>
                      <Button
                        onClick={() => {
                          let productWasAlreadyExist = false;
                          productsInformations.forEach(
                            (productInfItem, productInfIndex) => {
                              if (
                                productInfItem.id === shoppingcartInfItem.id
                              ) {
                                productWasAlreadyExist = true;
                                const productNewNumber =
                                  productsInformations[productInfIndex].number +
                                  parseInt(shoppingcartInfItem.number);
                                productsInformations[productInfIndex].number =
                                  productNewNumber;
                                window.localStorage.setItem(
                                  "productsInformations",
                                  JSON.stringify(productsInformations)
                                );
                              }
                            }
                          );
                          if (!productWasAlreadyExist) {
                            const newShoppingProduct = {
                              name: shoppingcartInfItem.name,
                              price: shoppingcartInfItem.price,
                              number: parseInt(shoppingcartInfItem.number),
                              id: shoppingcartInfItem.id,
                            };
                            productsInformations.push(newShoppingProduct);

                            window.localStorage.setItem(
                              "productsInformations",
                              JSON.stringify(productsInformations)
                            );
                          }

                          shoppingCartInformations.splice(
                            shoppingCartInfIndex,
                            1
                          );
                          window.localStorage.setItem(
                            "shoppingCartInformations",
                            JSON.stringify(shoppingCartInformations)
                          );
                          if (shoppingCartInformations.length === 0) {
                            setShoppingCartEmpty("block");
                          }

                          document.getElementById(
                            `x${shoppingcartInfItem.id}`
                          ).style.display = "none";
                        }}
                        
                        color="success"
                        id="button"
                        variant="contained"
                        size="small"
                        sx={{ fontSize: "medium" }}
                      >
                        حذف
                      </Button>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </>
    );
  }
  function HeaderItems() {
    return (
      <>
        <div className="headerOuterContainer">
          <div className="headerInnerContainer">
            <div className="headerNav">
              <nav>
                <div className="headerNavItemsContainer">
                  <li className="headerNavItems">
                    <Link to={"/"}>
                      <Button
                        variant="text"
                        sx={{ fontSize: "1em", color: "black" }}
                      >
                        خانه
                        <FaHome
                          style={{ paddingRight: "5px", fontSize: "1.5em" }}
                        />
                      </Button>
                    </Link>
                  </li>
                  <li className="headerNavItems">
                    <Button
                      onClick={openTheSoppingCart}
                      sx={{ fontSize: "1em", color: "black" }}
                    >
                      مشاهده سبد خرید
                      <FaShoppingCart
                        style={{ paddingRight: "5px", fontSize: "1.5em" }}
                      />
                    </Button>
                    <ShoppingCartComponnent />
                  </li>
                </div>
              </nav>
            </div>
            <h1 className="headerTitle">{pageTitle}</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <header>
        <HeaderItems />
      </header>
    </>
  );
}

function App({ pageTitle }) {
  return (
    <>
      <Header pageTitle={pageTitle} />
    </>
  );
}

export default App;
