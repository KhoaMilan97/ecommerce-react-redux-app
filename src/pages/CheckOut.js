import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

import {
  getUserCart,
  removeUserCart,
  saveUserAddress,
} from "../functions/user";

function CheckOut() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  const removeCartItem = () => {
    // remove from localstorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // remove from db
    removeUserCart(user.token).then((res) => {
      console.log(res);
      // remove from local state
      setProducts([]);
      setTotal(0);
      toast("Cart is empty. Continue to shopping.");
    });
  };

  const saveAddrressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    });
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <ReactQuill value={address} onChange={setAddress} theme="snow" />
          <button onClick={saveAddrressToDb} className="btn btn-primary">
            Save
          </button>
          <hr />
          <h4>Got Counpon?</h4>
          <p>coupon input apply button</p>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>{products.length} Products </p>
          <hr />
          {products.map((p) => (
            <div key={p._id}>
              <p>
                {p.product.title} ({p.color}) x {p.count} = {p.count * p.price}
              </p>
            </div>
          ))}
          <hr />
          <p> Cart total ${total}</p>
          <br />
          <div className="row">
            <div className="col-md-6">
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
              >
                Place Holder
              </button>
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                className="btn btn-primary"
                onClick={removeCartItem}
              >
                Empty cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
