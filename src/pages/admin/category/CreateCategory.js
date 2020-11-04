import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

function CreateCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created.`);
        loadCategories();
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
      removeCategory(slug, user.token)
        .then((res) => {
          toast.success(`${res.data.name} removed.`);
          loadCategories();
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
          <h4>Create Category pages</h4>
          <CategoryForm
            name={name}
            handleSubmit={handleSubmit}
            setName={setName}
            loading={loading}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {categories.filter(searched(keyword)).map((c) => (
            <div key={c._id} className="alert alert-secondary">
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm btn-danger float-right"
              >
                <DeleteOutlined />
              </span>
              <span className="btn btn-sm btn-warning float-right">
                <Link to={`/admin/category/${c.slug}`} className="text-warning">
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

export default CreateCategory;
