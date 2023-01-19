import React from "react"
import Landing from "../pages/pencari/landing"

const PencariRoutes = [
	{
		name: "Home",
		path: "/",
		element: <Landing />,
	},
	{
		name: "Cari Kos",
		path: "/cari-kos",
		element: <Landing />,
	},
	{
		name: "Sewa Kos",
		path: "/sewa-kos",
		element: <Landing />,
	},
]

export default PencariRoutes