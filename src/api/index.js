import axios from "axios";

let url;

if (process.env.NODE_ENV === "development") {
  url = process.env.REACT_APP_API;
}

if (process.env.NODE_ENV === "production") {
  url = "https://mern-ecommerce-react-redux.herokuapp.com/api";
}

export default axios.create({
  baseURL: url,
});
