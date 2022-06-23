import React, { Component, Fragment } from "react";
import classes from "./Cart.module.css";

export default class Cart extends Component {
  render() {
    const total = this.props.cart?.reduce((cartTotal, cartItem) => {
      const price = cartItem?.prices?.find(
        (priceItem) =>
          priceItem?.currency?.label === this.props.selectedCurrency
      );
      cartTotal += cartItem.count * price.amount;
      return cartTotal;
    }, 0);

    const tax = (total * 21) / 100;

    const totalWithTax = tax + total;

    return (
      <div className={classes.cart}>
        <div className={classes.wrapper}>
          <h2 className={classes.heading}>Cart</h2>
          <div className={classes.all__products}>
            <hr />
            {this.props.cart.length ? (
              this.props.cart.map((cartItem) => {
                const price = cartItem?.prices?.find(
                  (priceItem) =>
                    priceItem?.currency?.label === this.props.selectedCurrency
                );
                return (
                  <Fragment key={cartItem.id}>
                    <div className={classes.item__row}>
                      <div className={classes.item__left}>
                        <p className={classes.item__name}>
                          {cartItem.brand} {cartItem.name}
                        </p>
                        <div className={classes.item__price}>
                          {price?.currency?.symbol} {price?.amount}
                        </div>
                        <div className={classes.item__sizes}>
                          <button>S</button>
                        </div>
                      </div>
                      <div className={classes.item__right}>
                        <div className={classes.item__counter}>
                          <button
                            onClick={() => this.props.editItem(cartItem, 1)}
                          >
                            +
                          </button>
                          <div>{cartItem.count}</div>
                          <button
                            onClick={() => this.props.editItem(cartItem, -1)}
                          >
                            -
                          </button>
                        </div>
                        <div className={classes.item__image}>
                          <img
                            alt={cartItem.name}
                            src={cartItem?.gallery?.[0]}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                );
              })
            ) : (
              <h2 className={classes.emptyCard__message}>Your cart is empty</h2>
            )}
          </div>
          {!!this.props.cart.length && (
            <div className={classes.cart__bottom}>
              <div>
                <span>Tax 21%:</span>
                <span>
                  {this.props.selectedCurrency} {tax.toFixed(2)}
                </span>
              </div>
              <div>
                <span>Quantity:</span>
                <span>{this.props.cart.length}</span>
              </div>
              <div>
                <span>Total:</span>
                <span>
                  {this.props.selectedCurrency} {totalWithTax.toFixed(2)}
                </span>
              </div>
              <button onClick={() => alert("YOUR ORDER ACCEPTED")}>
                Order
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
