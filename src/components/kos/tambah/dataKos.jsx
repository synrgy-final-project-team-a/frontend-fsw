import { useRef, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { jenisChange, submitForm } from "../../../store/slices/kosSlice"

const DataKos = ({ setKeynya }) => {
	const dispatch = useDispatch()

	const kos = useSelector(state => state.kos)

	const formRef = useRef({})
	const [error, setError] = useState({})

	const handleSetelahnya = (e) => {
		e.preventDefault()
		let failed = false

		const nama = formRef.current.nama.value
		const deskripsi = formRef.current.deskripsi.value
		const tahun = formRef.current.tahun.value

		if (tahun === "") {
			failed = true
			setError({ "tahun": "Tahun kos tidak boleh kosong!" })
		}

		if (deskripsi === "") {
			failed = true
			setError({ "deskripsi": "Deskripsi kos tidak boleh kosong!" })
		}

		if (nama === "") {
			failed = true
			setError({ "nama": "Nama kos tidak boleh kosong!" })
		}

		if (failed) {
			// return
		}

		const payload = {
			nama: nama,
			deskripsi: deskripsi,
			tahun: tahun
		}

		dispatch(submitForm(payload))

		let newKey = 2
		setKeynya(newKey)
	}

	return (
		<>
			<h1 className="text-center">Data Kos</h1>
			<h3 className="text-center">Mari lengkapi data kos</h3>
			<Form onSubmit={handleSetelahnya}>
				<Row className="g-2 justify-content-center">
					<Col xs={12} lg={6}>
						<Form.Group className="mb-3" controlId="formBasicNama">
							<Form.Label className="w-100">Berikan nama kos</Form.Label>
							<Form.Control type="text" placeholder="Masukkan nama kos" defaultValue={kos.nama}
								ref={(ref) => formRef.current.nama = ref}
							/>
							{
								(error.hasOwnProperty("nama") && error.nama !== "") ?
									<Form.Text className="text-danger">
										{error.nama}
									</Form.Text> :
									""
							}
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicDeskripsi">
							<Form.Label className="w-100">Deskripsi</Form.Label>
							<Form.Control as="textarea" rows={3} placeholder="Masukkan deskripsi kos" defaultValue={kos.deskripsi}
								ref={(ref) => formRef.current.deskripsi = ref}
							/>
							{
								(error.hasOwnProperty("deskripsi") && error.deskripsi !== "") ?
									<Form.Text className="text-danger">
										{error.deskripsi}
									</Form.Text> :
									""
							}
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Label className="w-100">Jenis kos</Form.Label>
							<div className="d-flex">
								{
									kos.jenis.map((el, i) => {
										return <Form.Check className="w-100" type="checkbox"
											key={i}
											label={el.text}
											checked={el.value}
											onChange={() => dispatch(jenisChange(i))} />
									})
								}
							</div>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicDeskripsi">
							<Form.Label className="w-100">Foto Kos</Form.Label>
							<Form.Text>
								Upload minimal 4 foto yang menggambarkan suasana kosan anda
							</Form.Text>
							<Form.Control as="textarea" rows={3} placeholder="Masukkan deskripsi kos" disabled />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicNama">
							<Form.Label className="w-100">Tahun kos dibangun</Form.Label>
							<Form.Control type="text" placeholder="Masukkan tahun kos selesai dibangun" defaultValue={kos.tahun}
								ref={(ref) => formRef.current.tahun = ref}
							/>
							{
								(error.hasOwnProperty("tahun") && error.tahun !== "") ?
									<Form.Text className="text-danger">
										{error.tahun}
									</Form.Text> :
									""
							}
						</Form.Group>
					</Col>
					<div className="w-100"></div>
					<Col xs={12} lg={6} className="d-flex">
						<Button variant="outline-warning" className="w-100 me-1" disabled>
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

export default DataKos