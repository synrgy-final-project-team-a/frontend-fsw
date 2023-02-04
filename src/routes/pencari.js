import React from "react"
import Landing from "../pages/pencari/landing"

import Profile from "../pages/pencari/profile/profilePencari"
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal"
import HistoriTransaksi from "../pages/pencari/profile/historiTransaksi"

import PengajuanSewa1 from "../pages/pencari/pengajuanKos/pengajuanSewa1";
import PengajuanSewa2 from "../pages/pencari/pengajuanKos/pengajuanSewa2";
import PengajuanSewa3 from "../pages/pencari/pengajuanKos/pengajuanSewa3";
import PengajuanSewa4 from "../pages/pencari/pengajuanKos/pengajuanSewa4";
import Favorite from "../pages/pencari/favorite/favorite"

<<<<<<< HEAD
import Pencarian from "../pages/pencari/pencarian/pencarian";
import HasilPencarian from "../pages/pencari/pencarian/hasil"
=======
import Pencarian from "../pages/pencari/pencarian";
>>>>>>> bf99107c450d7457e8fdb76435251e8373e78533
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
				path: "/1",
				element: <PengajuanSewa1 />,
			},
			{
				path: "/2",
				element: <PengajuanSewa2 />,
			},
			{
				path: "/3",
				element: <PengajuanSewa3 />,
			},
			{
				path: "/4",
				element: <PengajuanSewa4 />,
			},
		],
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
