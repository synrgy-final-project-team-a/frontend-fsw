import Banner from "../../components/banner";
import KostByLocation from "../../components/kostByLocation";
import BestKost from "../../components/bestKost";
import Search from "../../components/search";
import Testimonial from "../../components/testimonial";
import PencariLayout from "../../layouts/pencari.layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetSearchText } from "../../store/slices/decorSlice";

const Landing = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(resetSearchText())
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
