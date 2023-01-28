import { Button, Col, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const DataAlamatKos = ({ setKeynya }) => {

	const provinsi = useSelector(state => state.alamat.provinsi)
	const kos = useSelector(state => state.kos)

	const handleSebelumnya = (e) => {
		e.preventDefault()
		let newKey = 1
		setKeynya(newKey)
	}

	const handleSetelahnya = (e) => {
		e.preventDefault()
		let newKey = 3
		setKeynya(newKey)
	}

	return (
		<>
			<h1 className="text-center">Data Kos</h1>
			<h3 className="text-center">Mari lengkapi alamat kos</h3>
			<Form onSubmit={handleSetelahnya}>
				<Row className="g-2 justify-content-center">
					<Col xs={12} lg={6}>
						<Form.Group className="mb-3" controlId="formBasicNama">
							<Form.Label className="w-100">Alamat</Form.Label>
							<Form.Control as="textarea" rows={3} placeholder="Masukkan alamat kos" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicKelurahan">
							<Form.Label className="w-100">Kelurahan</Form.Label>
							<Form.Control type="text" placeholder="Masukkan kelurahan kos" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicKecamatan">
							<Form.Label className="w-100">Kecamatan</Form.Label>
							<Form.Control type="text" placeholder="Masukkan kecamatan kos" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicKota">
							<Form.Label className="w-100">Kabupaten / Kota</Form.Label>
							<Form.Control type="text" placeholder="Masukkan kabupaten / kota kos" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicKecamatan">
							<Form.Label className="w-100">Provinsi</Form.Label>
							<Form.Select>
								{
									provinsi.map((el, i) => {
										return (
											<option key={i} value={el}>{el}</option>
										)
									})
								}
							</Form.Select>
						</Form.Group>
					</Col>
					<div className="w-100"></div>
					<Col xs={12} lg={6} className="d-flex">
						<Button variant="outline-warning" className="w-100 me-1" onClick={handleSebelumnya}>
							Sebelumnya
						</Button>
						<Button variant="outline-primary" className="w-100 ms-1" type="submit">
							Selanjutnya
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	)
}

export default DataAlamatKos