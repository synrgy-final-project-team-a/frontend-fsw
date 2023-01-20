import React from "react"
import Landing from "../pages/pencari/landing"
import Profile from "../pages/profilePencari"

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
	{
		name: "Profile",
		path: "/profile",
		element: <Profile />
	}
]

export default PencariRoutes