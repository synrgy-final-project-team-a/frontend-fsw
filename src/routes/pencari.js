import React from "react";
import Landing from "../pages/pencari/landing";
import DetailKos from "../pages/pencari/detailKos";
import Profile from "../pages/pencari/profile/profilePencari";
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal";
import EditProfile from "../pages/pencari/profile/editProfile";
import Pencarian from "../pages/pencari/pencarian";
import PengajuanSewa from "../pages/pencari/pengajuanSewa";

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
    path: "/detail-kos",
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
        path: "/informasi-personal",
        element: <InformasiPersonal />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/pencarian",
    element: <Pencarian />,
  },
];

export default PencariRoutes;
