import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProfileNav from "../../../components/profile";
import PenyewaLayout from "../../../layouts/penyewa.layout";
import { useTransactionListMutation, useTransactionDetailMutation } from "../../../store/apis/transaction";
import { setNotifNum } from "../../../store/slices/decorSlice";

const Pemberitahuan = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const token = useSelector((state) => state.auth.token);
	const user = useSelector(state => state.user.current)

	const [notif, setNotif] = useState([])

	const [
		getListHit,
		{ isLoading: loadingList, isSuccess: successList, data: dataList }
	] = useTransactionListMutation();

	const [
		getOneHit,
		{ isLoading: loadingOne, isSuccess: successOne, data: dataOne }
	] = useTransactionDetailMutation()

	const goToTransaksi = (e, booking) => {
		e.preventDefault();

		getOneHit({ token: token.access_token, id: booking })
	}

	useEffect(() => {
		getListHit({ token: token.access_token, id: token.profile_id })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (successList) {
			const filterWatched = (el) => {
				return el.watched_tn === false
			}

			const result = dataList.data.content.filter(filterWatched)
			setNotif(result)
			dispatch(setNotifNum(result.length))
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingList])

	useEffect(() => {
		if (successOne) {
			navigate('/penyewa/kos/detail-pengajuan/' + dataOne.data[0].booking_id)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingOne])

	return (
		<PenyewaLayout>
			<Container className="mt-3" id="profile-kelola-kos">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/penyewa", className: "text-decoration-none" }}>
						Beranda
					</Breadcrumb.Item>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/penyewa/profile", className: "text-decoration-none" }}>Profil</Breadcrumb.Item>
					<Breadcrumb.Item active>Pemberitahuan</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="mt-5">
					<Col xs={12} lg={3}>	
						<ProfileNav />
					</Col>
					<Col xs={12} lg={9} className="border rounded px-3 px-lg-5">
						<h5 className="fw-bold mt-5">Pemberitahuan</h5>
						{
							(user.address === null || user.address === "" || user.address === undefined)
								|| (user.city === null || user.city === "" || user.city === undefined)
								|| (user.first_name === null || user.first_name === "" || user.first_name === undefined)
								|| (user.last_name === null || user.last_name === "" || user.last_name === undefined)
								|| (user.phone_number === null || user.phone_number === "" || user.phone_number === undefined)
								|| (user.bank_account === null || user.bank_account === "" || user.bank_account === undefined)
								|| (user.bank_name === null || user.bank_name === "" || user.bank_name === undefined)
								|| (user.bank_username === null || user.bank_username === "" || user.bank_username === undefined)
								|| (user.province === null || user.province === "" || user.province === undefined) ?
								<Row className="gy-3 card-kelola my-4">
									<Col xs={12}>
										<Card bg="outline-primary">
											<Card.Body className="d-flex flex-column">
												<Card.Title className="fw-bold">Lengkapi Profilmu</Card.Title>
												<Card.Text>
													Lengkapi profilmu agar kamu mendapatkan promo yang menarik dari kosanku dan memudahkan pemilik kos mengetahui profil kamu
												</Card.Text>
												<Card.Text className="text-end">
													{new Date(user.updated_at).toDateString()}
												</Card.Text>
											</Card.Body>
										</Card>
									</Col>
								</Row> : ""
						}
						{
							notif.length !== 0 ?
								notif.map((el, i) => {
									return (
										<Row className="gy-3 card-kelola my-4" key={i}>
											<Col xs={12}>
												<Card bg="outline-primary">
													{
														el.status === "POSTED" ?
															<Card.Body className="d-flex flex-column">
																<Card.Title className="fw-bold">Booking Baru</Card.Title>
																<Card.Text>
																	Penyewa menambahkan booking baru
																</Card.Text>
																<Card.Text>
																	{el.name} baru saja memesan {el.kost_name}. Harap menyetujui atau menolak booking tersebut!
																</Card.Text>
																<div className="d-flex justify-content-between align-items-center">
																	<Button variant="outline-primary"
																		onClick={e => goToTransaksi(e, el.booking_id)}
																	>
																		Baca
																	</Button>
																	<Card.Text>
																		{new Date(el.updated_at).toDateString()}
																	</Card.Text>
																</div>
															</Card.Body> :
															el.status === "CONFIRMED" ?
																<Card.Body className="d-flex flex-column">
																	<Card.Title className="fw-bold">Berhasil Menyetujui</Card.Title>
																	<Card.Text>
																		Pengajuan kos oleh {el.name} pada {el.kost_name} telah disetujui olehmu!
																	</Card.Text>
																	<div className="d-flex justify-content-between align-items-center">
																		<Button variant="outline-primary"
																			onClick={e => goToTransaksi(e, el.booking_id)}
																		>
																			Baca
																		</Button>
																		<Card.Text>
																			{new Date(el.updated_at).toDateString()}
																		</Card.Text>
																	</div>
																</Card.Body> :
																el.status === "REVIEWED" ?
																	<Card.Body className="d-flex flex-column">
																		<Card.Title className="fw-bold">Pembayaran Kos</Card.Title>
																		<Card.Text>
																			Wah ada pembayaran baru
																		</Card.Text>
																		<Card.Text>
																			Pembayaran oleh {el.name} telah dilakukan. Harap melakukan konfirmasi atau menolak booking tersebut!
																		</Card.Text>
																		<div className="d-flex justify-content-between align-items-center">
																			<Button variant="outline-primary"
																				onClick={e => goToTransaksi(e, el.booking_id)}
																			>
																				Baca
																			</Button>
																			<Card.Text>
																				{new Date(el.updated_at).toDateString()}
																			</Card.Text>
																		</div>
																	</Card.Body> :
																	el.status === "APPROVED" ?
																		<Card.Body className="d-flex flex-column">
																			<Card.Title className="fw-bold">Berhasil Transaksi</Card.Title>
																			<Card.Text>
																				Pengajuan kos berhasil!
																			</Card.Text>
																			<Card.Text>
																				Pengajuan kos oleh {el.name} berhasil! Harap menyiapkan tempat tinggal kosan agar {el.name} dapat menempatinya
																			</Card.Text>
																			<div className="d-flex justify-content-between align-items-center">
																				<Button variant="outline-primary"
																					onClick={e => goToTransaksi(e, el.booking_id)}
																				>
																					Baca
																				</Button>
																				<Card.Text>
																					{new Date(el.updated_at).toDateString()}
																				</Card.Text>
																			</div>
																		</Card.Body> :
																		el.status === "REJECTED" ?
																			<Card.Body className="d-flex flex-column">
																				<Card.Title className="fw-bold">Berhasil Menolak</Card.Title>
																				<Card.Text>
																					Pengajuan kos oleh {el.name} telah ditolak. Mungkin lain hari akan lebih baik!
																				</Card.Text>
																				<div className="d-flex justify-content-between align-items-center">
																					<Button variant="outline-primary"
																						onClick={e => goToTransaksi(e, el.booking_id)}
																					>
																						Baca
																					</Button>
																					<Card.Text>
																						{new Date(el.updated_at).toDateString()}
																					</Card.Text>
																				</div>
																			</Card.Body> :
																			el.status === "CANCELLED" ?
																				<Card.Body className="d-flex flex-column">
																					<Card.Title className="fw-bold">Pengajuan Dibatalkan</Card.Title>
																					<Card.Text>
																						Penyewa membatalkan pesanan! :(
																					</Card.Text>
																					<div className="d-flex justify-content-between align-items-center">
																						<Button variant="outline-primary"
																							onClick={e => goToTransaksi(e, el.booking_id)}
																						>
																							Baca
																						</Button>
																						<Card.Text>
																							{new Date(el.updated_at).toDateString()}
																						</Card.Text>
																					</div>
																				</Card.Body> : ""
													}
												</Card>
											</Col>
										</Row>
									)
								}) : ""
						}
					</Col>
				</Row>
			</Container>
		</PenyewaLayout>
	);
}

export default Pemberitahuan