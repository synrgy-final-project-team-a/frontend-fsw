import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row, Alert } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useApproveTransactionMutation, useConfirmTransactionMutation, useRejectTransactionMutation, useTransactionListMutation } from "../../../store/apis/transaction";

const PengajuanSewa = () => {

	const [transactionListHit, { isLoading, isSuccess, data }] = useTransactionListMutation();
	const token = useSelector(state => state.auth.token.access_token);
	const [confirmTransactionHit, { isSuccess: confirmSuccess, isLoading: loadingConfirm, isError: confirmError }] = useConfirmTransactionMutation();
	const [approveTransactionHit, { isSuccess: approveSuccess, isLoading: loadingApprove, isError: approveError }] = useApproveTransactionMutation();
	const [rejectTransactionHit, { isSuccess: rejectSuccess, isLoading: loadingReject, isError: rejectError }] = useRejectTransactionMutation();

	const userData = useSelector(state => state.auth.token.profile_id);
	const [alert, setAlert] = useState({ "show": false });

	const handleConfirm = (e, id) => {
		e.preventDefault();

		let confirm = window.confirm("Konfirmasi pengajuan kos?");

		if (confirm) {
			confirmTransactionHit({ token: token, id: id });
		}
	}

	const handleApprove = (e, id) => {
		e.preventDefault();

		let confirm = window.confirm("Setujui pengajuan kos?");

		if (confirm) {
			approveTransactionHit({ token: token, id: id });
		}
	}

	const handleReject = (e, id) => {
		e.preventDefault();

		let confirm = window.confirm("Tolak pengajuan kos?");

		if (confirm) {
			rejectTransactionHit({ token: token, id: id });
		}
	}



	useEffect(() => {
		transactionListHit({ token: token, id: userData });
		console.log(userData)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (confirmSuccess) {
			setAlert({
				"variant": "success",
				"message": "Behasil konfirmasi!",
				"show": true
			})
			transactionListHit({ token: token, id: userData });
		}

		if (confirmError) {
			setAlert({
				"variant": "danger",
				"message": "Konfirmasi gagal!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingConfirm])

	useEffect(() => {
		if (approveSuccess) {
			setAlert({
				"variant": "success",
				"message": "Behasil menyetujui penyewaan kos!",
				"show": true
			})
			transactionListHit({ token: token, id: userData });
		}

		if (approveError) {
			setAlert({
				"variant": "danger",
				"message": "Gagal menyetujui penyewaan kos!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingApprove])

	useEffect(() => {
		if (rejectSuccess) {
			setAlert({
				"variant": "success",
				"message": "Pengajuan sewa kos ditolak!",
				"show": true
			})
			transactionListHit({ token: token, id: userData });
		}

		if (rejectError) {
			setAlert({
				"variant": "danger",
				"message": "Gagal tolak pengajuan sewa kos!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingReject])

	useEffect(() => {
		if (confirmSuccess) {
			setAlert({
				"variant": "success",
				"message": "Behasil konfirmasi!",
				"show": true
			})
			transactionListHit({ token: token, id: userData });
		}

		if (confirmError) {
			setAlert({
				"variant": "danger",
				"message": "Konfirmasi gagal!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingConfirm])
	return (
		<>
			<Row >
				{
					alert.show ?
						<Alert className="mt-3" variant={alert.variant} onClose={() => setAlert({ "show": false })} dismissible>
							{alert.message}
						</Alert> :
						<></>
				}

				{isLoading ?
					<h5>Sedang Mengambil Data</h5> :
					isSuccess ?

						data.data.content.map((el, i) => {
							return (
								<Col xs={12} lg={4} className="mb-2">
									<Card className="flex-row border-0" key={i}>
										<Card.Img src="/banner.png" />
										<Card.Body className="d-flex flex-column pe-0 pb-0 pt-1">
											{ el.status === "REVIEWED" || el.status === "APPROVED" ?
												<Card.Title className="fw-bold fs-5 lh-base fs-6">Pembayaran Sewa Kos</Card.Title> :
												el.status === "REJECTED" ? 
												"" :
												<Card.Title className="fw-bold fs-5 lh-base fs-6">Pengajuan Sewa Kos</Card.Title>
											}
											
											<Card.Text className="mb-1 nama-kos">
												{el.kost_name}
											</Card.Text>
											<Card.Text className="mb-0 alamat-kos">
												{el.address}
											</Card.Text>
											<div className="d-flex flex-row-reverse py-1">
												{el.status === "CONFIRMED" ?
													<Badge className="status-confirmed py-0" bg="none">
														Pengajuan Telah Dikonfirmasi
														<span className="px-1"><img src="/tick-circle.png" alt="" /></span>
													</Badge> :
													el.status === "POSTED" ?
														<Badge className="status-posted py-0" bg="none">
															Menunggu Konfirmasi Anda
															<span className="px-1"><img src="/clock-yellow.png" alt="" /></span>
														</Badge> :
														el.status === "CANCELLED" ?
															<Badge className="status-cancelled py-0" bg="none">
																Pengajuan Sewa Dibatalkan
																<span className="px-1"><img src="/close-circle.png" alt="" /></span>
															</Badge> :
															el.status === "REJECTED" ?
																<Badge className="status-cancelled py-0" bg="none">
																	Ditolak
																	<span className="px-1"><img src="/close-circle.png" alt="" /></span>
																</Badge> :
																el.status === "APPROVED" ?
																<Badge className="status-confirmed py-0" bg="none">
																	Pembayaran Telah Diterima
																	<span className="px-1"><img src="/tick-circle.png" alt="" /></span>
																</Badge> :
																el.status === "REVIEWED" ?
																	<Badge className="status-posted py-0" bg="none">
																		Menunggu Persetujuan Anda
																		<span className="px-1"><img src="/clock-yellow.png" alt="" /></span>
																	</Badge> :
																""
												}

											</div>
											{/* {el.status === "POSTED" ?
											<div className="d-flex flex-row-reverse mt-2">
												<Button className="btn-terima" onClick={e => handleConfirm(e, el.transaction_id)}>Konfirmasi</Button>
												<Button className="btn-tolak me-4" onClick={e => handleReject(e, el.transaction_id)}>Tolak</Button>
											</div> :

											el.status === "REVIEWED" ?
											<div className="d-flex flex-row-reverse mt-2">
												<Button className="btn-terima" onClick={e => handleApprove(e, el.transaction_id)}>Setujui</Button>
												<Button className="btn-tolak me-4" onClick={e => handleReject(e, el.transaction_id)}>Tolak</Button>
											</div> :
											""
											} */}
											{el.status === "REJECTED" ?
											"" :
											<div className="d-flex flex-row-reverse">
												<Button as={Link} to={`/penyewa/kos/detail-pengajuan/${el.booking_id}`} variant="primary" size="sm" className="m-1">
													<img className="mb-1 me-2" src="/document-forward.png" alt="" />
													Pratinjau</Button>
											</div>
											}
											
										</Card.Body>
									</Card>
								</Col>
							)



						})

						: <h5>Gagal mengambil data</h5>
				}


			</Row>



		</>
	)
}

export default PengajuanSewa;