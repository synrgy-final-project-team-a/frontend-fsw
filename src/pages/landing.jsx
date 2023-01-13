import Banner from "../components/banner";
import FooterComponent from "../components/footer";
import KostByLocation from "../components/kostByLocation";
import BestKost from "../components/bestKost";
import Navbar from "../components/navbar";
import Search from "../components/search";
import Testimonial from "../components/testimonial";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Search />
      <BestKost />
      <KostByLocation />
      <Testimonial />
      <FooterComponent />
    </>
  );
};

export default Landing;
