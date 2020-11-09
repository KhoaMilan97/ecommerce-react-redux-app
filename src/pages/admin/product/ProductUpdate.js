import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getProduct, updateProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories, getSubsCategory } from "../../../functions/category";

import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
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

function ProductUpdate() {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const loadProduct = useCallback(() => {
    getProduct(slug).then((res) => {
      setValues((prev) => ({ ...prev, ...res.data }));
      // load sub options
      getSubsCategory(res.data.category._id).then((res) =>
        setSubOptions(res.data)
      );
      // get subs id array
      let arr = [];
      res.data.subs.map((s) => arr.push(s._id));
      setArrayOfSubs((prev) => arr);
    });
  }, [slug]);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [loadProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setValues({
      ...values,
      subs: [],
    });
    setSelectedCategory(value);
    getSubsCategory(value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err));
    setArrayOfSubs([]);
    if (values.category._id === value) {
      loadProduct();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.category = selectedCategory ? selectedCategory : values.category;
    values.subs = arrayOfSubs;
    updateProduct(slug, values, user.token)
      .then((res) => {
        toast.success(`${res.data.title} is updated.`);
        setLoading(false);
        history.push("/admin/products");
      })
      .catch((err) => {
        toast.error(err.response.data.err);
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              loading={loading}
            />
          </div>

          <ProductUpdateForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            categories={categories}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
