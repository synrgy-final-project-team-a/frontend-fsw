import Dashboard from "../pages/admin/dashboard"

const AdminRoutes = [
	{
		path: "/admin",
		children: [
			{
				name: "Dashboard",
				path: "/",
			}
		]
	}
]

export default AdminRoutes