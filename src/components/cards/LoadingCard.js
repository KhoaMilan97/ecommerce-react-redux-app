import React from "react";
import { Skeleton, Card } from "antd";

function LoadingCard({ count }) {
  const Cards = () => {
    const loadingArray = [];
    for (let i = 0; i < count; i++) {
      loadingArray.push(
        <div className="col-md-4" key={i}>
          <Card>
            <Skeleton active></Skeleton>
          </Card>
        </div>
      );
    }
    return loadingArray;
  };
  return <div className="row">{Cards()}</div>;
}

export default LoadingCard;
