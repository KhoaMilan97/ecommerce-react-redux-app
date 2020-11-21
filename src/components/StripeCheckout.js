import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

import { createPaymentIndent } from "../functions/stripe";
import { createOrder, removeUserCart } from "../functions/user";
import laptop from "../images/laptop.png";

function StripeCheckout() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    createPaymentIndent(coupon, user.token).then((res) => {
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, [user.token, coupon]);

  const handleChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here u get result after successful payment
      // create order and save in database to admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // remove cart from localstorage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // remove cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // remove cart from db
          removeUserCart(user.token);
        }
      });

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount > 0 ? (
            <p className="alert alert-success">
              Total after discount ${totalAfterDiscount}
            </p>
          ) : (
            <p className="alert alert-danger">No coupon appllied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              alt="stripe checkout"
              src={laptop}
              style={{ height: 200, objectFit: "cover" }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br />
              Total: ${cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br />
              Total Payable: ${(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {/* show error */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        {/* show success */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your.
          <Link to="/user/history"> See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
}

export default StripeCheckout;
