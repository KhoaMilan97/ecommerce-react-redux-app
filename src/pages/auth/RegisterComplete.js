import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { updateOrCreateUser } from "../../functions/auth";
import { useDispatch } from "react-redux";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const currentEmail = window.localStorage.getItem("emailRegistration");
    setEmail(currentEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailRegistration");
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        updateOrCreateUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
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
          })
          .catch((err) => console.log(err));
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="email" className="form-control" value={email} disabled />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />
      </div>

      <br />
      <button type="submit" className="btn btn-raised">
        complete registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {registrationForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
