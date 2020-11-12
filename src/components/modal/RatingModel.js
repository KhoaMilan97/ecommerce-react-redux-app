import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

function RatingModel({ children }) {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setShowModal(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave Rating"
        visible={showModal}
        onOk={() => {
          setShowModal(false);
          toast("Thanks for your review. It will appear soon.");
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
}

export default RatingModel;
