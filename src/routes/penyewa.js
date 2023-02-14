import React from "react";
import Dashboard from "../pages/penyewa/dashboard";

import Profile from "../pages/penyewa/profile/profilePenyewa";
import InformasiPersonal from "../pages/penyewa/profile/informasiPersonal";

import ListKos from "../pages/penyewa/kos/list"
import TambahKos from "../pages/penyewa/kos/tambah"
import TambahKamar from "../pages/penyewa/kos/tambahKamar"
import EditKos from "../pages/penyewa/kos/edit"
import EditKamar from "../pages/penyewa/kos/editKamar"
import DetailPengajuan from "../pages/penyewa/kos/detail-pengajuan-sewa-kos"

import ChatPagePenyewa from "../pages/penyewa/chat/chatPage";
import Pemberitahuan from "../pages/penyewa/profile/pemberitahuan";

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
						path: "/pemberitahuan",
						element: <Pemberitahuan />,
					},
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
					},
					{
						path: "/:id",
						element: <EditKos />
					},
					{
						path: "/edit/:id",
						element: <EditKos />
					},
					{
						path: "/detail-pengajuan",
						children: [
							{
								path: "/:id",
								element: <DetailPengajuan />

							}
						]
					},
					{
						path: "/kamar",
						children: [
							{
								path: "/:id",
								element: <EditKamar />
							},
							{
								path: "/tambah/:id",
								element: <TambahKamar />
							},
							{
								path: "/edit/:id",
								element: <EditKamar />
							}
						]
					},
				]
			},
			{
				name: "Chat",
				path: "/chat",
				element: <ChatPagePenyewa />,
			},
		]
	},
]

export default PenyewaRoutes;
