import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfilNav from "../../../components/profile";
import PenyewaLayout from "../../../layouts/penyewa.layout";

const ProfilePenyewa = () => {

	return (
		<PenyewaLayout>
			<Container className="mt-3" id="profile-kelola-kos">
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
					<Col xs={12} lg={9} className="border rounded px-3 px-lg-5">
					</Col>
				</Row>
			</Container>
		</PenyewaLayout>
	);
}

export default ProfilePenyewa
