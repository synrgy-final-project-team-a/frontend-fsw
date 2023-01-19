import { Col, Container, Row } from "react-bootstrap"
import NavbarComponent from "../../components/navbar"
import PencariRoutes from "../../routes/pencari"

const RegisterAs = () => {
	return (
		<>
			<NavbarComponent routes={PencariRoutes} />
			<Container className="mt-5">
				<h1 className="text-center text-title">Login Yuk</h1>
				<p className="text-center text-subtitle">
					Saya ingin login sebagai
				</p>
				<Row className="mt-5">
					<Col xs={12} lg={6} className="px-lg-5">
						<a href="/register/pencari">
							<img src="/pencari.png" className="img-fluid" alt="..." />
							<p className="text-subtitle text-dark">Pencari Kos</p>
						</a>
					</Col>
					{/* <Col className="vertical-line"></Col> */}
					<Col xs={12} lg={6} className="px-lg-5">
						<a href="/register/penyewa">
							<img src="/penyewa.png" className="img-fluid" alt="..." />
							<p className="text-subtitle text-dark">Penyedia Kos</p>
						</a>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default RegisterAs