import React, { useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Card, Container } from "react-bootstrap";
import { useListBannerMutation } from "../store/apis/banner";

const Banner = () => {
  let owlNavPrev = "<img src='/arrow-circle-left.png' alt='...' />";
  let owlNavNext = "<img src='/arrow-circle-right.png' alt='...' />";

  const owlRef = useRef()

  const [
    listHit,
    { isLoading: loadingList, isSuccess: successList, data: dataList }
  ] = useListBannerMutation()

  useEffect(() => {
    listHit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container id="banner" className="mt-2">
      {
        loadingList ?
          <Card bg="none" className="skeleton" style={{ height: "500px" }}>
            &nbsp;
          </Card> :
          successList ?
            dataList.data.length === 0 ?
              <img src="/banner.png" className="img-fluid" alt="..." /> :
              <OwlCarousel ref={owlRef} className="owl-theme" autoPlay={true} items={1} loop dots={false} nav navText={[owlNavPrev, owlNavNext]} >
                {
                  dataList.data.map((el, i) => {
                    return (
                      <img src={el.bannerImage} alt={el.bannerName} key={i} />
                    )
                  })
                }
              </OwlCarousel> :
            <img src="/banner.png" className="img-fluid" alt="..." />
      }

    </Container >
  );
};

export default Banner;