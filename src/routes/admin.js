import React from "react"
import Dashboard from "../pages/admin/dashboard"

import DetilUser from "../pages/admin/users/detiluser"
import KelolaUser from "../pages/admin/users/listuser"
import TambahUser from "../pages/admin/users/tambahUser"

import Login from "../pages/admin/authentication/login"
import LoginAs from "../pages/admin/authentication/loginAs"

import Register from "../pages/admin/authentication/register"
import RegisterAs from "../pages/admin/authentication/registerAs"
import RegisterVerifikasi from "../pages/admin/authentication/registerVerifikasi"
import RegisterVerifikasiSukses from "../pages/admin/authentication/registerVerifikasiSukses"

import ForgetPass from "../pages/admin/authentication/forgetPassword"
import ForgetPassSuccess from "../pages/admin/authentication/forgetPasswordSuccess"
import ForgetPassChange from "../pages/admin/authentication/forgetPasswordChange"

const AdminRoutes = [
	{
		path: "/admin",
		children: [
			{
				name: "Dashboard",
				path: "",
				element: <Dashboard />,
			},
			{
				path: "/users",
				children: [
					{
						name: "Users",
						path: "",
						element: <KelolaUser />,
					},
					{
						path: "/tambah",
						element: <TambahUser />,
					},
					{
						path: "/:id",
						element: <DetilUser />,
					}
				]
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
				path: "/verification",
				element: <RegisterVerifikasi />,
			},
			{
				path: "/verification-success",
				element: <RegisterVerifikasiSukses />,
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
				children: [
					{
						path: "",
						element: <ForgetPassSuccess />
					},
					// Masi on progress
					{
						path: "/:otp",
						element: <ForgetPassChange />
					},
				]
			},
			{
				path: "/:role",
				element: <Login />,
			},
		]
	},
]

export default AdminRoutes