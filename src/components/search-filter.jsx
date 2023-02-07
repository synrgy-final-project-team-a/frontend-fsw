import { Accordion, Col, Form, Row } from "react-bootstrap";

const FilterComponent = ({ loadKos, paramsQuery }) => {

	const handleSubmitFilter = (e) => {
		e.preventDefault()
	}

	return (
		<Form onSubmit={handleSubmitFilter}>
			<h4 className="fw-bold mt-4">Filter</h4>
			<Accordion alwaysOpen flush>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Harga Kos</Accordion.Header>
					<Accordion.Body>
						<Row className="align-items-end">
							<Col xs="auto">
								<Form.Group controlId="formBasicMinimal">
									<Form.Label>Minimal</Form.Label>
									<Form.Control type="number" placeholder="Rp. 750.000" />
								</Form.Group>
							</Col>
							<Col xs="auto">
								<p>---</p>
							</Col>
							<Col xs="auto">
								<Form.Group controlId="formBasicMaksimal">
									<Form.Label>Maksimal</Form.Label>
									<Form.Control type="number" placeholder="Rp. 1.500.000" />
								</Form.Group>
							</Col>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Tipe Kos</Accordion.Header>
					<Accordion.Body>
						<Form.Group controlId="formBasicMinimal">
							<Form.Control type="number" placeholder="Rp. 750.000" />
						</Form.Group>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Form>
		// <div className="container w-50">
		// 	<div>
		// 		<p className="text-neutral fw-bold fs-4 mt-5">Filter</p>
		// 		<p className="text-neutral">Harga Kos</p>
		// 		<div className="d-flex gap-3">
		// 			<div className="w-25">
		// 				<label for="inputMinimal" class="form-label">
		// 					Minimal
		// 				</label>
		// 				<input type="number" id="inputMinimal" class="form-control" />
		// 			</div>

		// 			<div className="w-25">
		// 				<label for="inputMaksimal" class="form-label">
		// 					Maksimal
		// 				</label>
		// 				<input type="number" id="inputMaksimal" class="form-control" />
		// 			</div>
		// 		</div>
		// 		<div
		// 			className="text-neutral mt-4 cursor-pointer"
		// 			onClick={() => setDetectTipeKos(!detectTipeKos)}
		// 		>
		// 			Tipe Kos
		// 			{detectTipeKos ? (
		// 				<img src="/arrow-bottom.svg" alt="..." />
		// 			) : (
		// 				<img src="/arrow-right.svg" alt="..." />
		// 			)}
		// 		</div>
		// 		{detectTipeKos ? (
		// 			<div className="mt-3">
		// 				<div>
		// 					<input
		// 						className="form-check-input me-2"
		// 						type="radio"
		// 						name="tipeKos"
		// 						id="putra"
		// 						value="putra"
		// 					/>
		// 					<label
		// 						className="form-check-label text-neutral"
		// 						for="flexRadioDefault1"
		// 					>
		// 						Putra
		// 					</label>
		// 				</div>
		// 				<div>
		// 					<input
		// 						className="form-check-input me-2"
		// 						type="radio"
		// 						name="tipeKos"
		// 						id="putri"
		// 						value="putri"
		// 					/>
		// 					<label
		// 						className="form-check-label text-neutral"
		// 						for="flexRadioDefault1"
		// 					>
		// 						Putri
		// 					</label>
		// 				</div>

		// 				<input
		// 					className="form-check-input me-2"
		// 					type="radio"
		// 					name="tipeKos"
		// 					id="campur"
		// 					value="campur"
		// 				/>
		// 				<label
		// 					className="form-check-label text-neutral"
		// 					for="flexRadioDefault1"
		// 				>
		// 					campur
		// 				</label>
		// 			</div>
		// 		) : (
		// 			""
		// 		)}
		// 		<div className="text-neutral mt-4 cursor-pointer">
		// 			Durasi Kos
		// 			<img src="/arrow-right.svg" alt="..." />
		// 		</div>
		// 		<div className="text-neutral mt-4">
		// 			Rating
		// 			<div className="d-flex gap-2 mt-2">
		// 				<img src="/rate-1-star.svg" alt="..." className="cursor-pointer" />
		// 				<img src="/rate-2-star.svg" alt="..." className="cursor-pointer" />
		// 				<img src="/rate-3-star.svg" alt="..." className="cursor-pointer" />
		// 				<img src="/rate-4-star.svg" alt="..." className="cursor-pointer" />
		// 				<img src="/rate-5-star.svg" alt="..." className="cursor-pointer" />
		// 			</div>
		// 		</div>
		// 		<div className="text-neutral mt-4 cursor-pointer">
		// 			Fasilitas Kos
		// 			<img src="/arrow-right.svg" alt="..." />
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default FilterComponent;
