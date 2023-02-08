import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Container } from "react-bootstrap";

const Banner = () => {
  let owlNavPrev = "<img src='/arrow-circle-left.png' alt='...' />";
  let owlNavNext = "<img src='/arrow-circle-right.png' alt='...' />";

  return (
<<<<<<< HEAD
    <Container id="banner">
        <OwlCarousel className="owl-theme" autoplay={true} items={1} loop dots={false} nav navText={[owlNavPrev, owlNavNext]} >
            <img src="/banner.png" alt="..." />
            <img src="/banner.png" alt="..." />
            <img src="/banner.png" alt="..." />
=======
    <Container id="banner" className="mt-2">
        <OwlCarousel className="owl-theme" autoplay={true} items={1} loop dots={false} nav navText={[owlNavPrev, owlNavNext]} >
            <img src="/banner2.png" alt="..." />
            <img src="/banner1.png" alt="..." />
            <img src="/banner3.png" alt="..." />
>>>>>>> 07acb04e97f2c54e37878b5fcf9b34ef9b31171a
        </OwlCarousel>
    </Container>
  );
};

export default Banner;
