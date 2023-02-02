import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfilNav from "../../../components/profile";
import AdminLayout from "../../../layouts/admin.layout";

const ProfilAdmin = () => {
	return (
		<AdminLayout>
			<Container className="mt-3">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/penyewa", className: "text-decoration-none" }}>
						Dashboard
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Profil</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="mt-5">
					<Col xs={12} lg={3}>
						<ProfilNav />
					</Col>
					<Col xs={12} lg={9} className="text-center border rounded d-none d-lg-flex">
						<img src="/pencari.png" className="img-fluid" alt="..." />
					</Col>
				</Row>
			</Container>
		</AdminLayout>
	);
}

export default ProfilAdmin
