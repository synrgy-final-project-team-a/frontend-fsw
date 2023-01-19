import { Button, Col, Container, Row } from "react-bootstrap"
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
				<Row className="mt-5 align-items-center">
					<Col xs={12} lg={6}>
						<Button>
							asdasd
						</Button>
						<img src="./pencari.png" alt="..." />
						<p className="text-subtitle">Pencari Kos</p>
					</Col>
					{/* <Col className="vertical-line"></Col> */}
					<Col>
						<img src="./penyewa.png" alt="..." />
						<p className="text-subtitle">Penyedia Kos</p>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default RegisterAs