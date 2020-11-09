import React from "react";
import { Select } from "antd";

const { Option } = Select;

function ProductUpdateForm({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  subOptions,
  categories,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
  loading,
}) {
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    color,
    colors,
    brand,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          value={shipping === "Yes" ? "Yes" : "No"}
          onChange={handleChange}
          className="form-control"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          onChange={handleChange}
          className="form-control"
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          onChange={handleChange}
          className="form-control"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Select Category</label>
        {JSON.stringify(selectedCategory)}
        <select
          name="category"
          value={selectedCategory ? selectedCategory : category._id}
          className="form-control"
          onChange={handleCategoryChange}
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Subs Category</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
      <button className="btn btn-outline-info" type="submit">
        {loading ? "loading..." : "Save"}
      </button>
    </form>
  );
}

export default ProductUpdateForm;
