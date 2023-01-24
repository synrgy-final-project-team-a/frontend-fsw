<<<<<<< HEAD
import React from "react";
import Landing from "../pages/pencari/landing";
import Login from "../pages/pencari/login";
import Register from "../pages/pencari/register";
import ForgetPass from "../pages/pencari/forgetPassword";
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verif-email",
    element: <ForgetPass />,
  },
  {
    name: "Detail Kos",
    path: "/detail-kos",
    element: <DetailKos />,
  },
];
=======
import React from "react"
import Landing from "../pages/pencari/landing"

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
]
>>>>>>> 2711a2e108edc9b317b1860b7bf751e5274e71d5

export default PencariRoutes;
