import React from "react";

import TextareaAutosize from 'react-textarea-autosize';

const ProductItem = props => {
  const { product } = props;

  let tmpspecial = "";

  const handleChange = (event) => {
    tmpspecial = event.target.value;
  }


  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image">
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
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                    specialinstruction: tmpspecial
                  })
                }
              >
                Add to Cart
              </button>
              <TextareaAutosize
              //this input is in the button div, maybe make a seperate div if we want to fill out the card?
                  className="input"
                  type="text"
                  placeholder="Special Instructions (can customize names, colors, etc for each item)"
                  maxRows="9"
                  onChange={handleChange}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;