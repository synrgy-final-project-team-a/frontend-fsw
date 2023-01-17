import React from "react"
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import AdminRoutes from "../routes/admin.js"

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