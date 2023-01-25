import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Banner = () => {
  let owlNavPrev = "<img src='/arrow-circle-left.png' />";
  let owlNavNext = "<img src='/arrow-circle-right.png' />";

  return (
    <div>
        <OwlCarousel items={1} className="owl-theme banner" loop dots={false} nav navText={[owlNavPrev, owlNavNext]} >
          <div className="img-fluid">
            <img src="/banner.png" alt="" />
          </div>
          <div className="img-fluid">
            <img src="/banner.png" alt="" />
          </div>
          <div className="img-fluid">
            <img src="/banner.png" alt="" />
          </div>
        </OwlCarousel>
    </div>
  );
};

export default Banner;
