import React from "react"
import Dashboard from "../pages/admin/dashboard"

import Profile from "../pages/admin/profile/profileAdmin"
import InformasiPersonal from "../pages/admin/profile/informasiPersonal"

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
import KelolaKos from "../pages/admin/kelola-kos"
import EditUser from "../pages/admin/users/editUser"

import ListBanner from "../pages/admin/banners/list"

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
					},
					{
						path: "/edit",
						element: <EditUser />
					}
				]
			},
			{
				path: "/banners",
				name: "Banners",
				element: <ListBanner />
			},
			{
				name: "Kos",
				path: "/kos",
				element: <KelolaKos />
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