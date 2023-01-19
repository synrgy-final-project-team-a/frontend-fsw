import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"

const loginAs = () => {
	return (
		<>
			<div className="d-none d-lg-block">
				<NavbarComponent routes={PencariRoutes} />
			</div>
			<Container className="mt-5">
				<h1 className="text-center text-title">Login Yuk</h1>
				<p className="text-center text-subtitle">
					Saya ingin login sebagai
				</p>
				<Row className="mt-5">
					<Col xs={12} lg={6} className="px-lg-5">
						<Link to="/login/pencari">
							<img src="/pencari.png" className="img-fluid" alt="..." />
							<p className="text-subtitle text-dark">Pencari Kos</p>
						</Link>
					</Col>
					<Col xs={12} lg={6} className="px-lg-5">
						<Link to="/login/penyewa">
							<img src="/penyewa.png" className="img-fluid" alt="..." />
							<p className="text-subtitle text-dark">Penyedia Kos</p>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default loginAs