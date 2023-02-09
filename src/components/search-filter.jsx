import { faFemale, faMale, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";

const FilterComponent = ({ loadKost, payloadQuery, paramsQuery, pageSetter, listSetter, displayFilter }) => {

	const [error, setError] = useState({})
	const [rating, setRating] = useState({})
	const [filter, setFilter] = useState({ ...payloadQuery })

	const handleSubmitFilter = (e) => {
		e.preventDefault()
		let failed = false


		if (filter.price_minimum !== "") {
			if (!/[0-9]/i.test(filter.price_minimum)) {
				failed = true
				setError((error) => ({ ...error, "hargaMinimal": "Harga minimal tidak valid!" }))
			}
		} else {
			failed = true
			setError((error) => ({ ...error, "hargaMinimal": "Harga minimal tidak boleh kosong!" }))
		}

		if (filter.price_maximum !== "") {
			if (!/[0-9]/i.test(filter.price_maximum)) {
				failed = true
				setError((error) => ({ ...error, "hargaMaksimal": "harga maksimal tidak valid!" }))
			}
		} else {
			failed = true
			setError((error) => ({ ...error, "hargaMaksimal": "Harga maksimal tidak boleh kosong!" }))
		}

		if (failed) {
			return
		}

		paramsQuery(payloadParams => ({ ...payloadParams, ...filter }))

		pageSetter(0)
		listSetter([])
		loadKost({ ...filter, "page": 0, "size": 6 })
		displayFilter('filter')
	}

	const handleFilterChange = (tipe, value) => {
		let temp = { ...filter }

		temp[tipe] = value

		setFilter(temp)
	}

	const handleRatingChange = (tipe) => {
		let temp = { ...rating }

		temp[tipe] = !temp[tipe]

		setRating(temp)
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
									<Form.Control type="number" placeholder="Rp. 750.000"
										value={filter.price_minimum}
										onChange={e => handleFilterChange("price_minimum", e.target.value)}
									/>
									{
										(error.hasOwnProperty("hargaMinimal") && error.hargaMinimal !== "") ?
											<Form.Text className="text-danger">
												{error.hargaMinimal}
											</Form.Text> :
											""
									}
								</Form.Group>
							</Col>
							<Col xs="auto">
								<p>---</p>
							</Col>
							<Col xs="auto">
								<Form.Group controlId="formBasicMaksimal">
									<Form.Label>Maksimal</Form.Label>
									<Form.Control type="number" placeholder="Rp. 1.500.000"
										value={filter.price_maximum}
										onChange={e => handleFilterChange("price_maximum", e.target.value)}
									/>
									{
										(error.hasOwnProperty("hargaMaksimal") && error.hargaMaksimal !== "") ?
											<Form.Text className="text-danger">
												{error.hargaMaksimal}
											</Form.Text> :
											""
									}
								</Form.Group>
							</Col>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Tipe Kos</Accordion.Header>
					<Accordion.Body>
						<Form.Group controlId="formBasicJenisKelamin">
							<label className="me-2 cursor-pointer" htmlFor="jenisPutra">
								<Card bg={filter.kost_type_man === true ? "outline-primary" : "none"} className="jenis-kelamin-card">
									<h3>
										<FontAwesomeIcon icon={faMale} />
									</h3>
									<p>Putra</p>
								</Card>
							</label>
							<label className="me-2 cursor-pointer" htmlFor="jenisPutri">
								<Card bg={filter.kost_type_woman === true ? "outline-primary" : "none"} className="jenis-kelamin-card">
									<h3>
										<FontAwesomeIcon icon={faFemale} />
									</h3>
									<p>Putri</p>
								</Card>
							</label>
							<label className="me-2 cursor-pointer" htmlFor="jenisCampur">
								<Card bg={filter.kost_type_mixed === true ? "outline-primary" : "none"} className="jenis-kelamin-card">
									<h3>
										<FontAwesomeIcon icon={faUsers} />
									</h3>
									<p>Campur</p>
								</Card>
							</label>
							<input type="radio" name="jenisKelamin" id="jenisPutra" hidden
								checked={filter.kost_type_man === true}
								onChange={e => handleFilterChange("kost_type_man", !filter.kost_type_man)}
							/>
							<input type="radio" name="jenisKelamin" id="jenisPutri" hidden
								checked={filter.kost_type_woman === true}
								onChange={e => handleFilterChange("kost_type_woman", !filter.kost_type_woman)}
							/>
							<input type="radio" name="jenisKelamin" id="jenisCampur" hidden
								checked={filter.kost_type_mixed === true}
								onChange={e => handleFilterChange("kost_type_mixed", !filter.kost_type_mixed)}
							/>
						</Form.Group>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Durasi Kos</Accordion.Header>
					<Accordion.Body>
						<Form.Group controlId="formBasicDurasi">
							<Form.Check className="my-2" type="radio" name="durasi" label="Harian"
								checked={filter.duration_type === "DAILY"}
								onChange={e => handleFilterChange("duration_type", "DAILY")}
							/>
							<Form.Check className="my-2" type="radio" name="durasi" label="Mingguan"
								checked={filter.duration_type === "WEEKLY"}
								onChange={e => handleFilterChange("duration_type", "WEEKLY")}
							/>
							<Form.Check className="my-2" type="radio" name="durasi" label="Bulanan"
								checked={filter.duration_type === "MONTHLY"}
								onChange={e => handleFilterChange("duration_type", "MONTHLY")}
							/>
							<Form.Check className="my-2" type="radio" name="durasi" label="3 Bulanan"
								checked={filter.duration_type === "QUARTER"}
								onChange={e => handleFilterChange("duration_type", "QUARTER")}
							/>
							<Form.Check className="my-2" type="radio" name="durasi" label="6 Bulanan"
								checked={filter.duration_type === "SEMESTER"}
								onChange={e => handleFilterChange("duration_type", "SEMESTER")}
							/>
							<Form.Check className="my-2" type="radio" name="durasi" label="Tahunan"
								checked={filter.duration_type === "YEARLY"}
								onChange={e => handleFilterChange("duration_type", "YEARLY")}
							/>
						</Form.Group>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Rating Kos</Accordion.Header>
					<Accordion.Body>
						<Form.Group controlId="formBasicRating">
							<label className="me-2 cursor-pointer" htmlFor="ratingSatu">
								<Card bg={(rating && rating.satu === true) ? "outline-warning" : "none"} className="jenis-kelamin-card">
									<p className={(rating && rating.satu === true) ? "text-warning" : ""}><FontAwesomeIcon icon={faStar} /> 1</p>
								</Card>
							</label>
							<label className="me-2 cursor-pointer" htmlFor="ratingDua">
								<Card bg={(rating && rating.dua === true) ? "outline-warning" : "none"} className="jenis-kelamin-card">
									<p className={(rating && rating.dua === true) ? "text-warning" : ""}><FontAwesomeIcon icon={faStar} /> 2</p>
								</Card>
							</label>
							<label className="me-2 cursor-pointer" htmlFor="ratingTiga">
								<Card bg={(rating && rating.tiga === true) ? "outline-warning" : "none"} className="jenis-kelamin-card">
									<p className={(rating && rating.tiga === true) ? "text-warning" : ""}><FontAwesomeIcon icon={faStar} /> 3</p>
								</Card>
							</label>
							<label className="me-2 cursor-pointer" htmlFor="ratingEmpat">
								<Card bg={(rating && rating.empat === true) ? "outline-warning" : "none"} className="jenis-kelamin-card">
									<p className={(rating && rating.empat === true) ? "text-warning" : ""}><FontAwesomeIcon icon={faStar} /> 4</p>
								</Card>
							</label>
							<label className="me-2 cursor-pointer" htmlFor="ratingLima">
								<Card bg={(rating && rating.lima === true) ? "outline-warning" : "none"} className="jenis-kelamin-card">
									<p className={(rating && rating.lima === true) ? "text-warning" : ""}><FontAwesomeIcon icon={faStar} /> 5</p>
								</Card>
							</label>
							<input type="checkbox" name="rating" id="ratingSatu" hidden
								checked={rating.satu === true}
								onChange={e => handleRatingChange("satu")}
							/>
							<input type="checkbox" name="rating" id="ratingDua" hidden
								checked={rating.dua === true}
								onChange={e => handleRatingChange("dua")}
							/>
							<input type="checkbox" name="rating" id="ratingTiga" hidden
								checked={rating.tiga === true}
								onChange={e => handleRatingChange("tiga")}
							/>
							<input type="checkbox" name="rating" id="ratingEmpat" hidden
								checked={rating.empat === true}
								onChange={e => handleRatingChange("empat")}
							/>
							<input type="checkbox" name="rating" id="ratingLima" hidden
								checked={rating.lima === true}
								onChange={e => handleRatingChange("lima")}
							/>
						</Form.Group>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="4">
					<Accordion.Header>Durasi Kos</Accordion.Header>
					<Accordion.Body>
						<Form.Group controlId="formBasicDurasi" className="row row-cols-xs-2 row-cols-lg-4">
							<Form.Label className="w-100 mt-2">Fasilitas Umum</Form.Label>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Air"
								checked={filter.water === true}
								onChange={e => handleFilterChange("water", !filter.water)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Listrik"
								checked={filter.electric === true}
								onChange={e => handleFilterChange("electric", !filter.electric)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Laundry"
								checked={filter.laundry === true}
								onChange={e => handleFilterChange("laundry", !filter.laundry)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Kulkas"
								checked={filter.refrigerator === true}
								onChange={e => handleFilterChange("refrigerator", !filter.refrigerator)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Dispenser"
								checked={filter.dispenser === true}
								onChange={e => handleFilterChange("dispenser", !filter.dispenser)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Wifi"
								checked={filter.wifi === true}
								onChange={e => handleFilterChange("wifi", !filter.wifi)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Dapur"
								checked={filter.kitchen === true}
								onChange={e => handleFilterChange("kitchen", !filter.kitchen)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Parkir Mobil"
								checked={filter.parking_car === true}
								onChange={e => handleFilterChange("parking_car", !filter.parking_car)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Parkir Motor"
								checked={filter.parking_motorcycle === true}
								onChange={e => handleFilterChange("parking_motorcycle", !filter.parking_motorcycle)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Ruang Tamu"
								checked={filter.living_room === true}
								onChange={e => handleFilterChange("living_room", !filter.living_room)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Ruang Jemur"
								checked={filter.drying_ground === true}
								onChange={e => handleFilterChange("drying_ground", !filter.drying_ground)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="TV Kos"
								checked={filter.kost_tv === true}
								onChange={e => handleFilterChange("kost_tv", !filter.kost_tv)}
							/>

							<Form.Label className="w-100 mt-2">Fasilitas Kamar</Form.Label>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="AC"
								checked={filter.ac === true}
								onChange={e => handleFilterChange("ac", !filter.ac)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Jendela"
								checked={filter.windows === true}
								onChange={e => handleFilterChange("windows", !filter.windows)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Kasur"
								checked={filter.springbed === true}
								onChange={e => handleFilterChange("springbed", !filter.springbed)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Kipas Angin"
								checked={filter.fan === true}
								onChange={e => handleFilterChange("fan", !filter.fan)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Bantal"
								checked={filter.pillow === true}
								onChange={e => handleFilterChange("pillow", !filter.pillow)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Lemari Baju"
								checked={filter.furniture === true}
								onChange={e => handleFilterChange("furniture", !filter.furniture)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Meja"
								checked={filter.table_learning === true}
								onChange={e => handleFilterChange("table_learning", !filter.table_learning)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="TV Kamar"
								checked={filter.room_tv === true}
								onChange={e => handleFilterChange("room_tv", !filter.room_tv)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Toilet Dalam"
								checked={filter.inside_bathroom === true}
								onChange={e => handleFilterChange("inside_bathroom", !filter.inside_bathroom)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Toilet Luar"
								checked={filter.outside_bathroom === true}
								onChange={e => handleFilterChange("outside_bathroom", !filter.outside_bathroom)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Pemanas Air"
								checked={filter.water_heater === true}
								onChange={e => handleFilterChange("water_heater", !filter.water_heater)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Shower"
								checked={filter.shower === true}
								onChange={e => handleFilterChange("shower", !filter.shower)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Toilet Duduk"
								checked={filter.sitting_closet === true}
								onChange={e => handleFilterChange("sitting_closet", !filter.sitting_closet)}
							/>
							<Form.Check className="my-2 col" type="checkbox" name="fasilitas" label="Toilet Jongkok"
								checked={filter.non_sitting_closet === true}
								onChange={e => handleFilterChange("non_sitting_closet", !filter.non_sitting_closet)}
							/>
						</Form.Group>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<div className="text-center">
				<Button type="submit" variant="primary">
					<span className="mx-5 px-3">Cari</span>
				</Button>
			</div>
		</Form>
	);
};

export default FilterComponent;
