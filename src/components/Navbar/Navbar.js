import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../logo.png";
import basket from "../../shopping-cart.png";

import { CategoriesDocument } from "../../api/getCategories";
import { CurrenciesDocument } from "../../api/getCurrencies";
import { client } from "../../apolloClient";
import classes from "./Navbar.module.css";
import { MiniCart } from "../MiniCart/Minicart";

export default class Navbar extends React.Component {
  state = {
    categories: [],
    isMinicart: false,
    hidden: true,
  };

  toggleHidden = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  async componentDidMount() {
    try {
      const result = await client.query({
        query: CategoriesDocument,
      });
      const categories = result.data?.categories;
      if (categories?.length) {
        this.setState({
          categories,
        });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await client.query({
        query: CurrenciesDocument,
      });
      const currencies = result.data?.currencies;
      if (currencies?.length) {
        this.setState({
          currencies,
        });
        this.props.handleChangeCurrency(currencies?.[0]?.label);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const uri = window.location.href;
    let currentCategory = uri.split("=")[1];

    return (
      <nav>
        <ul>
          {this.state.categories?.map((category) => (
            <li key={category.name}>
              <NavLink
                key={category.id}
                exact
                className={`${
                  currentCategory === category.name && classes.active
                }`}
                to={`/?category=${category.name}`}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/">
          <img src={logo} alt='logo' />
        </Link>

        <div className={classes.navbar__right}>
          <div className={classes.price__wrapper}>
            <div className={classes.currencies}>
              <select
                defaultValue={this.props.selectedCurrency}
                onChange={(e) =>
                  this.props.handleChangeCurrency(e.target.value)
                }
              >
                {this.state.currencies?.map((currency) => (
                  <option key={currency.label} value={currency.label}>
                    {currency.symbol} {currency.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.basket} onClick={this.toggleHidden}>
              <img src={basket} alt='basket' />
              {!!this.props.cart.length && (
                <div className={classes.badge}>{this.props.cart.length}</div>
              )}
            </div>
          </div>

          {!this.state.hidden && (
            <MiniCart
              selectedCurrency={this.props.selectedCurrency}
              cart={this.props.cart}
              editItem={this.props.editItem}
              toggle={this.toggleHidden}
            />
          )}
        </div>
      </nav>
    );
  }
}
