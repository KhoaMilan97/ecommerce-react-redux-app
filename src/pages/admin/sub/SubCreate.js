import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

function SubCreate() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((c) => setSubs(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created.`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
        setLoading(false);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("You want delete?")) {
      removeSub(slug, user.token)
        .then((res) => {
          toast.success(`${res.data.name} removed.`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Create Sub Category pages</h4>
          <div className="form-group">
            <label>Select Category</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <CategoryForm
            name={name}
            handleSubmit={handleSubmit}
            setName={setName}
            loading={loading}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((s) => (
            <div key={s._id} className="alert alert-secondary">
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm btn-danger float-right"
              >
                <DeleteOutlined />
              </span>
              <span className="btn btn-sm btn-warning float-right">
                <Link to={`/admin/sub/${s.slug}`} className="text-warning">
                  <EditOutlined />
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubCreate;
