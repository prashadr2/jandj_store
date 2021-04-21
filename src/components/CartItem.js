import React from "react";
import ProductItem from "./ProductItem";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;

  let handleChange = (event) => {
    // props.cartmain[props.cartKey].amount = event.target.value;
    // props.cartItem.amount = event.target.value
    props.changeQuantity(cartKey, event.target.value);
    if(event.target.value === "0"){
      props.removeFromCart(cartKey);
    }
    console.log(event.target.value)
  }

  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            {/*<figure className="image"> USE THIS TO MAKE THE CART LOOK LIKE THE PRODUCTS PAGE!!!!*/} 
            <figure className="image is-64x64">
              <img
                // src="https://bulma.io/images/placeholders/128x128.png"
                width="214"
                height="320"
                src={"/images/" + product.imgname + ".png"}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            <div>Special Instructions: {cartItem.specialinstruction}</div>
            {/*need to checkout with the cart array, each cartItem holds a special instrucitons val, NOT THE PRODUCTS*/}
            <small>{`${amount} in cart`}</small>
          </div>
          <div>
          <input
                  className="input"
                  id="cartquant"
                  type="number"
                  defaultValue={amount}
                  min="0"
                  max="99"
                  onChange={handleChange}
                />
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;