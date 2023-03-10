import React from "react";
import Landing from "../pages/pencari/landing";

import Profile from "../pages/pencari/profile/profilePencari";
import InformasiPersonal from "../pages/pencari/profile/informasiPersonal";
import HistoriTransaksi from "../pages/pencari/profile/historiTransaksi";

import PengajuanSewa from "../pages/pencari/pengajuanSewa";
import Favorite from "../pages/pencari/favorite/favorite";
import ChatPage from "../pages/pencari/chat/chatPage";
import Pencarian from "../pages/pencari/pencarian/pencarian";
import HasilPencarian from "../pages/pencari/pencarian/hasil";
import DetailKos from "../pages/pencari/detailKos";
import Pemberitahuan from "../pages/pencari/profile/pemberitahuan";
import Receipt from "../pages/pencari/receipt";

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
    element: <ChatPage />,
  },
  {
    path: "/kos/:id",
    element: <DetailKos />,
  },
  {
    path: "/nota/:id",
    element: <Receipt />,
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
        element: <HistoriTransaksi />,
      },
      {
        path: "/pemberitahuan",
        element: <Pemberitahuan />,
      },
    ],
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
          },
        ],
      },
    ],
  },
];

export default PencariRoutes;
