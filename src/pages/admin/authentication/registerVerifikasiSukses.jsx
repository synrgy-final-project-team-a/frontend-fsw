import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"


const RegisterVerifikasiSukses = () => {
	return (
		<>
			<div className="d-none d-lg-block">
				<NavbarComponent routes={PencariRoutes} />
			</div>
			<Container className="text-center mt-5">
				<Row className="justify-content-center">
					<Col xs={12}>
						<div className="text-center mt-5">
							<h1>Verifikasi Sukses</h1>
							<h3>Akun telah terverifikasi. Silahkan login!</h3>
						</div>
					</Col>
					<Col xs={12} lg={6}>
						<div className="text-center mt-5 mx-5">
							<img src="/image/verif-email.png" alt="Email Verification" className="img-fluid" />
						</div>
					</Col>
					<Col xs={12}>
						<Button
							variant="primary"
							as={Link}
							to="/login"
							className="mt-3"
						>
							Login
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default RegisterVerifikasiSukses