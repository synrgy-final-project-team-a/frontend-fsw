import React from "react"
import Dashboard from "../pages/admin/dashboard"
import Profile from "../pages/penyewa/profile/profilePenyewa"

const PenyewaRoutes = [
	{
		path: "/penyewa",
		children: [
			{
				name: "Dashboard",
				path: "/",
				element: <Dashboard />,
			},
		]
	},
	{
		path: "/profile",
		children: [
			{
				path: "",
				element: <Profile />,
			},
		]
		
	}
]

export default PenyewaRoutes