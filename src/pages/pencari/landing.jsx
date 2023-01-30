import Banner from "../../components/banner";
import KostByLocation from "../../components/kostByLocation";
import BestKost from "../../components/bestKost";
import Search from "../../components/search";
import Testimonial from "../../components/testimonial";
import PencariLayout from "../../layouts/pencari.layout";
import { useState } from "react";

const Landing = () => {
	const [searchInputTop, setSearchInputTop] = useState(false)

	return (
		<PencariLayout searchTop={searchInputTop}>
			<Banner />
			<Search searchTop={searchInputTop} setSearchTop={setSearchInputTop} />
			<BestKost />
			<KostByLocation />
			<Testimonial />
		</PencariLayout>
	);
};

export default Landing;
