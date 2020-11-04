import React from "react";

function CategoryForm(props) {
  const { handleSubmit, setName, name, loading } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          autoFocus
          required
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        {loading ? "Loading... " : "Save"}
      </button>
    </form>
  );
}

export default CategoryForm;
