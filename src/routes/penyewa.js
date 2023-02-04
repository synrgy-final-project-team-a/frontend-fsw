import React from "react"
import Dashboard from "../pages/penyewa/dashboard"

import Profile from "../pages/penyewa/profile/profilePenyewa"
import InformasiPersonal from "../pages/penyewa/profile/informasiPersonal"

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
				path: "/profile",
				children: [
					{
						path: "",
						element: <Profile />,
					},
					{
						path: "/saya",
						element: <InformasiPersonal />,
					},		
				]
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
	},
]

export default PenyewaRoutes