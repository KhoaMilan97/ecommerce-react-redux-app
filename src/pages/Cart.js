import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

import { userCart } from "../functions/user";

function Cart() {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log(err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Count</th>
          <th>Shipping</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((c) => (
          <ProductCardInCheckout cart={c} key={c._id} />
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>
          {cart.length ? (
            showCartItems()
          ) : (
            <p>
              No products in cart. <Link to="/shop">Continue to shopping</Link>
            </p>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c) => (
            <p key={c._id}>
              {c.title} x {c.count} = ${c.count * c.price}
            </p>
          ))}
          <hr />
          <p>
            Total: <b>${getTotal()}</b>
          </p>
          <hr />
          {user ? (
            <button
              disabled={!cart.length}
              className="btn btn-sm btn-primary mt-2"
              onClick={saveOrderToDb}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
