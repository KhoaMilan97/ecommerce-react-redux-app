import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        shape="round"
        icon={<MailOutlined />}
        size="large"
        block
        disabled={!email || password.length < 6}
        loading={loading}
      >
        {loading ? "Loading..." : "Login with email/password"}
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            block
          >
            Login with google
          </Button>
          <Link to="/forgot/password" className="text-danger float-right">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
