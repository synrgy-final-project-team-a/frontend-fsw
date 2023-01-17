import React from "react"
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import AdminRoutes from "../routes/admin"

const AdminLayout = ({ children }) => {

	console.log(AdminRoutes)

	return (
		<>
			<NavbarComponent />
			{ children }
			<FooterComponent />
		</>
	)
}

export default AdminLayout