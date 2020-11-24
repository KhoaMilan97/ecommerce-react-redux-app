import React, { useEffect, useState, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Spin } from "antd";

import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

const Header = React.lazy(() => import("./components/nav/Header"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const RegisterComplete = React.lazy(() =>
  import("./pages/auth/RegisterComplete")
);
const Home = React.lazy(() => import("./pages/Home"));
const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));
const UserRoute = React.lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = React.lazy(() => import("./components/routes/AdminRoute"));
const History = React.lazy(() => import("./pages/user/History"));
const Password = React.lazy(() => import("./pages/user/Password"));
const Wishlist = React.lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const CreateCategory = React.lazy(() =>
  import("./pages/admin/category/CreateCategory")
);
const UpdateCategory = React.lazy(() =>
  import("./pages/admin/category/UpdateCategory")
);
const SubCreate = React.lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = React.lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = React.lazy(() =>
  import("./pages/admin/product/ProductCreate")
);
const AllProducts = React.lazy(() =>
  import("./pages/admin/product/AllProducts")
);
const ProductUpdate = React.lazy(() =>
  import("./pages/admin/product/ProductUpdate")
);
const Product = React.lazy(() => import("./pages/Product"));
const CategoryHome = React.lazy(() => import("./pages/category/CategoryHome"));
const SubHome = React.lazy(() => import("./pages/sub/SubHome"));
const Shop = React.lazy(() => import("./pages/Shop"));
const Cart = React.lazy(() => import("./pages/Cart"));
const SideDrawer = React.lazy(() => import("./components/drawer/SideDrawer"));
const CheckOut = React.lazy(() => import("./pages/CheckOut"));
const CreateCoupon = React.lazy(() =>
  import("./pages/admin/coupon/CreateCoupon")
);
const Payment = React.lazy(() => import("./pages/Payment"));

function App() {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.email,
                token: idTokenResult.token,
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            setPending(false);
          })
          .catch((err) => {
            setPending(false);
            console.log(err);
          });
      } else {
        setPending(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (pending) {
    return (
      <div className="example">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="col text-center pt-5">
          __MERN <LoadingOutlined /> ECOMMERCE__
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        <UserRoute exact path="/user/history">
          <History />
        </UserRoute>
        <UserRoute exact path="/user/password">
          <Password />
        </UserRoute>
        <UserRoute exact path="/user/wishlist">
          <Wishlist />
        </UserRoute>
        <UserRoute exact path="/checkout">
          <CheckOut />
        </UserRoute>
        <UserRoute exact path="/payment">
          <Payment />
        </UserRoute>

        <AdminRoute exact path="/admin/dashboard">
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute exact path="/admin/category">
          <CreateCategory />
        </AdminRoute>
        <AdminRoute exact path="/admin/category/:slug">
          <UpdateCategory />
        </AdminRoute>
        <AdminRoute exact path="/admin/sub">
          <SubCreate />
        </AdminRoute>
        <AdminRoute exact path="/admin/sub/:slug">
          <SubUpdate />
        </AdminRoute>
        <AdminRoute exact path="/admin/product">
          <ProductCreate />
        </AdminRoute>
        <AdminRoute exact path="/admin/products">
          <AllProducts />
        </AdminRoute>
        <AdminRoute exact path="/admin/product/:slug">
          <ProductUpdate />
        </AdminRoute>
        <AdminRoute exact path="/admin/coupon">
          <CreateCoupon />
        </AdminRoute>
      </Switch>
    </Suspense>
  );
}

export default App;
// 19.7
