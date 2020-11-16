import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import laptop from "../../images/laptop.png";

function ProductCardInCheckout({ cart }) {
  const {
    title,
    price,
    brand,
    color,
    count,
    images,
    _id,
    quantity,
    shipping,
  } = cart;
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    if (typeof window !== "undefined") {
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.forEach((product, i) => {
          if (product._id === _id) {
            cart[i].color = e.target.value;
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    }
  };

  const handleCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > quantity) {
      toast.error(`Max available quantity: ${quantity}`);
      return;
    }
    if (typeof window !== "undefined") {
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.forEach((product, i) => {
          if (product._id === _id) {
            cart[i].count = count;
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    }
  };

  const hanldeRemove = () => {
    if (typeof window !== "undefined") {
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.forEach((product, i) => {
          if (product._id === _id) {
            cart.splice(i, 1);
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    }
  };

  return (
    <tr>
      <td>
        <div style={{ width: "100px", height: "auto" }}>
          {images.length ? (
            <ModalImage
              small={images[0].url}
              large={images[0].url}
              alt={title}
            />
          ) : (
            <ModalImage small={laptop} large={laptop} alt={title} />
          )}
        </div>
      </td>
      <td>{title}</td>
      <td>${price}</td>
      <td>{brand}</td>
      <td>
        <select className="form-control" onChange={handleSelectChange}>
          {color ? (
            <option value={color}>{color}</option>
          ) : (
            <option>Select Color</option>
          )}
          {colors
            .filter((c, i) => c !== color)
            .map((color) => (
              <option key={color}>{color}</option>
            ))}
        </select>
      </td>
      <td className="text-center">
        <input
          style={{ width: "50px" }}
          type="number"
          className="form-control"
          onChange={handleCountChange}
          value={count}
        />
      </td>
      <td className="text-center">
        {shipping === "Yes" ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        )}
      </td>
      <td className="text-center">
        <CloseOutlined
          className="text-danger"
          style={{ cursor: "pointer" }}
          onClick={hanldeRemove}
        />
      </td>
    </tr>
  );
}

export default ProductCardInCheckout;
