import React from "react"
import Landing from "../pages/pencari/landing"

const PencariRoutes = [
	{
		name: "Home",
		path: "/",
		element: <Landing />,
	},
	{
		name: "Favorit",
		path: "/favorit",
		element: <Landing />,
	},
	{
		name: "Chat",
		path: "/chat",
		element: <Landing />,
	},
]

export default PencariRoutes