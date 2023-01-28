import { Button, Col, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const DataFasilitasKos = ({ setKeynya }) => {

	const rule = useSelector(state => state.kos.fasilitas)

	const handleSebelumnya = (e) => {
		e.preventDefault()
		let newKey = 2
		setKeynya(newKey)
	}

	const handleSetelahnya = (e) => {
		e.preventDefault()
		let newKey = 4
		setKeynya(newKey)
	}

	return (
		<>
			<h1 className="text-center">Data Kos</h1>
			<h3 className="text-center">Pilih fasilitas umum yang ada di kosan anda</h3>
			<Form onSubmit={handleSetelahnya}>
				<Row className="g-2 justify-content-center">
					<Col xs={12} lg={6}>
						<Form.Group className="mb-3 row row-cols-3" controlId="formBasicCheckbox">
							{
								rule.map((el, i) => {
									return (
										<Form.Check className="mb-3" type="checkbox" label={el.text} key={i} />
									)
								})
							}
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

export default DataFasilitasKos