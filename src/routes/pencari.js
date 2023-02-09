import React from "react"
import Landing from "../pages/pencari/landing"

import Profile from "../pages/pencari/profile/profilePencari"
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal"
import HistoriTransaksi from "../pages/pencari/profile/historiTransaksi"

import PengajuanSewa from "../pages/pencari/pengajuanSewa";
import Favorite from "../pages/pencari/favorite/favorite"

import Pencarian from "../pages/pencari/pencarian/pencarian";
import HasilPencarian from "../pages/pencari/pencarian/hasil"
import DetailKos from "../pages/pencari/detailKos";

const PencariRoutes = [
	{
		name: "Beranda",
		path: "/",
		element: <Landing />,
	},
	{
		name: "Favorit",
		path: "/favorit",
		element: <Favorite />,
	},
	{
		name: "Chat",
		path: "/chat",
		element: <Landing />,
	},
	{
		path: "/kos/:id",
		element: <DetailKos />,
	},
	{
		path: "/pengajuan-sewa",
		children: [
			{
				path: "",
				element: <PengajuanSewa />,
			},
			{
				path: "/:id",
				element: <PengajuanSewa />,
			},
		]
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
			{
				path: "/histori",
				element: <HistoriTransaksi />
			}

		]
	},
	{
		path: "/pencarian",
		children: [
			{
				path: "",
				element: <Pencarian />,
			},
			{
				path: "/:province",
				children: [
					{
						path: "",
						element: <HasilPencarian />,
					},
					{
						path: "/:city",
						element: <HasilPencarian />,
					}
				]
			}
		]
	},
];

export default PencariRoutes;
