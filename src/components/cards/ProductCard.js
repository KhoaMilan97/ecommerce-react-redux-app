import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";

import laptop from "../../images/laptop.png";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

function ProductCard({ product }) {
  const { title, description, images, slug, price, _id, quantity } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      const itemExisting = cart.find(
        // find trả về giá trị đầu tiên tìm thấy
        (product) => product._id === _id
      );

      if (itemExisting) {
        return;
      }

      cart.push({
        ...product,
        count: 1,
      });

      const unique = _.uniqWith(cart, _.isEqual);
      //console.log(unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  return (
    <>
      {product && product.rating && product.rating.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3 text-primary">No rating yet</div>
      )}
      <Card
        cover={
          <img
            alt={title}
            src={images && images.length ? images[0].url : laptop}
            style={{ height: 150, objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" /> <br />
            View Product
          </Link>,
          <Tooltip title={product.quantity < 1 ? "Out of stock" : tooltip}>
            <button
              onClick={handleAddToCart}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              disabled={quantity < 1}
            >
              <ShoppingCartOutlined className="text-success" />
              <br />
              {quantity < 1 ? "Out of stock" : "Add to Cart"}
            </button>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substr(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard;
