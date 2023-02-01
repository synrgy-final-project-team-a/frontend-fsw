import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
	return (
		<Container id="footer">
			<Row className="justify-content-center">
				<Col xs={12} lg={3} className="text-center text-lg-start">
					<img src="/logo-footer.png" alt="..." />
					<p>
						Kosanku merupakan platform pencari kos yang mudah dan terpercaya,
						serta platform penyewa kos terbaik. Kosanku berkembang dari tahun ke
						tahun menjadi lebih mudah dan nyaman bagi penguna baik pencari maupun penyewa kos.
					</p>
				</Col>
				<Col xs={12} lg={3} className="text-center text-lg-start">
					<h3 className="fw-bold footer-title">Kosanku</h3>
					<ul className="link-list">
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">Pusat Bantuan</Link>
						</li>
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">Kebijakan Privasi</Link>
						</li>
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">Syarat dan Ketentuan</Link>
						</li>
					</ul>
				</Col>
				<Col xs={12} lg={3} className="text-center text-lg-start">
					<h3 className="fw-bold footer-title">Hubungi Kami</h3>
					<ul className="link-list">
						<li className="mb-3">
							<a href="mailto:kosanku@mail.com" className="text-decoration-none">kosanku@mail.com</a>
						</li>
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">+62 897 6767 1212</Link>
						</li>
						<li className="mb-3">
							<a href="mailto:infokosan@gmail.com" className="text-decoration-none">infokosan@gmail.com</a>
						</li>
					</ul>
				</Col>
				<Col xs={12} lg={3} className="text-center text-lg-start">
					<h3 className="fw-bold footer-title">Ikuti Kami</h3>
					<ul className="link-list">
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">Facebook</Link>
						</li>
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">Instagram</Link>
						</li>
						<li className="mb-3">
							<Link to="/" className="text-decoration-none">Twitter</Link>
						</li>
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
