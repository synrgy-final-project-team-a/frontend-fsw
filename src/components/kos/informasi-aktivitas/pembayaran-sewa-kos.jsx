import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

const PembayaranSewa = () => {
    return (
        <>
            <Row className="mt-3">
				<Col xs={12} lg={4}>
					<Card className="flex-row border-0">
						<Card.Img src="/banner.png" />
						<Card.Body className="d-flex flex-column pe-0 pb-0 pt-1">
							<Card.Title className="fw-bold fs-5 lh-base fs-6">Pembayaran Sewa Kos</Card.Title>
							{/* <span><img className="d-flex flex-row-reverse" src="/tick-circle.png" alt="" /></span> */}
							<Card.Text className="mb-1 nama-kos">
							Kos Graha Mulia
							</Card.Text>
							<Card.Text className="mb-0 alamat-kos">
								Jl.Kol Hadijanto No.117  Banaran, Sekaran, Semarang, Jawa Tenggah
							</Card.Text>
							<div className="d-flex flex-row-reverse py-1">
								<Badge className="status py-0" bg="none">
									Pengajuan Telah Diterima
									<span className="px-1"><img src="/tick-circle.png" alt="" /></span>
								</Badge>{' '}
							</div>
							<div className="d-flex flex-row-reverse">
								<Button as={Link} to="" variant="primary" size="sm" className="m-1">
									<img className="mb-1 me-2" src="/document-forward.png" alt="" />
									Pratinjau</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
        </>
    )    
}

export default PembayaranSewa;