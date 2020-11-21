import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getOrders, changeStatus } from "../../functions/admin";
import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/order/Orders";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  const loadAllOrders = useCallback(() => {
    getOrders(user.token).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, [user.token]);

  useEffect(() => {
    loadAllOrders();
  }, [loadAllOrders]);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadAllOrders();
    });
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
