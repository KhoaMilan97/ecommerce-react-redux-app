import React from "react";

import Jumbotron from "../components/cards/Jumbotron";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";

function Home() {
  return (
    <>
      <div className="jumbotron text-center text-danger h1 font-weight-bold">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <h4 className="text-center text-primary display-4 jumbotron p-3 mt-5 mb-5">
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center text-primary display-4 jumbotron p-3 mt-5 mb-5">
        Best Sellers
      </h4>
      <BestSellers />
    </>
  );
}

export default Home;
