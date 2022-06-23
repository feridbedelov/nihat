import React, { Component } from "react";
import classes from "./Minicart.module.css";
import { withRouter } from "react-router-dom";

class MinicartComponent extends Component {
  handleClick = () => {
    this.props.history.push("/cart");
  };

  render() {
    const total = this.props.cart?.reduce((cartTotal, cartItem) => {
      const price = cartItem?.prices?.find(
        (priceItem) =>
          priceItem?.currency?.label === this.props.selectedCurrency
      );
      cartTotal += cartItem.count * price.amount;
      return cartTotal;
    }, 0);

    return (
      <>
        <div className={classes.minicart}>
          <div className={classes.wrapper}>
            <p className={classes.heading}>
              <span>My Bag, </span>
              <span>{this.props.cart.length} items</span>
            </p>
            <div className={classes.all__products}>
              {this.props.cart.length ? (
                this.props.cart.map((cartItem) => {
                  const price = cartItem?.prices?.find(
                    (priceItem) =>
                      priceItem?.currency?.label === this.props.selectedCurrency
                  );
                  return (
                    <div className={classes.item__row}>
                      <div className={classes.item__left}>
                        <p className={classes.item__name}>
                          {cartItem.name} {cartItem.brand}
                          {/* <span className="item__type">Running Short</span> */}
                        </p>
                        <div className={classes.item__price}>
                          {price?.currency?.symbol} {price?.amount}
                        </div>
                        <div className={classes.item__sizes}>
                          <button>S</button>
                          <button>M</button>
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
                            // className={classes.item__image}
                            src={cartItem?.gallery[0]}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span className={classes.emptyCard__message}>
                  Your card is empty
                </span>
              )}
            </div>
          </div>
          <div
            className={`${classes.item__row} ${classes.bottom__sections}`}
            style={{ borderTop: "1px solid #00000029" }}
          >
            <div className={classes.item__left}>Total</div>
            <div className={classes.item__right}>
              {this.props.selectedCurrency} {total?.toFixed(2)}
            </div>
          </div>
          <div className={`${classes.item__row} ${classes.bottom__sections}`}>
            <div className={classes.item__left}>
              <button
                className={classes.viewBag__btn}
                onClick={() => {
                  this.props.toggle();
                  this.handleClick();
                }}
              >
                View Bag
              </button>
            </div>
            <div className={classes.item__right}>
              <button
                className={classes.checkOut__btn}
                onClick={() =>
                  this.props.cart.length
                    ? alert("You successfully checked it out")
                    : alert(
                        "You must choose some products before checking them out"
                      )
                }
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
        <div className={classes.backdrop} onClick={this.props.toggle}></div>
      </>
    );
  }
}

export const MiniCart = withRouter(MinicartComponent);
