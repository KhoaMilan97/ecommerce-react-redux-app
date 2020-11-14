import React from "react";
import StarRatings from "react-star-ratings";

function Star({ numberOfStars, starClick }) {
  return (
    <>
      <StarRatings
        starRatedColor="red"
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starHoverColor="red"
        starEmptyColor="red"
        starDimension="20px"
        starSpacing="2px"
      />
      <br />
    </>
  );
}

export default Star;
