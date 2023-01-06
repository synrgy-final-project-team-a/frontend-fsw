import Banner from "../components/banner";
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
    </>
  );
};

export default Landing;
