import React from "react";

function ShowPaymentInfo({ order, showStatus = true }) {
  let {
    id,
    amount,
    currency,
    payment_method_types,
    created,
    status,
  } = order.paymentIntent;
  const { orderStatus } = order;

  return (
    <div className="mb-2">
      <span>Order Id: {id}</span> {" / "}
      <span>
        Amount:{" "}
        {(amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      <span>Currency: {currency.toUpperCase()}</span> {" / "}
      <span>Method: {payment_method_types[0]}</span> {" / "}
      <span>Payment: {status.toUpperCase()}</span> {" / "}
      <span>Order On: {new Date(created * 1000).toLocaleString()}</span> {" / "}
      {showStatus && (
        <span className="badge bg-success text-light">
          STATUS: {orderStatus}
        </span>
      )}{" "}
    </div>
  );
}

export default ShowPaymentInfo;
