import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MainWithRouter } from "./pages/Main";
import Cart from "./components/Cart/Cart";
import { ProductDetailsWithRouter } from "./components/ProductDetails";
import Navbar from "./components/Navbar/Navbar";

export default class App extends React.Component {
  state = {
    selectedCurrency: null,
    cart: [],
  };

  handleChangeCurrency = (selectedCurrency) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedCurrency,
    }));
  };

  componentDidMount() {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);

      this.setState((prevState) => ({
        ...prevState,
        cart: parsedCart,
      }));
    }
  }

  editItem = (item, count) => {
    let cartCopy = [...this.state.cart];

    let existentItem = cartCopy.find((cartItem) => cartItem?.generatedCartId === item?.generatedCartId);

    if (!existentItem) {
      existentItem = {
        ...item,
        count: 1,
      };
      cartCopy.push(existentItem);
    } else {
      existentItem.count += count;
      cartCopy = cartCopy.map((cartItem) => {
        if (cartItem?.generatedCartId === existentItem?.generatedCartId) {
          return existentItem;
        } else {
          return cartItem;
        }
      });
    }

    if (existentItem.count <= 0) {
      cartCopy = cartCopy.filter((cartItem) => cartItem?.generatedCartId !== item?.generatedCartId);
    }

    this.setState((prevState) => ({
      ...prevState,
      cart: cartCopy,
    }));

    localStorage.setItem("cart", JSON.stringify(cartCopy));
  };

  render() {
    return (
      <BrowserRouter>
        <>
          <Navbar
            selectedCurrency={this.state.selectedCurrency}
            handleChangeCurrency={this.handleChangeCurrency}
            editItem={this.editItem}
            cart={this.state.cart}
          />
          <Switch>
            <Route path="/cart">
              <Cart
                selectedCurrency={this.state.selectedCurrency}
                handleChangeCurrency={this.handleChangeCurrency}
                editItem={this.editItem}
                cart={this.state.cart}
              />
            </Route>
            <Route path="/details/:productId">
              <ProductDetailsWithRouter
                selectedCurrency={this.state.selectedCurrency}
                editItem={this.editItem}
              />
            </Route>
            <Route path="/">
              <MainWithRouter
                selectedCurrency={this.state.selectedCurrency}
                editItem={this.editItem}
              />
            </Route>
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}
