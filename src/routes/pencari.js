import React from "react";
import Landing from "../pages/pencari/landing";
import DetailKos from "../pages/pencari/detailKos";

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
];

export default PencariRoutes;
