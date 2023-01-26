import React from "react"
import Landing from "../pages/pencari/landing"
import Profile from "../pages/pencari/profile/profilePencari"
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal"
import EditProfile from "../pages/pencari/profile/editProfile"
import KelolaKos from "../pages/pencari/kelola kos/kelolaKos"
import HistoriTransaksi from "../pages/pencari/kelola kos/historiTransaksi"

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
		path: "/profile",
		children: [
			{
				path: "",
				element: <Profile />,
			},
			{
				path: "/informasi-personal",
				element: <InformasiPersonal />,
			},{
				path: "/edit-profile",
				element: <EditProfile />,
			},{
				path: "/kelolakos",
				element: <KelolaKos />,
			},{
				path: "/histori-transaksi",
				element: <HistoriTransaksi/>
			}

		]
	}
]

export default PencariRoutes;
