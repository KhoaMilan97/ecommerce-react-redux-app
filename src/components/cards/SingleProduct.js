import React from "react";
import { Card, Tabs } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";

import laptop from "../../images/laptop.png";
import ProductListItem from "./ProductListItem";
import RatingModel from "../modal/RatingModel";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;

function SingleProduct({ product, clickedRating, star }) {
  const { title, images, description, _id } = product;
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
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add To Cart
            </>,
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
