import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../../functions/category";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const showCategories = () =>
    categories.map((category) => (
      <button
        key={category._id}
        className="col btn btn-outlined-primary btn-lg btn-raised btn-block m-3"
      >
        <Link
          to={`/category/${category.slug}`}
          className="text-center"
          style={{ width: "100%", display: "block" }}
        >
          {category.name}
        </Link>
      </button>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
}

export default CategoryList;
