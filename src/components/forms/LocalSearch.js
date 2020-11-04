import React from "react";

function LocalSearch({ keyword, setKeyword }) {
  const handleChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        className="form-control mb-4"
        placeholder="Filter"
      />
    </>
  );
}

export default LocalSearch;
