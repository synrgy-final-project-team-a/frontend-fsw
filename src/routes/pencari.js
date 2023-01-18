import React from "react"
import Landing from "../pages/pencari/landing"
import LoginAs from "../pages/pencari/pilihLoginAs"
import Login from "../pages/pencari/login"
import Register from "../pages/pencari/register"
import ForgetPass from "../pages/pencari/forgetPassword"
import VerifEmailSukses from "../pages/pencari/successResetPass"

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
		path: "/loginAs",
		element: <LoginAs />,
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/verif-email",
		element: <ForgetPass />,
	},
	{
		path: "/verif-email-sukses",
		element: <VerifEmailSukses />
	}
]

export default PencariRoutes