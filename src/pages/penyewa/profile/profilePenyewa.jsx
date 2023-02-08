import { faAngleDown, faCalendarDays, faCircleXmark, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Container, Row, Col, Breadcrumb, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfilNav from "../../../components/profile";
import PenyewaLayout from "../../../layouts/penyewa.layout";

const ProfilePenyewa = () => {
	const [display, setDisplay] = useState({})

	const handleDisplay = (e, i) => {
		e.preventDefault()
		let newDisplay = { ...display }
		newDisplay[i] = true
		setDisplay(newDisplay)
	}

	return (
		<PenyewaLayout>
			<Container className="mt-3" id="profile-kelola-kos">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/penyewa", className: "text-decoration-none" }}>
						Dashboard
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Profil</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="mt-5">
					<Col xs={12} lg={3}>
						<ProfilNav />
					</Col>
					<Col xs={12} lg={9} className="border rounded px-3 px-lg-5">
						<h5 className="fw-bold mt-5">Kelola Kos</h5>
						{
							[0, 1, 2].map((el, i) => {
								return (
									<Row className="gy-3 card-kelola my-4" key={i}>
										<Col xs={12}>
											<Card bg="outline-primary">
												<Row className="g-0">
													<Col xs={2} lg={3}>
														<Card.Img src="/banner.png" />
													</Col>
													<Col xs={10} lg={9}>
														<Card.Body className="d-flex flex-column">
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Title className="fw-bold">Kos H.Turiman Banaran {el}</Card.Title>
																<Card.Text className="text-danger">
																	<FontAwesomeIcon icon={faCircleXmark} />{" "}
																	Ditolak Pemilik Kosan
																</Card.Text>
															</div>
															<Card.Text className="mb-1">
																Jl. Banaran No.117, Banaran Sekarang Gunung Pati Semarang Jawa Tenggah
															</Card.Text>
															<Card.Text className="fw-bold mb-2">Tipe A</Card.Text>
															<div className="d-flex mb-2">
																<div className="d-flex align-items-center me-4">
																	<h2 className="me-2 mb-0"><FontAwesomeIcon icon={faCalendarDays} /></h2>
																	<div>
																		<Card.Text className="text-muted mb-0">Tanggal Masuk</Card.Text>
																		<Card.Text className="fw-bold">23 February 2023</Card.Text>
																	</div>
																</div>
																<div className="d-flex align-items-center">
																	<h2 className="me-2 mb-0"><FontAwesomeIcon icon={faClock} /></h2>
																	<div>
																		<Card.Text className="text-muted mb-0">Durasi Sewa</Card.Text>
																		<Card.Text className="fw-bold">Bulanan</Card.Text>
																	</div>
																</div>
															</div>
															<div className="d-flex justify-content-between align-items-center">
																<Card.Text className="mb-0">
																	<span className="fw-bold">Rp. 1.350.000</span> / bulan
																</Card.Text>
																{
																	display && display[i] !== true ?
																		<Button variant="outline-primary" className="m-1" onClick={(e) => handleDisplay(e, i)}>
																			Selengkapnya{" "}
																			<FontAwesomeIcon icon={faAngleDown} />
																		</Button> :
																		""
																}
															</div>
														</Card.Body>
													</Col>
												</Row>
											</Card>
										</Col>
										{
											display && display[i] === true ?
												<Col xs={12} lg={{ span: 9, offset: 3 }}>
													<Card>
														<Card.Body className="d-flex flex-column">
															<Card.Title className="fw-bold mb-2">Data Penghuni Kosan</Card.Title>
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Text className="mb-0">Nama</Card.Text>
																<Card.Text>Dion Kurniawan</Card.Text>
															</div>
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Text className="mb-0">No Handphone</Card.Text>
																<Card.Text>082148372834</Card.Text>
															</div>
														</Card.Body>
													</Card>
												</Col> :
												""
										}
										{
											display && display[i] === true ?
												<Col xs={12} lg={{ span: 9, offset: 3 }}>
													<Card>
														<Card.Body className="d-flex flex-column">
															<Card.Title className="fw-bold mb-2">Informasi Sewa Kosan</Card.Title>
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Text className="mb-0">ID Booking</Card.Text>
																<Card.Text>KOSAN32534543</Card.Text>
															</div>
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Text className="mb-0">Tanggal Sewa</Card.Text>
																<Card.Text>Kamis, 23 Februari 2023</Card.Text>
															</div>
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Text className="mb-0">Tanggal Selesai</Card.Text>
																<Card.Text>Kamis, 23 Maret 2023</Card.Text>
															</div>
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Text className="mb-0">Durasi Sewa</Card.Text>
																<Card.Text>Bulanan</Card.Text>
															</div>
														</Card.Body>
													</Card>
												</Col> :
												""
										}
										{
											display && display[i] === true ?
												<Col xs={12} lg={{ span: 9, offset: 3 }}>
													<hr />
													<div className="d-flex flex-row-reverse">
														<Button variant="primary" className="ms-2">
															Perpanjang  Sewa Lagi
														</Button>
														<Button variant="outline-primary" className="ms-2">
															Cari Kosan Lain
														</Button>
													</div>
												</Col> :
												""
										}
									</Row>
								)
							})
						}
					</Col>
				</Row>
			</Container>
		</PenyewaLayout>
	);
}

export default ProfilePenyewa
