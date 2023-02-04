import { faFilter, faMars, faSortAmountAsc, faVenus, faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import PencariLayout from "../../../layouts/pencari.layout"
import { useGetListMutation } from "../../../store/apis/kos"
import { searchIsBottom, searchIsTop, setSearchText } from "../../../store/slices/decorSlice"

const HasilPencarian = () => {
	const params = useParams()
	const dispatch = useDispatch()

	const [payloadParams, setPayloadParams] = useState({})
	const [page, setPage] = useState(0)
	const [isEnded, setIsEnded] = useState(false)
	const [list, setList] = useState([])

	const containerRef = useRef()

	const sortFilter = useSelector(state => state.kos.filterAndSort)

	const [
		getListHit,
		{ isError, isSuccess, isLoading, data }
	] = useGetListMutation()

	const rupiahFormat = (money) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR"
		}).format(money);
	}

	useEffect(() => {
		dispatch(searchIsTop())

		let payload = {}
		if (params.province !== undefined) {
			setPayloadParams(payloadParams => ({ ...payloadParams, "province": params.province }))
			payload.province = params.province
		}

		if (params.city !== undefined) {
			setPayloadParams(payloadParams => ({ ...payloadParams, "city": params.city }))
			payload.city = params.city
		}

		setPayloadParams(payloadParams => ({ ...payloadParams, ...sortFilter }))
		payload = { ...payload, ...sortFilter }

		dispatch(setSearchText(params.province))
		getListHit({ ...payload, "page": page, "size": 12 })

		return () => {
			dispatch(searchIsBottom())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const handleScroll = () => {
			if (containerRef) {
				const bottom = containerRef.current.getBoundingClientRect().bottom
				if (bottom < window.innerHeight - 70) {
					getListHit({ ...payloadParams, "page": page + 1, "size": 12 })
				}
			}
			return
		}

		if (isLoading) {
			window.removeEventListener("scroll", handleScroll);
		}

		if (isSuccess) {
			const datanya = data.data
			setList(list => ([...list, ...datanya]))
			setPage(page => page + 1)

			if (datanya.length !== 0) {
				window.addEventListener("scroll", handleScroll);
			} else {
				console.log(list.length)
				console.log(datanya.length)
				if (list.length !== 0 && datanya.length === 0) {
					setIsEnded(true)
				}
			}
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	return (
		<PencariLayout>
			<Container className="mt-4">
				<Row className="justify-content-between align-items-center">
					<Col xs="auto">
						<h4>Hasil Pencarian</h4>
					</Col>
					<Col xs="auto">
						<span className="mx-2">Urutkan :</span>
						<Button variant="warning" size="sm" className="mx-2">
							<FontAwesomeIcon icon={faSortAmountAsc} />{" "}
							Sort
						</Button>
						<Button variant="warning" size="sm" className="mx-2">
							<FontAwesomeIcon icon={faFilter} />{" "}
							Filter
						</Button>
					</Col>
				</Row>
				<Row className="g-4 mt-0" ref={containerRef}>
					{
						list.length !== 0 ?
							list.map((el, i) => {
								return (
									<Col xs={12} lg={4} key={i}>
										<Card className="kos-card bg-outline-primary text-decoration-none" as={Link} to={"/kos/" + el.kost_id}>
											<Card.Img variant="top" src="/kos-giya-putri.png" />
											<Card.Body>
												<Card.Title>{el.kost_name}</Card.Title>
												<Card.Text className="kos-location mb-1">{el.address}</Card.Text>
												<Card.Text className="kos-location mb-1">{el.city}, {el.province}</Card.Text>
												<Card.Text className="kos-price mb-1">
													<span className="fw-bold">
														{rupiahFormat(el.price)}
													</span> /
													{
														el.duration_type === "DAILY" ?
															"Hari" :
															el.duration_type === "WEEKLY" ?
																"Minggu" :
																el.duration_type === "MONTHLY" ?
																	"Bulan" :
																	el.duration_type === "QUARTER" ?
																		"3 Bulan" :
																		el.duration_type === "SEMESTER" ?
																			"6 Bulan" :
																			el.duration_type === "YEARLY" ?
																				"Tahun" :
																				""
													}
												</Card.Text>
												<div className="d-flex justify-content-between">
													<div className="tag">
														{
															el.kost_type_man === true ?
																<Badge bg="outline-primary">
																	<FontAwesomeIcon icon={faMars} />{" "}
																	Putra
																</Badge> : ""
														}
														{
															el.kost_type_woman === true ?
																<Badge bg="outline-primary">
																	<FontAwesomeIcon icon={faVenus} />{" "}
																	Putri
																</Badge> : ""
														}
														{
															el.kost_type_mixed === true ?
																<Badge bg="outline-primary">
																	<FontAwesomeIcon icon={faVenusMars} />{" "}
																	Campuran
																</Badge> : ""
														}
													</div>
													<div className="favorite">
														<img src="/like.png" alt="..." />
													</div>
												</div>
											</Card.Body>
										</Card>
									</Col>
								)
							}) :
							""
					}
					<Col xs={12} className="text-center">
						<h6 className="fw-bold">
							&nbsp;
							{
								isLoading ?
									"Loading..." :
									isError ?
										"Data gagal diambil" :
										list.length === 0 ?
											"Kos tidak ditemukan" :
											isEnded ?
												"Akhir dari list" :
												""
							}
						</h6>
					</Col>
				</Row>
			</Container>
		</PencariLayout>
	)
}

export default HasilPencarian