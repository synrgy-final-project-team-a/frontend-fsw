import React from "react"
import Landing from "../pages/pencari/landing"

import Profile from "../pages/pencari/profile/profilePencari"
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal"
import EditProfile from "../pages/pencari/profile/editProfile"
import KelolaKos from "../pages/pencari/kelolaKos/kelolaKos"
import HistoriTransaksi from "../pages/pencari/kelolaKos/historiTransaksi"

import PengajuanSewa1 from "../pages/pencari/pengajuanKos/pengajuanSewa1";
import PengajuanSewa2 from "../pages/pencari/pengajuanKos/pengajuanSewa2";
import PengajuanSewa3 from "../pages/pencari/pengajuanKos/pengajuanSewa3";
import PengajuanSewa4 from "../pages/pencari/pengajuanKos/pengajuanSewa4";

import Pencarian from "../pages/pencari/pencarian";
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
    element: <Landing />,
  },
  {
    name: "Chat",
    path: "/chat",
    element: <Landing />,
  },
  {
    path: "/kos/detail",
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
	},
  {
    path: "/pencarian",
    element: <Pencarian />,
  },
];

export default PencariRoutes;
