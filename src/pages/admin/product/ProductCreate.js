import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import { createProduct } from "../../../functions/product";

import AdminNav from "../../../components/nav/AdminNav";
import { getCategories, getSubsCategory } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
// import CategoryForm from "../../../components/forms/CategoryForm";
// import LocalSearch from "../../../components/forms/LocalSearch";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  images: [],
  shipping: "",
  quantity: "",
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  color: "",
  brands: ["Apple", "Microsoft", "Dell", "Lenovo", "ASUS"],
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getCategories().then((c) =>
      setValues((v) => {
        return {
          ...v,
          categories: c.data,
        };
      })
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Category clicked", e.target.value);
    const { value } = e.target;
    setValues({
      ...values,
      subs: [],
      category: value,
    });
    getSubsCategory(value)
      .then((res) => {
        console.log(res.data);
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err));
    setShowSubs(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created.`);
        window.location.reload();
      })
      .catch((err) => {
        // if (err.response.status === 400) {
        //   toast.error(err.response.data);
        // }
        toast.error(err.response.data.err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <div>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            values={values}
            showSubs={showSubs}
            subOptions={subOptions}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
