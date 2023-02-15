import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faCheckCircle,
	faHouse,
	faWallet,
	faFolder,
	faDownload
} from "@fortawesome/free-solid-svg-icons";
import PencariLayout from "../../../layouts/pencari.layout";
import ProfileNav from "../../../components/profile";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetListbyPencariMutation } from "../../../store/apis/transaksi";
import { durationToDurasi, indoDateFormat, rupiahFormat } from "../../../store/utils/format";

const HistoriTransaksi = () => {
	const navigate = useNavigate()

	const [display, setDisplay] = useState({})
	const idProfile = useSelector((state) => state.auth.token.profile_id);
	const [list, setList] = useState([])

	const [getListHit, { isLoading, isSuccess, isError, data }] =
		useGetListbyPencariMutation();

	useEffect(() => {
		getListHit({ profileId: idProfile });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isSuccess) {
			console.log(data.data.content)
			const filterWatched = (el) => {
				return (el.status === "REVIEWED" || el.status === "APPROVED")
			}
			
			const result = data.data.content.filter(filterWatched)
			setList(result)
		}

		if (isError) {
			navigate("/")
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	const handleDisplay = (e, i) => {
		e.preventDefault()
		let newDisplay = { ...display }
		newDisplay[i] = true
		setDisplay(newDisplay)
	}

	return (
		<PencariLayout>
			<Container className="mt-3" id="profile-kelola-kos">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none" }}>
						Beranda
					</Breadcrumb.Item>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile", className: "text-decoration-none" }}>Profil</Breadcrumb.Item>
					<Breadcrumb.Item active>Histori Transaksi</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="mt-5">
					<Col xs={12} lg={3}>
						<ProfileNav />
					</Col>
					<Col xs={12} lg={9} className="border rounded px-3 px-lg-5">
						<h5 className="fw-bold mt-5">Histori Transaksi</h5>
						{
							isLoading ?
								[...Array(3).keys()].map((el, i) => {
									return (
										<Row className="gy-3 my-4" key={i}>
											<Col xs={12}>
												<Card bg="none" className="skeleton" style={{ height: "250px" }}>
													&nbsp;
												</Card>
											</Col>
										</Row>
									)
								}) :
								list.length !== 0 ?
									list.map((el, i) => {
										return (
											<Row className="gy-3 card-kelola my-4" key={i}>
												<Col xs={12}>
													<Card bg="outline-primary">
														<Card.Body className="d-flex flex-column">
															<div className="d-flex justify-content-between align-items-center mb-2">
																<Card.Title className="fw-bold">{el.kost_name}</Card.Title>
																<Card.Text className="text-success">
																	<FontAwesomeIcon icon={faCheckCircle} />{" "}
																	Berhasil
																</Card.Text>
															</div>
															<Card.Text className="mb-1">ID Booking {el.booking_code}</Card.Text>
															<div className="d-flex mb-2 justify-content-between">
																<div className="d-flex align-items-center me-4">
																	<h2 className="me-2 mb-0"><FontAwesomeIcon icon={faHouse} /></h2>
																	<div>
																		<Card.Text className="fw-bold mb-0">{el.kost_name}</Card.Text>
																		<Card.Text className="text-muted">{el.address}</Card.Text>
																	</div>
																</div>
																<div className="d-flex align-items-center">
																	<h2 className="me-2 mb-0"><FontAwesomeIcon icon={faWallet} /></h2>
																	<div>
																		<Card.Text className="text-muted mb-0">Total Pembayaran</Card.Text>
																		<Card.Text className="fw-bold">{rupiahFormat(parseInt(el.price) + 10000)}</Card.Text>
																	</div>
																</div>
															</div>
															<div className="d-flex flex-row-reverse">
																{
																	display && display[i] !== true ?
																		<Button variant="outline-primary" className="m-1" onClick={(e) => handleDisplay(e, i)}>
																			Selengkapnya{" "}
																			<FontAwesomeIcon icon={faAngleDown} />
																		</Button> :
																		""
																}
															</div>
															{
																display && display[i] === true ?
																	<>
																		<hr />
																		<Card.Title className="fw-bold mb-2">Detail Pembayaran</Card.Title>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">ID Booking</Card.Text>
																			<Card.Text>{el.booking_code}</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Tanggal Pembayaran</Card.Text>
																			<Card.Text>{indoDateFormat(el.updated_at)}</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Metode Pembayaran</Card.Text>
																			<Card.Text>Transfer</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Durasi Sewa</Card.Text>
																			<Card.Text>{durationToDurasi(el.duration_type)}</Card.Text>
																		</div>
																		<hr />
																		<Card.Title className="fw-bold mb-2">Total Transaksi</Card.Title>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Bank Tujuan</Card.Text>
																			<Card.Text>{el.bank_name}</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Harga Kos</Card.Text>
																			<Card.Text>{rupiahFormat(el.price)}</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Pembayaran DP</Card.Text>
																			<Card.Text>Rp. 0</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Biaya Layanan</Card.Text>
																			<Card.Text>Rp. 10.000</Card.Text>
																		</div>
																		<div className="d-flex justify-content-between align-items-center mb-2">
																			<Card.Text className="mb-0">Total Pembayaran</Card.Text>
																			<Card.Text>{rupiahFormat(parseInt(el.price) + 10000)}</Card.Text>
																		</div>
																		<hr />
																		<div className="d-flex flex-row-reverse">
																			<Button variant="outline-primary" className="ms-2" as="a" href={el.proof_of_payment} target="_blank" rel="noreferrer">
																				<FontAwesomeIcon icon={faDownload} />{" "}
																				Unduh Bukti Pembayaran
																			</Button>
																			<Button variant="outline-secondary" className="ms-2" as="a" href={"/nota/"+el.booking_id} target="_blank" rel="noreferrer">
																				<FontAwesomeIcon icon={faFolder} />{" "}
																				Nota
																			</Button>
																		</div>
																	</> :
																	""
															}
														</Card.Body>
													</Card>
												</Col>
											</Row>
										)
									}) : ""
						}
					</Col>
				</Row>
			</Container>
		</PencariLayout>
	);
}

export default HistoriTransaksi