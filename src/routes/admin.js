import React from "react"
import Dashboard from "../pages/admin/dashboard"

const AdminRoutes = [
	{
		path: "/admin",
		children: [
			{
				name: "Dashboard",
				path: "/",
				element: <Dashboard />
			}
		]
	}
]

export default AdminRoutes