import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete the registration`
    );

    window.localStorage.setItem("emailRegistration", email);
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Register</h1>

          {registerForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
