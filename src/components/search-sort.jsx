import { Col, Row } from "react-bootstrap";

const SortComponent = ({ loadKost, payloadQuery, paramsQuery, pageSetter, listSetter, displaySort }) => {

	const handleSort = (e, sort, type) => {
		e.preventDefault()

		let payload = { ...payloadQuery }

		payload["sort-by"] = sort
		payload["order-type"] = type

		paramsQuery(payloadParams => ({ ...payloadParams, ...payload }))

		pageSetter(0)
		listSetter([])
		loadKost({ ...payload, "page": 0, "size": 6 })
		displaySort('sort')
	}

	return (
		<div>
			<h4 className="fw-bold mt-4">Sort</h4>
			<Row>
				<Col xs={12} lg={6}>
					<p
						className={
							"cursor-pointer p-2" +
							((payloadQuery["sort-by"] === "price" && payloadQuery["order-type"] === "asc") ?
								" bg-primary text-white" : "")
						}
						onClick={e => handleSort(e, "price", "asc")}
					>Harga Terendah</p>
					<p
						className={
							"cursor-pointer p-2" +
							((payloadQuery["sort-by"] === "price" && payloadQuery["order-type"] === "desc") ?
								" bg-primary text-white" : "")
						}
						onClick={e => handleSort(e, "price", "desc")}
					>Harga Tertinggi</p>
					<p
						className={
							"cursor-pointer p-2"
						}
					>Terpopuler</p>
					<p
						className={
							"cursor-pointer p-2"
						}
					>Terdekat</p>
					<p
						className={
							"cursor-pointer p-2"
						}
					>Rating Tertinggi</p>
				</Col>
			</Row>
		</div>
	);
};

export default SortComponent;
