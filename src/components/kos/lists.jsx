import { Badge, Button, Card, Col, Row } from "react-bootstrap"

const ListKos = () => {
	return (
		<div className="mt-3">
			<Row className="g-5">
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
								<Button variant="outline-secondary" size="sm" className="m-1">Edit</Button>
								<Button variant="outline-danger" size="sm" className="m-1">Hapus</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
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
								<Button variant="secondary" size="sm" className="m-1">Edit</Button>
								<Button variant="danger" size="sm" className="m-1">Hapus</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
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
								<Button variant="secondary" size="sm" className="m-1">Edit</Button>
								<Button variant="danger" size="sm" className="m-1">Hapus</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
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
								<Button variant="secondary" size="sm" className="m-1">Edit</Button>
								<Button variant="danger" size="sm" className="m-1">Hapus</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default ListKos