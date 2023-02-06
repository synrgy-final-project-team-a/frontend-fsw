import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import Whishlist from "../../../components/whishlist"
import RecomendationKos from "../../../components/recomendationKos"
import PencariLayout from "../../../layouts/pencari.layout";
import { Link } from "react-router-dom";

export default function Favorite() {
	return (
		<PencariLayout>
			<Container className="my-3">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none" }}>
						Beranda
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Favorit</Breadcrumb.Item>
				</Breadcrumb>
				<div>
					<Whishlist />
				</div>
				<div className="mt-5">
					<RecomendationKos />
				</div>
			</Container>
		</PencariLayout>
	);
}
