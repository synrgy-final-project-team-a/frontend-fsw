import { faFilter, faMars, faSortAmountAsc, faVenus, faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import FilterComponent from "../../../components/search-filter"
import SortComponent from "../../../components/search-sort"
import PencariLayout from "../../../layouts/pencari.layout"
import { useGetListMutation } from "../../../store/apis/kos"
import { searchIsBottom, searchIsTop, setSearchText } from "../../../store/slices/decorSlice"
import { rupiahFormat } from "../../../store/utils/format"

const HasilPencarian = () => {
	const params = useParams()
	const dispatch = useDispatch()

	const [payloadParams, setPayloadParams] = useState({})
	const [page, setPage] = useState(0)
	const [isEnded, setIsEnded] = useState(false)
	const [list, setList] = useState([])

	const [displayFilter, setDisplayFilter] = useState(false)
	const [displaySort, setDisplaySort] = useState(false)

	const containerRef = useRef()

	const [
		getListHit,
		{ isError, isSuccess, isLoading, data }
	] = useGetListMutation()

	const handleScroll = () => {
		if (containerRef) {
			const bottom = containerRef.current.getBoundingClientRect().bottom
			if (bottom < window.innerHeight - 70) {
				getListHit({ ...payloadParams, "page": page + 1, "size": 6 })
			}
		}
		return
	}

	const handleFilterSortClick = (type) => {
		if (type === "sort") {
			if (displaySort) {
				setDisplaySort(false)
			} else {
				setDisplayFilter(false)
				setDisplaySort(true)
			}
		}
		if (type === "filter") {
			if (displayFilter) {
				setDisplayFilter(false)
			} else {
				setDisplaySort(false)
				setDisplayFilter(true)
			}
		}
	}

	useEffect(() => {
		dispatch(searchIsTop())

		let payload = {}

		if (params.province !== undefined) {
			payload.province = params.province
		}

		if (params.city !== undefined) {
			payload.city = params.city
		}

		payload.price_minimum = 0
		payload.price_maximum = 100000000

		payload.duration_type = "MONTHLY"

		payload["sort-by"] = "price"
		payload["order-type"] = "asc"

		dispatch(setSearchText(params.province))
		setPayloadParams(payloadParams => ({ ...payloadParams, ...payload }))
		getListHit({ ...payload, "page": page, "size": 6 })

		return () => {
			dispatch(searchIsBottom())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
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
						<Button variant="warning" size="sm" className="mx-2" onClick={e => handleFilterSortClick("sort")}>
							<FontAwesomeIcon icon={faSortAmountAsc} />{" "}
							Urutkan
						</Button>
						<Button variant="warning" size="sm" className="mx-2" onClick={e => handleFilterSortClick("filter")}>
							<FontAwesomeIcon icon={faFilter} />{" "}
							Filter
						</Button>
					</Col>
				</Row>
				{
					displayFilter ?
						<FilterComponent
							loadKost={getListHit}
							payloadQuery={payloadParams}
							paramsQuery={setPayloadParams}
							pageSetter={setPage}
							listSetter={setList}
							displayFilter={handleFilterSortClick}
						/> :
						displaySort ?
							<SortComponent
								loadKost={getListHit}
								payloadQuery={payloadParams}
								paramsQuery={setPayloadParams}
								pageSetter={setPage}
								listSetter={setList}
								displaySort={handleFilterSortClick}
							/> :
							<Row className="g-4 mt-0" ref={containerRef}>
								{
									list.length !== 0 ?
										list.map((el, i) => {
											return (
												<Col xs={12} lg={4} key={i}>
													<Card className="kos-card bg-outline-primary text-decoration-none" as={Link} to={"/kos/" + el.kost_id}>
														<Card.Img variant="top" src={el.front_building_foto} alt={el.kost_name} />
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
				}
			</Container>
		</PencariLayout>
	)
}

export default HasilPencarian