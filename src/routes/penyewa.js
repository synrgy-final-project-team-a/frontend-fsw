import React from "react"
import Dashboard from "../pages/penyewa/dashboard"

const PenyewaRoutes = [
	{
		path: "/penyewa",
		children: [
			{
				name: "Dashboard",
				path: "/",
				element: <Dashboard />,
			}
		]
	}
]

export default PenyewaRoutes