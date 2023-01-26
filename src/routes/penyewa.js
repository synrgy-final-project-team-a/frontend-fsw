import React from "react"
import Dashboard from "../pages/penyewa/dashboard"
import ListKos from "../pages/penyewa/kos/list"
import TambahKos from "../pages/penyewa/kos/tambah"

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
					},
					{
						path: "/tambah",
						element: <TambahKos />
					}
				]
			}
		]
	}
]

export default PenyewaRoutes