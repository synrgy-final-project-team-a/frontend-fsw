import Banner from "../../components/banner";
import KostByLocation from "../../components/kostByLocation";
import BestKost from "../../components/bestKost";
import Search from "../../components/search";
import Testimonial from "../../components/testimonial";
import PencariLayout from "../../layouts/pencari.layout";

const Landing = () => {
  return (
    <PencariLayout>
      <Banner />
      <Search />
      <BestKost />
      <KostByLocation />
      <Testimonial />
    </PencariLayout>
  );
};

export default Landing;
