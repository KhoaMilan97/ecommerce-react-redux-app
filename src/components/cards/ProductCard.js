import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import laptop from "../../images/laptop.png";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

function ProductCard({ product }) {
  const { title, description, images, slug } = product;
  return (
    <>
      {product && product.rating && product.rating.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        cover={
          <img
            alt={title}
            src={images && images.length ? images[0].url : laptop}
            style={{ height: 150, objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" /> <br />
            View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-success" />
            <br />
            Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substr(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard;
