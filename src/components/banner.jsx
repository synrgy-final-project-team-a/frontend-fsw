import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Banner = () => {
  let owlNavPrev = "<h1>Prev</h1>";
  let owlNavNext = "<h1>Next</h1>";

  return (
    <div>
      <div>
        <OwlCarousel items={1} className="owl-theme banner" loop dots={false} nav navText={[owlNavPrev, owlNavNext]}>
          <div className="img-banner img-fluid">
            <img src="https://static.mamikos.com/uploads/cache/data/event/2023-01-11/GWQermw5-540x720.jpg" alt="" />
          </div>
          <div className="img-banner img-fluid">
            <img src="https://static.mamikos.com/uploads/cache/data/event/2022-12-02/CyvkFN34-540x720.jpg" alt="" />
          </div>
          <div className="img-banner img-fluid">
            <img src="https://static.mamikos.com/uploads/cache/data/event/2023-01-05/3wehyBKx-540x720.jpg" alt="" />
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Banner;
