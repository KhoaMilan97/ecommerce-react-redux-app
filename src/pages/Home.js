import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";

import { getProductsByCount } from "../functions/product";
import Jumbotron from "../components/cards/Jumbotron";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(false);
    getProductsByCount(3)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <>
      <div className="jumbotron text-center text-danger h1 font-weight-bold">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
