import { Button, Card, Col, Container, Row } from "react-bootstrap";
import PencarianLayout from "../../../layouts/pencarian.layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchKeywordMutation } from "../../../store/apis/kos";
import { useSelector } from "react-redux";

const Pencarian = () => {
	const navigate = useNavigate()

	const [keyword, setKeyword] = useState("")

	const userProvince = useSelector(state => state.user.current.province)

	const [
		cariKeywordHit,
		{ isLoading, isSuccess, data }
	] = useSearchKeywordMutation()

	const handleLocationClick = (province, city) => {
		navigate(`/pencarian/${province.toLowerCase()}/${city.toLowerCase()}`)
	}

	const handleKostClick = (id) => {
		navigate(`/kos/${id}`)
	}

	useEffect(() => {
		if (keyword !== "") {
			cariKeywordHit(keyword)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword])

	return (
		<PencarianLayout setKeywordnya={setKeyword}>
			<Container className="mt-5">
				{
					isLoading ?
						<Row className="mt-5">
							<Col xs={12} className="text-center">
								<h3>Loading...</h3>
							</Col>
						</Row> :
						isSuccess && keyword !== "" ?
							<Row>
								<Col xs={12}>
									<p className="text-neutral fw-semibold">Pilih salah satu area di bawah ini </p>
									<h4 className="text-neutral fw-semibold">Area</h4>
									<Row className="g-3">
										{
											data.data.location.length === 0 ?
												<Col xs={12} className="text-center">
													<h4>Area tidak ditemukan</h4>
												</Col> :
												data.data.location.map((el, i) => {
													return (
														<Col xs={12} lg={6} key={i}>
															<Card bg="outline-primary" className="cursor-pointer" onClick={() => handleLocationClick(el.province, el.city)}>
																<Card.Body className="d-flex align-items-center">
																	<h2 className="me-3 mb-0"><FontAwesomeIcon icon={faLocationDot} /></h2>
																	<div>
																		<Card.Text className="fw-bold mb-0">{el.province}</Card.Text>
																		<Card.Text className="text-muted">{el.city}</Card.Text>
																	</div>
																</Card.Body>
															</Card>
														</Col>
													)
												})
										}
									</Row>
								</Col>
								<Col xs={12}>
									<h4 className="text-neutral fw-semibold mt-5">Nama Kos</h4>
									<Row className="g-3">
										{
											data.data.kost.length === 0 ?
												<Col xs={12} className="text-center">
													<h4>Kos tidak ditemukan</h4>
												</Col> :
												data.data.kost.map((el, i) => {
													return (
														<Col xs={12} lg={6} key={i}>
															<Card bg="outline-primary" className="cursor-pointer" onClick={() => handleKostClick(el.kost_id)}>
																<Card.Body className="d-flex align-items-center">
																	<h2 className="me-3 mb-0"><FontAwesomeIcon icon={faHouse} /></h2>
																	<Card.Text className="fw-bold mb-0">{el.kost_name}</Card.Text>
																</Card.Body>
															</Card>
														</Col>
													)
												})
										}
									</Row>
								</Col>
							</Row> :
							<Row>
								{
									userProvince !== undefined ?
										<Col xs={12} className="mb-5">
											<Button variant="outline-primary" as={Link} to={"/pencarian/" + (userProvince)}>
												Cari Kosan Terdekat{" "}
												<FontAwesomeIcon icon={faLocationDot} />
											</Button>
										</Col> : ""
								}
								<Col xs={12}>
									<p className="text-neutral fw-semibold">Pencarian Populer</p>
									<Row className="g-3">
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/jakarta">
												Jakarta
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/bandung">
												Bandung
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/malang">
												Malang
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/semarang">
												Semarang
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/magelang">
												Magelang
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/kudus">
												Kudus
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/pati">
												Pati
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/yogyakarta">
												Yogyakarta
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/depok">
												Depok
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/bogor">
												Bogor
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/salatiga">
												Salatiga
											</Button>
										</Col>
										<Col xs={6} lg={2} className="d-grid">
											<Button variant="outline-primary" as={Link} to="/pencarian/bekasi">
												Bekasi
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
				}

			</Container>
		</PencarianLayout>
	);
};

export default Pencarian;
