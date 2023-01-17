import React from "react"
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import AdminRoutes from "../routes/admin"

const AdminLayout = ({ children }) => {

	return (
		<>
			<NavbarComponent routes={AdminRoutes} />
			{ children }
			<FooterComponent />
		</>
	)
}

export default AdminLayout