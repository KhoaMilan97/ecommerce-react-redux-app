import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css"; // ES6

import {
  getUserCart,
  removeUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";

function CheckOut() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

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
      setTotalAfterDiscount(0);
      setCoupon("");
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

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill value={address} onChange={setAddress} theme="snow" />
      <button onClick={saveAddrressToDb} className="btn btn-primary">
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p) => (
      <div key={p._id}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = {p.count * p.price}
        </p>
      </div>
    ));

  const showAppyCoupon = () => (
    <>
      <input
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        type="text"
        className="form-control"
      />
      <button
        onClick={applyDiscountCoupon}
        className="mt-2 btn btn-outline-primary"
      >
        Apply
      </button>
    </>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          {showAddress()}
          <hr />
          <h4>Got Counpon?</h4>
          {showAppyCoupon()}
          <br />
          {discountError && (
            <p className="bg-danger text-light p-2">{discountError}</p>
          )}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>{products.length} Products </p>
          <hr />
          {showProductSummary()}
          <hr />
          <p> Cart total ${total}</p>
          <br />
          {totalAfterDiscount > 0 && (
            <p className="bg-success text-light p-2">
              Discount Applied: Total Payable: ${totalAfterDiscount}
            </p>
          )}
          <br />
          <div className="row">
            <div className="col-md-6">
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
                onClick={() => history.push("/payment")}
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
