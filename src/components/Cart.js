import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";

import Paypal from "./Paypal";

const gettotals = (cart,cartKeys) => {
  let rval = 0.0;
  cartKeys.map(key => (rval += (cart[key].amount * cart[key].product.price)))
  return Number(rval.toFixed(2));
}

const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">My Cart (${gettotals(cart,cartKeys)})</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
                changeQuantity={props.context.changeQuantity}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-left">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning "
                >
                  Clear cart
                </button>
              </div>
              <div className ="is-pulled-right">
              {/*<script src="https://www.paypal.com/sdk/js?client-id=PRODUCTION_CLIENT_ID" />*/}
              <Paypal 
              total={gettotals(cart,cartKeys)} 
              incart={cart}
              incartkeys={cartKeys}
              checkout={props.context.checkout}
              />
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);