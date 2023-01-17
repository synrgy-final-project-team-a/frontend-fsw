import React from "react"
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import PencariRoutes from "../routes/pencari";

const PencariLayout = ({ children }) => {

	return (
		<>
			<NavbarComponent routes={PencariRoutes} />
			{ children }
			<FooterComponent />
		</>
	)
}

export default PencariLayout