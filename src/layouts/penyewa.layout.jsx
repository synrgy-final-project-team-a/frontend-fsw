import React from "react"
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import PenyewaRoutes from "../routes/penyewa"

const PenyewaLayout = ({ children }) => {

	return (
		<>
			<NavbarComponent routes={PenyewaRoutes} />
			{ children }
			<FooterComponent />
		</>
	)
}

export default PenyewaLayout