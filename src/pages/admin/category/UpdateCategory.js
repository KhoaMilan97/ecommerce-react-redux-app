import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCategory, getCategory } from "../../../functions/category";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";

function UpdateCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const { slug } = useParams();

  useEffect(() => {
    getCategory(slug).then((c) => setName(c.data.name));
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated.`);
        history.push("/admin/category");
      })
      .catch((err) => {
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
          <h4>Update Category pages</h4>
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

export default UpdateCategory;
