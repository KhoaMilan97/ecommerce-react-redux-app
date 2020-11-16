import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import _ from "lodash";
import { useDispatch } from "react-redux";

import laptop from "../../images/laptop.png";
import ProductListItem from "./ProductListItem";
import RatingModel from "../modal/RatingModel";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;

function SingleProduct({ product, clickedRating, star }) {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      const itemExisting = cart.find(
        // find trả về giá trị đầu tiên tìm thấy
        (product) => product._id === _id
      );

      if (itemExisting) {
        return;
      }

      cart.push({
        ...product,
        count: 1,
      });
      const unique = _.uniqWith(cart, _.isEqual);
      //console.log(unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img alt="Carousel" src={i.url} key={i.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                alt={title}
                src={laptop}
                style={{ height: 450, objectFit: "cover" }}
                className="p-1"
              />
            }
          ></Card>
        )}
        <Tabs>
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            More...
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.rating && product.rating.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" />
                <br />
                Add to Cart
              </div>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add To Wish List
            </Link>,
            <RatingModel>
              <StarRatings
                rating={star}
                starRatedColor="red"
                changeRating={clickedRating}
                numberOfStars={5}
                name={_id}
                isSelectable={true}
              />
            </RatingModel>,
          ]}
        >
          <ProductListItem product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
