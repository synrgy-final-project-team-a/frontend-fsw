import React from "react"
import Profile from "../pages/penyewa/profile/profilePenyewa"
import Dashboard from "../pages/penyewa/dashboard"
import ListKos from "../pages/penyewa/kos/list"
import TambahKos from "../pages/penyewa/kos/tambah"
import ChatPagePenyewa from "../pages/penyewa/chat/chatPage"

const PenyewaRoutes = [
	{
		path: "/penyewa",
		children: [
			{
				name: "Dashboard",
				path: "",
				element: <Dashboard />,
			},
			{
				path: "/profile",
				element: <Profile />,
				children:[
					{
						path: "/chat",
						element: <ChatPagePenyewa />
					}
				]
			},
			{
				path: "/kos",
				children: [
					{
						name: "Kosanku",
						path: "",
						element: <ListKos />
					},
					{
						path: "/tambah",
						element: <TambahKos />
					}
				]
			}
		]
	},
]

export default PenyewaRoutes