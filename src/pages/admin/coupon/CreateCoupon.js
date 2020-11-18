import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { DeleteOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";

import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../functions/coupon";
import AdminNav from "../../../components/nav/AdminNav";

function CreateCoupon() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const user = useSelector((state) => state.user);

  const loadAllCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, discount, expiry }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} is created.`);
        loadAllCoupons();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          toast(`${res.data.name} is removed.`);
          setLoading(false);
          loadAllCoupons();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>{loading ? "Loading..." : "Coupon"}</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label>Discount %</label>
              <input
                type="text"
                value={discount}
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Expiry</label>
              <br />
              <DatePicker
                selected={expiry}
                value={expiry}
                className="form-control"
                onChange={(date) => setExpiry(date)}
                required
                minDate={new Date()}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary ">
              {loading ? "Loading..." : "Save"}
            </button>
          </form>
          <br />
          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length > 0
                ? coupons.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>{`${c.discount}%`}</td>
                      <td>
                        <DeleteOutlined
                          onClick={() => handleRemove(c._id)}
                          className="text-danger pointer"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateCoupon;
