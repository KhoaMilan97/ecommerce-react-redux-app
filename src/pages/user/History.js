import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";

import UserNav from "../../components/nav/UserNav";
import { getOrders } from "../../functions/user";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";

function History() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadOrders = () =>
      getOrders(user.token).then((res) => {
        //console.log(res.data);
        setOrders(res.data);
      });
    loadOrders();
  }, [user.token]);

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

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      className="btn btn-sm btn-block btn-outline-primary"
      fileName="invoice.pdf"
    >
      Download Link
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.map((order) => (
      <div key={order._id} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No orders purchase"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}

export default History;
