import { useEffect } from "react"
import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useGetListByPenyewaMutation } from "../../store/apis/kos"

const ListKos = () => {

	const profileId = useSelector(state => state.auth.token.profile_id)

	const [
		getListHit,
		{ isLoading, isSuccess, data }
	] = useGetListByPenyewaMutation()

	useEffect(() => {
		const pageList = 0
		const sizeList = 100
		getListHit({ idProfile: profileId, page: pageList, size: sizeList })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="mt-3">
			<Row className="g-5">
				{
					isLoading ?
						<h1>Loading....</h1> :
						isSuccess ?
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
													<Button variant="outline-secondary" size="sm" className="m-1">Edit</Button>
													<Button variant="outline-danger" size="sm" className="m-1">Hapus</Button>
												</div>
											</Card.Body>
										</Card>
									</Col>
								)
							})
							:
							<h1>Error.. </h1>
				}
			</Row>
		</div>
	)
}

export default ListKos