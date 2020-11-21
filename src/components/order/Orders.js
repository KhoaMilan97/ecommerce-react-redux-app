import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function Orders({ orders, handleStatusChange }) {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p) => (
          <tr key={p.product._id}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined className="text-success" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <>
      {orders.map((order) => (
        <div className="row pb-5" key={order._id}>
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />
            <div className="row">
              <div className="col-md-4">Delivery status</div>
              <div className="col-md-8">
                <select
                  name="status"
                  className="form-control"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  defaultValue={order.orderStatus}
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
}

export default Orders;
