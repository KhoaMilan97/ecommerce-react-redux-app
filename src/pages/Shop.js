import React, { useState, useEffect, useRef } from "react";
import { Spin, Menu, Slider, Checkbox, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

function Shop() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  const [filterByPrice, setFilterByPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [brand, setBrand] = useState("");
  const [subs, setSubs] = useState([]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const brands = ["Apple", "Microsoft", "Dell", "Lenovo", "ASUS"];
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const search = useSelector((state) => state.search);
  const { text } = search;
  const dispatch = useDispatch();

  // using ref fixing missing price in useEffect
  const latestPrice = useRef();

  useEffect(() => {
    // ✅ make sure current always point to fresh value of price
    latestPrice.current = price;
  });

  // 1. Load products
  const loadingProducts = () => {
    getProductsByCount(12)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadingProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  // 2. Search by Text
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (text.length > 0) {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [text]);

  // 3. Search by Price
  const handleSlider = (value) => {
    setPrice(value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setColor("");
    setBrand("");
    setShipping("");

    setTimeout(() => {
      setFilterByPrice(filterByPrice + 1);
    }, 300);
  };

  useEffect(() => {
    if (filterByPrice) {
      fetchProducts({ price: latestPrice.current });
    }
  }, [filterByPrice]);

  // 4. Search By Category
  const handleCategory = (e) => {
    const inTheState = [...categoryIds];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked);

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setColor("");
    setBrand("");
    setShipping("");

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. Search by Star
  const handleClickStar = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setColor("");
    setBrand("");
    setShipping("");

    fetchProducts({ stars: num });
  };

  // 6. Search by Sub
  const handleSub = (s) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setColor("");
    setBrand("");
    setShipping("");

    fetchProducts({ sub: s });
  };

  // 7. Search by Brand
  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. Search by Color
  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setShipping("");

    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  // 9. Search by Color
  const handleShipping = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");

    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4 className="mt-2 text-center">Search/Filter</h4>

          <hr />
          <Menu
            mode="inline"
            defaultOpenKeys={[
              "price",
              "categories",
              "star",
              "sub",
              "brand",
              "color",
              "shipping",
            ]}
          >
            <SubMenu
              key="price"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                  className="ml-4 mr-4"
                />
              </div>
            </SubMenu>
            <SubMenu
              key="categories"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>
                {categories.map((c) => (
                  <div key={c._id}>
                    <Checkbox
                      className="pl-4 pr-4 pb-2"
                      value={c._id}
                      name="category"
                      onChange={handleCategory}
                      checked={categoryIds.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="star"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div className="pl-4 pr-4 pb-2">
                <Star numberOfStars={5} starClick={handleClickStar} />
                <Star numberOfStars={4} starClick={handleClickStar} />
                <Star numberOfStars={3} starClick={handleClickStar} />
                <Star numberOfStars={2} starClick={handleClickStar} />
                <Star numberOfStars={1} starClick={handleClickStar} />
              </div>
            </SubMenu>
            <SubMenu
              key="sub"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Subs
                </span>
              }
            >
              <div className="pl-4 pr-4 pb-2">
                {subs.map((s) => (
                  <div
                    onClick={() => handleSub(s)}
                    key={s._id}
                    className="m-1 p-1 badge badge-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="brand"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div className="pl-4 pr-4 pb-2">
                {brands.map((b) => (
                  <Radio
                    key={b}
                    value={b}
                    checked={b === brand}
                    onChange={handleBrand}
                    style={{ display: "block" }}
                    className="pb-2"
                  >
                    {b}
                  </Radio>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="color"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Color
                </span>
              }
            >
              <div className="pl-4 pr-4 pb-2">
                {colors.map((c) => (
                  <Radio
                    key={c}
                    value={c}
                    checked={c === color}
                    onChange={handleColor}
                    style={{ display: "block" }}
                    className="pb-2"
                  >
                    {c}
                  </Radio>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="shipping"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div className="pl-4 pr-4 pb-2">
                <Radio
                  value="Yes"
                  checked={"Yes" === shipping}
                  onChange={handleShipping}
                  style={{ display: "block" }}
                  className="pb-2"
                >
                  Yes
                </Radio>
                <Radio
                  value="No"
                  checked={"No" === shipping}
                  onChange={handleShipping}
                  style={{ display: "block" }}
                  className="pb-2"
                >
                  No
                </Radio>
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-center mt-2">
              <Spin size="large" />
            </h4>
          ) : (
            <h4 className="text-center text-danger mt-2">Products</h4>
          )}
          <div className="row pb-5">
            {products.length < 1 ? (
              <h4 className="text-center">No Product Founds</h4>
            ) : (
              products.map((p) => (
                <div className="col-md-4 mt-2" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
