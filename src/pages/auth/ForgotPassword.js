import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

const linkPasswordRedirect =
  process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT ||
  "https://mern-ecommerce-react-redux.herokuapp.com/login";

function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: linkPasswordRedirect,
      handleCodeInApp: true,
    };

    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link.");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("Forgot Password Error", error);
      });
  };

  return (
    <div className="container col-md-6 offset-top-3 p-5">
      <form onSubmit={handleSubmit}>
        <h4>Forgot Password</h4>
        <input
          type="email"
          value={email}
          placeholder="Type your email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-raised" disabled={!email}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
