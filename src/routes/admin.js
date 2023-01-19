import React from "react"
import Dashboard from "../pages/admin/dashboard"
import ForgetPass from "../pages/pencari/forgetPassword"
import Login from "../pages/pencari/login"
import Register from "../pages/pencari/register"
import RegisterAs from "../pages/pencari/registerAs"
import VerifEmailSukses from "../pages/pencari/successResetPass"

const AdminRoutes = [
	{
		path: "/admin",
		children: [
			{
				name: "Dashboard",
				path: "/",
				element: <Dashboard />,
			}
		]
	},
	{
		path: "/register",
		children: [
			{
				path: "",
				element: <RegisterAs />,
			},
			{
				path: "/:role",
				element: <Register />,
			},
			{
				path: "/verifikasi",
				// element: <RegisterVerifikasi />,
			}
		]
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/verif-email",
		element: <ForgetPass />,
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

export default AdminRoutes