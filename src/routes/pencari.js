import React from "react";
import Landing from "../pages/pencari/landing";
import DetailKos from "../pages/pencari/detailKos";
import Profile from "../pages/pencari/profile/profilePencari";
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal";
import EditProfile from "../pages/pencari/profile/editProfile";
import PengajuanSewa1 from "../pages/pencari/pengajuanSewa1";
import PengajuanSewa2 from "../pages/pencari/pengajuanSewa2";

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
    name: "Detail Kos",
    path: "/detail-kos",
    element: <DetailKos />,
  },
  {
    name: "Pengajuan Sewa Kos",
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
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
];

export default PencariRoutes;
