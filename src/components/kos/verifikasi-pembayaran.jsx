import { Badge, Button, Card, Col, Row } from "react-bootstrap"

const VerifikasiPembayaran = () => {
	return (
		<Row className="mt-3">
			<h3>Verifikasi Pembayaran</h3>
			<Col xs={12} lg={6}>
				<Card className="flex-row">
					<Card.Img src="/banner.png" />
					<Card.Body className="d-flex flex-column">
						<Card.Title>Kos Graha Mulia</Card.Title>
						<Card.Text>
							Jl.Kol Hadijanto No.117  Banaran, Sekaran, Semarang, Jawa Tenggah
						</Card.Text>
						<div>
							<Badge bg="outline-primary">
								Campur
							</Badge>{' '}
						</div>
						<br />
						<div className="d-flex flex-row-reverse">
							<Button variant="danger" size="sm" className="m-1">Tolak</Button>
							<Button variant="primary" size="sm" className="m-1">Verifikasi</Button>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default VerifikasiPembayaran;