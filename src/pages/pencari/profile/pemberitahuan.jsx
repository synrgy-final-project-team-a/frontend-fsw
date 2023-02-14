import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProfileNav from "../../../components/profile";
import PencariLayout from "../../../layouts/pencari.layout";
import { useGetListbyPencariMutation, useGetOnebyPencariMutation } from "../../../store/apis/transaksi";
import { setNotifNum } from "../../../store/slices/decorSlice";
import { addBooking } from "../../../store/slices/transaksiSlice";

const Pemberitahuan = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const token = useSelector((state) => state.auth.token);
	const user = useSelector(state => state.user.current)

	const [notif, setNotif] = useState([])

	const [
		getListHit,
		{ isLoading: loadingList, isSuccess: successList, data: dataList }
	] = useGetListbyPencariMutation();

	const [
		getOneHit,
		{ isLoading: loadingOne, isSuccess: successOne, data: dataOne }
	] = useGetOnebyPencariMutation();

	const goToTransaksi = (e, booking) => {
		e.preventDefault();

		getOneHit({ bookingId: booking })
	}

	useEffect(() => {
		getListHit({ profileId: token.profile_id });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (successList) {
			const filterWatched = (el) => {
				return el.watched_sk === false
			}

			const result = dataList.data.content.filter(filterWatched)
			setNotif(result)
			dispatch(setNotifNum(result.length))
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingList])

	useEffect(() => {
		if (successOne) {
			const result = dataOne.data[0]
			const initialState = {
				nama: result.name,
				status: result.status,
				duration_type: result.duration_type,
				check_in: result.check_in,
				check_out: result.check_out,
				room_name: result.room_name,
				kost_name: result.kost_name,
				transaction_id: result.transaction_id,
				bank_name: result.bank_name,
				bank_username: result.bank_username,
				bank_account: result.bank_account,
				kost_address: result.address,
				price: result.price,
				booking_code: result.booking_code
			}
			dispatch(addBooking(initialState))
			navigate('/pengajuan-sewa')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingOne])

	return (
		<PencariLayout>
			<Container className="mt-3" id="profile-kelola-kos">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none" }}>
						Beranda
					</Breadcrumb.Item>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile", className: "text-decoration-none" }}>Profil</Breadcrumb.Item>
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
																<Card.Title className="fw-bold">Booking Berhasil</Card.Title>
																<Card.Text>
																	Booking kamu berhasil!
																</Card.Text>
																<Card.Text>
																	Silahkan tunggu konfirmasi booking oleh pemilik {el.kost_name}
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
																	<Card.Title className="fw-bold">Selesaikan Pembayaran</Card.Title>
																	<Card.Text>
																		Akhirnyaaaaa!
																	</Card.Text>
																	<Card.Text>
																		Pengajuan kos mu pada {el.kost_name} akhirnya disetujui oleh pemiliki, segera selesaikan pembayaran agar kamu dapat segara menempati kos tersebut.
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
																		<Card.Title className="fw-bold">Mengirim Bukti Pembayaran Berhasil</Card.Title>
																		<Card.Text>
																			Kamu berhasil mengirimkan bukti pembayaran ke pemilik!
																		</Card.Text>
																		<Card.Text>
																			Silahkan tunggu konfirmasi pembayaran oleh pemilik {el.kost_name}
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
																			<Card.Title className="fw-bold">Tempati Kosmu</Card.Title>
																			<Card.Text>
																				Pengajuan kosmu berhasil!
																			</Card.Text>
																			<Card.Text>
																				Pembayaran kos mu pada {el.kost_name} akhirnya disetujui oleh pemiliki. Segera tempatkan dirimu di kos barumu!
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
																				<Card.Title className="fw-bold">Pengajuan Ditolak</Card.Title>
																				<Card.Text>
																					Mungkin bukan jodohmu :(
																				</Card.Text>
																				<Card.Text>
																					Pengajuan kos mu pada {el.kost_name} ditolak oleh pemilik. Mungkin lain hari akan lebih baik!
																				</Card.Text>
																				<div className="d-flex justify-content-between align-items-center">
																					<Button variant="outline-primary"
																						onClick={e => goToTransaksi(e, el.booking_id)}
																					>
																						Cari kos lain
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
																						Kamu berhasil membatalkan pesanan!
																					</Card.Text>
																					<div className="d-flex justify-content-between align-items-center">
																						<Button variant="outline-primary"
																							onClick={e => goToTransaksi(e, el.booking_id)}
																						>
																							Cari kos lain
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
		</PencariLayout>
	);
}

export default Pemberitahuan