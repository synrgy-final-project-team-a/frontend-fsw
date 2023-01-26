import React from "react"
import Dashboard from "../pages/penyewa/dashboard"
import ListKos from "../pages/penyewa/kos/list"

const PenyewaRoutes = [
	{
		path: "/penyewa",
		children: [
			{
				name: "Dashboard",
				path: "",
				element: <Dashboard />,
			},
			{
				path: "/kos",
				children: [
					{
						name: "Kosanku",
						path: "",
						element: <ListKos />
					}
				]
			}
		]
	}
]

export default PenyewaRoutes