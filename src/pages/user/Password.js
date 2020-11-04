import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import UserNav from "../../components/nav/UserNav";

function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Passoword Updated");
        setPassword("");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const PasswordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          disabled={loading}
        />
      </div>
      <button
        disabled={password.length < 6 || loading}
        type="submit"
        className="btn btn-primary"
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-6 offset-2">
          <h4 className="mt-2">Update Password</h4>
          {PasswordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Password;
