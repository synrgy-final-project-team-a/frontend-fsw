import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import AdminRoutes from "../routes/admin"
import React from "react"

const AdminLayout = ({ children }) => {

	console.log(AdminRoutes)

	return (
		<>
			{/* <NavbarComponent /> */}
			{/* <main>{ children }</main>
			<FooterComponent /> */}
		</>
	)
}

export default AdminLayout