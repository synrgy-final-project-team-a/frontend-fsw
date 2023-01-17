import React from "react"
import Dashboard from "../pages/admin/dashboard"
import Test from "../pages/admin/test"
import DetilUser from "../pages/admin/users/detiluser"
import KelolaUser from "../pages/admin/users/listuser"

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
				name: "Test",
				path: "/test",
				element: <Test />,
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
						element: <KelolaUser />,
					},
					{
						path: "/:id",
						element: <DetilUser />,
					}
				]
			}
		]
	}
]

export default AdminRoutes