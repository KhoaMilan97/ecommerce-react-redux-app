import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import laptop from "../../images/laptop.png";

const { Meta } = Card;

function AdminProductCard({ product }) {
  const { title, description, images } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          alt={title}
          src={images && images.length ? images[0].url : laptop}
          style={{ height: 150, objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined className="text-danger" />,
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
