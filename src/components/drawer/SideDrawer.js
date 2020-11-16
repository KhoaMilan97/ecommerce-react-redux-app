import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";

import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";

function SideDrawer() {
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const imgStyles = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      title={`Cart / ${cart.length} Products`}
      className="text-center"
      onClose={() =>
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        })
      }
      visible={drawer}
    >
      <div className="row">
        {cart.length &&
          cart.map((p) => (
            <div className="col-md-12 mt-2" key={p._id}>
              {p.images[0] ? (
                <>
                  <img src={p.images[0].url} alt={p.title} style={imgStyles} />
                  <p className="text-center bg-secondary text-light">{`${p.title} x ${p.count}`}</p>
                </>
              ) : (
                <>
                  <img src={laptop} alt={p.title} style={imgStyles} />
                  <p className="text-center bg-secondary text-light">{`${p.title} x ${p.count}`}</p>
                </>
              )}
            </div>
          ))}
      </div>
      <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="btn btn-primary btn-raised btn-block"
        >
          Go to cart
        </button>
      </Link>
    </Drawer>
  );
}

export default SideDrawer;
