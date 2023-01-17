import React from "react"
import Landing from "../pages/pencari/landing"
import Login from "../pages/pencari/login"
import Register from "../pages/pencari/register"
import ForgetPass from "../pages/pencari/forgetPassword"

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
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/verif-email",
		element: <ForgetPass />,
	}
]

export default PencariRoutes