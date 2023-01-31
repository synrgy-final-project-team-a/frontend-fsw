import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
	return (
		<Container id="footer">
			<Row className="justify-content-center">
				<Col xs={12} lg={3}>
					<img src="/logo-footer.png" alt="..." />
					<p>Kosanku merupakan platform pencari kos yang mudah dan terpercaya,
						serta platform penyewa kos terbaik. Kosanku berkembang dari tahun ke
						tahun menjadi lebih mudah dan nyaman bagi penguna baik pencari maupun penyewa kos.
					</p>
				</Col>
				<Col xs={12} lg={3}>
					<h3 className="fw-bold footer-title">Kosanku</h3>
					<ul className="link-list">
						<li as={Link} to="/" className="mb-3">Pusat Bantuan</li>
						<li as={Link} to="/" className="mb-3">Kebijakan Privasi</li>
						<li as={Link} to="/" className="mb-3">Syarat dan Ketentuan</li>
					</ul>
				</Col>
				<Col xs={12} lg={3}>
					<h3 className="fw-bold footer-title">Hubungi Kami</h3>
					<ul className="link-list">
						<li as={Link} to="/" className="mb-3">kosanku@mail.com</li>
						<li as={Link} to="/" className="mb-3">+62 897 6767 1212</li>
						<li as={Link} to="/" className="mb-3">infokosan@gmail.com</li>
					</ul>
				</Col>
				<Col xs={12} lg={3}>
					<h3 className="fw-bold footer-title">Ikuti Kami</h3>
					<ul className="link-list">
						<li as={Link} to="/" className="mb-3">Facebook</li>
						<li as={Link} to="/" className="mb-3">Instagram</li>
						<li as={Link} to="/" className="mb-3">Twitter</li>
					</ul>
				</Col>
			</Row>
			<div className="separator"></div>
			<div className="copyright">
				kosanku © 2022 All-rights reserved
			</div>
		</Container>
	);
};
export default FooterComponent;
