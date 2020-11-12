import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, productStar, getRelated } from "../functions/product";

function Product() {
  const [product, setproduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const user = useSelector((state) => state.user);

  const loadSingleProduct = useCallback(() => {
    getProduct(slug)
      .then((res) => {
        setproduct(res.data);
        getRelated(res.data._id).then((res) => {
          setRelated(res.data);
        });
      })
      .catch((err) => console.log(err));
  }, [slug]);

  useEffect(() => {
    loadSingleProduct();
  }, [loadSingleProduct]);

  useEffect(() => {
    if (product.rating && user) {
      const existingStar = product.rating.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      existingStar && setStar(existingStar.star);
    }
  }, [product.rating, user]);

  const clickedRating = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        console.log("rating cliked", res.data);
        loadSingleProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SingleProduct
          product={product}
          clickedRating={clickedRating}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Product</h4>
          <hr />
        </div>
      </div>
      <div className="row">
        {related.length ? (
          related.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="col mb-5 text-center">No product found</div>
        )}
      </div>
    </div>
  );
}

export default Product;
