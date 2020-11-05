import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { useHistory, useParams } from "react-router-dom";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";

function SubUpdate() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  //   const [sub, setSub] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [category, setCategory] = useState("");
  const [parent, setParent] = useState("");
  const history = useHistory();
  const { slug } = useParams();

  useEffect(() => {
    loadCategories();
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
  }, [slug]);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated.`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Updated Sub Category pages</h4>
          <div className="form-group">
            <label>Select Category</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
              value={parent}
            >
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
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
