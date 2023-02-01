import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function BestKost() {
	return (
		<Container className="mb-5">
			<h2 className="mb-3">Cari Kosan Terbaik dari Kami</h2>
			<Row className="g-4">
				{
					[1, 2, 3, 4, 5, 6].map((el) => {
						return (
							<Col xs={12} lg={4} key={el}>
								<Card className="kos-card bg-outline-primary text-decoration-none" as={Link} to="/kos/detail">
									<Card.Img variant="top" src="/kos-giya-putri.png" />
									<Card.Body>
										<Card.Title>Kos Giya Putri</Card.Title>
										<Card.Text className="kos-location mb-1">Cempaka Timur, Semarang</Card.Text>
										<Card.Text className="kos-price mb-1">
											<span className="fw-bold">Rp. 1.500.000</span> / Bulan
										</Card.Text>
										<div className="d-flex justify-content-between">
											<div className="tag">
												<Badge bg="outline-primary">
													<img src="/woman.png" alt="" />{' '}
													Putri
												</Badge>
											</div>
											<div className="favorite">
												<img src="/like.png" alt="..." />
											</div>
										</div>
									</Card.Body>
								</Card>
							</Col>
						)
					})
				}
			</Row>
		</Container>
	);
}

export default BestKost;
