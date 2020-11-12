import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { Pagination } from "antd";

import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    let isCanceled = false;
    const loadAllProducts = () => {
      setLoading(true);
      getProducts("sold", "desc", page)
        .then((res) => {
          if (!isCanceled) {
            setProducts(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    loadAllProducts();

    return () => {
      isCanceled = true;
    };
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <>
      {productsCount}
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center p-3 pt-5">
            <Pagination
              current={page}
              onChange={(value) => setPage(value)}
              total={(productsCount / 3) * 10}
            />
          </nav>
        </div>
      </div>
    </>
  );
}

export default BestSellers;
