import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export class Banner extends Component {
  render() {
    return (
      <div>
        {/* <div class="container-fluid">
          <div className="row title" style={{ marginBottom: "20px" }}>
            <div class="col-sm-12 btn btn-info">Owl Carousel In React Application</div>
          </div>
        </div> */}
        <div class="container-fluid">
          <OwlCarousel items={3} className="owl-theme" loop nav margin={8}>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
            <div className="img">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}

export default Banner;

// function Banner() {
//   return (
//     <OwlCarousel className="owl-theme" items="3" autoplay nav dots loop margin={10}>
//       <div className="item">
//         <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
//       </div>
//       <div className="item">
//         <img
//           src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/Tiket%20Masuk%20IMG%20Worlds%20of%20Adventure%20di%20Dubai%20-%20Klook.jpg"
//           alt=""
//         />
//       </div>
//       <div className="item">
//         <h4>3</h4>
//       </div>
//       <div className="item">
//         <h4>4</h4>
//       </div>
//       <div className="item">
//         <h4>5</h4>
//       </div>
//     </OwlCarousel>
//   );
// }

// export default Banner;
