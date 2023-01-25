import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fasStar, farStar);

export default function ratingStar() {
  const [rating, setRating] = useState(0);
  const handleClick = (value) => {
    setRating(value);
  };
  return (
    <div>
      {[1, 2, 3, 4, 5].map((value, index) => {
        return (
          <FontAwesomeIcon
            key={index}
            icon={value <= rating ? fasStar : farStar}
            onClick={() => handleClick(value)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
}
