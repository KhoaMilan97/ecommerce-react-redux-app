import React from "react";
import StarRatings from "react-star-ratings";

export function showAverage(product) {
  if (product && product.rating) {
    const totalStar = [];
    product.rating.map((r) => totalStar.push(r.star));
    const ratingLength = product.rating.length;
    const totalRating = totalStar.reduce((p, n) => p + n, 0);
    const averageResult = totalRating / ratingLength;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            rating={averageResult}
            starRatedColor="red"
          />
        </span>
        <span className="ml-1 text-primary">{`(${ratingLength})`}</span>
      </div>
    );
  }
  return;
}
