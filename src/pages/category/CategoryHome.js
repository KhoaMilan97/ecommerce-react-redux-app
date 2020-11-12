import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

function CategoryHome() {
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
      //   console.log(JSON.stringify(res.data, null, 4));
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      {loading ? (
        <h4 className="jumbotron p-3 mt-5 mb-5 text-center">Loading...</h4>
      ) : (
        <h4 className="jumbotron p-3 mt-5 mb-5 text-center">
          {products.length} Products in "{category.name}" category
        </h4>
      )}
      <div className="row">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CategoryHome;
