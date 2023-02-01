import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const KostByLocation = () => {
	return (
		<Container className="mb-5" id="kos-by-location">
			<h2 className="mb-3">Cari Kosan Berdasarkan Lokasi dan Tempat</h2>
			<Row className="align-items-stretch">
				<Col xs={12} lg={4}>
					<Row className="g-2">
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/jakarta" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Jakarta</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/semarang" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Semarang</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/bandung" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Bandung</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/surabaya" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Surabaya</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/depok" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Depok</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/yogyakarta" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Yogyakarta</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/malang" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Malang</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/karawang" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<span className="fw-bold px-2">Karawang</span>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
				<Col xs={12} lg={2} className="d-none d-lg-block">
					<Card>
						<Card.Img variant="top" src="https://png.pngtree.com/png-vector/20191120/ourmid/pngtree-bandung-landmark-icon-west-java-indonesia-png-image_2008327.jpg" />
						<Card.Body>
							<Card.Title className="text-center">KOTA</Card.Title>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} lg={2} className="d-none d-lg-block">
					<Card>
						<Card.Img variant="top" src="https://rekreartive.com/wp-content/uploads/2018/11/Logo-Untan-Universitas-Tanjungpura-PNG.png" />
						<Card.Body>
							<Card.Title className="text-center">KAMPUS</Card.Title>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} lg={4}>
					<Row className="g-2">
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/semarang" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">UNNES</span>
										<span className="px-2">Semarang</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/depok" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">UI</span>
										<span className="px-2">Depok</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/bogor" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">IPB</span>
										<span className="px-2">Bogor</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/bandung" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">ITB</span>
										<span className="px-2">Bandung</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/yogyakarta" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">UGM</span>
										<span className="px-2">Yogyakarta</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/sumedang" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">UNPAD</span>
										<span className="px-2">Sumedang</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/malang" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">UB</span>
										<span className="px-2">Malang</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={6}>
							<Card as={Link} to="/pencarian/surabaya" className="text-decoration-none">
								<Card.Body className="d-flex align-items-center p-2">
									<img
										src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
										className="img-fluid rounded-circle"
										alt=""
									/>
									<div className="d-flex flex-column justify-content-center">
										<span className="fw-bold px-2">ITS</span>
										<span className="px-2">Surabaya</span>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default KostByLocation;
