import React from "react"
import Dashboard from "../pages/admin/dashboard"
import Login from "../pages/admin/authentication/login"
import LoginAs from "../pages/admin/authentication/loginAs"
import Register from "../pages/admin/authentication/register"
import RegisterAs from "../pages/admin/authentication/registerAs"
import RegisterVerifikasi from "../pages/admin/authentication/registerVerifikasi"
import ForgetPass from "../pages/admin/authentication/forgetPassword"
import VerifEmailSukses from "../pages/admin/authentication/forgetPasswordSuccess"

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
				element: <RegisterVerifikasi />,
			}
		]
	},
	{
		path: "/login",
		children: [
			{
				path: "",
				element: <LoginAs />,
			},
			{
				path: "/forgot-password",
				element: <ForgetPass />,
			},
			{
				path: "/forgot-password-success",
				element: <VerifEmailSukses />
			},
			{
				path: "/:role",
				element: <Login />,
			},
		]
	},
]

export default AdminRoutes