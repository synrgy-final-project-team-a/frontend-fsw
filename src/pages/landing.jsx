import Banner from "../components/banner";
import FooterComponent from "../components/footer";
import KostByCampus from "../components/kostByCampus";
import KostByCity from "../components/kostByCity";
import Navbar from "../components/navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <KostByCity />
      <KostByCampus />
      <FooterComponent />
    </>
  );
};

export default Landing;
