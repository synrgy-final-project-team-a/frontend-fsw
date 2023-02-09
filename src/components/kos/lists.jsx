import { useEffect, useState } from "react"
import { Alert, Badge, Button, Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDeleteKosByPenyewaMutation, useGetListByPenyewaMutation } from "../../store/apis/kos"

const ListKos = () => {

	const profileId = useSelector(state => state.auth.token.profile_id)

	const [alert, setAlert] = useState({})

	const [
		getListHit,
		{ isLoading, isSuccess, isError, data }
	] = useGetListByPenyewaMutation()

	const [
		deleteHit,
		{ isLoading: loadingDelete, isSuccess: successDelete, isError: errorDelete }
	] = useDeleteKosByPenyewaMutation()

	const handleDeleteKos = (e, id, name) => {
		e.preventDefault()

		let confirm = window.confirm(`Apakah anda yakin ingin menghapus ${name}?`)

		if (confirm) {
			deleteHit(id)
		}
	}

	useEffect(() => {
		if (successDelete) {
			setAlert({
				variant: "success",
				message: "Berhasil menghapus kos!",
				show: true
			})

			const pageList = 0
			const sizeList = 100
			getListHit({ idProfile: profileId, page: pageList, size: sizeList })
		}

		if (errorDelete) {
			setAlert({
				variant: "danger",
				message: "Gagal menghapus kos!",
				show: true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingDelete])

	useEffect(() => {
		const pageList = 0
		const sizeList = 100
		getListHit({ idProfile: profileId, page: pageList, size: sizeList })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="mt-3">
			<Row className="g-3">
				{
					alert.hasOwnProperty('message') && alert.message !== "" && alert.show === true ?
						<Col xs={12}>
							<Alert variant={alert.variant} dismissible onClose={e => setAlert({ show: false })}>
								{alert.message}
							</Alert>
						</Col> :
						""
				}
				{
					isLoading ?
						<h1>Loading....</h1> :
						isSuccess ?
							data.data.content.length !== 0 ?
								data.data.content.map((el, i) => {
									return (
										<Col xs={12} lg={6} key={i}>
											<Card bg="outline-primary" className="flex-row">
												<Card.Img src="/banner.png" />
												<Card.Body className="d-flex flex-column">
													<Card.Title>{el.kostName}</Card.Title>
													<Card.Text>
														{el.address}
													</Card.Text>
													<div>
														{
															el.kostTypeMan === true ?
																<Badge bg="outline-primary">
																	Putra
																</Badge> :
																""
														}
														{
															el.kostTypeWoman === true ?
																<Badge bg="outline-warning">
																	Putri
																</Badge> :
																""
														}
														{
															el.kostTypeMixed === true ?
																<Badge bg="outline-info">
																	Campuran
																</Badge> :
																""
														}
													</div>
													<br />
													<div className="d-flex flex-row-reverse">
														<Button variant="outline-secondary" size="sm" className="m-1"
															disabled={loadingDelete}
														>Edit</Button>
														<Button variant="outline-danger" size="sm" className="m-1"
															disabled={loadingDelete}
															onClick={e => handleDeleteKos(e, el.id, el.kostName)}
														>Hapus</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									)
								}) :
								<h3>Tidak ada kos</h3> :
							isError ?
								<h1>Error.</h1> :
								""

				}
			</Row>
		</div>
	)
}

export default ListKos