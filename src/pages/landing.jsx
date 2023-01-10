import Banner from "../components/banner";
import FooterComponent from "../components/footer";
import KostByCampus from "../components/kostByCampus";
import KostByCity from "../components/kostByCity";
import Navbar from "../components/navbar";
import Search from "../components/search";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Search />
      <KostByCity />
      <KostByCampus />
      <FooterComponent />
    </>
  );
};

export default Landing;
