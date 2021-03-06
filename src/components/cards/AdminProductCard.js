import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import laptop from "../../images/laptop.png";

const { Meta } = Card;

function AdminProductCard({ product, handleRemove }) {
  const { title, description, images, slug } = product;
  return (
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
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substr(0, 40)}...`}
      />
    </Card>
  );
}

export default AdminProductCard;
