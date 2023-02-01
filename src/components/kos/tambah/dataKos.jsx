import { useRef, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { submitForm } from "../../../store/slices/kosSlice"

const imgAllow = [
	"image/png",
	"image/jpg",
	"image/jpeg",
]

const DataKos = ({ setKeynya }) => {
	const dispatch = useDispatch()

	const kos = useSelector(state => state.kos)

	const formRef = useRef({})
	const [error, setError] = useState({})

	const handleSetelahnya = (e) => {
		e.preventDefault()

		setError({})
		let failed = false

		const nama = formRef.current.nama.value
		const deskripsi = formRef.current.deskripsi.value
		const tahun = formRef.current.tahun.value
		const putra = formRef.current.putra.checked
		const putri = formRef.current.putri.checked
		const campur = formRef.current.campur.checked
		const fotoDepan = formRef.current.fotoDepan.files[0]
		const fotoDepanJalan = formRef.current.fotoDepanJalan.files[0]
		const fotoDepanJauh = formRef.current.fotoDepanJauh.files[0]

		if (fotoDepan === undefined) {
			failed = true
			setError((error) => ({ ...error, "fotoDepan": "Foto depan tidak boleh kosong!" }))
		} else {
			if (!imgAllow.includes(fotoDepan.type)) {
				failed = true
				setError((error) => ({ ...error, "fotoDepan": "Foto depan bukan gambar yang didukung!" }))
			}
		}

		if (fotoDepanJalan === undefined) {
			failed = true
			setError((error) => ({ ...error, "fotoDepanJalan": "Foto depan tidak boleh kosong!" }))
		} else {
			if (!imgAllow.includes(fotoDepanJalan.type)) {
				failed = true
				setError((error) => ({ ...error, "fotoDepanJalan": "Foto depan jalan bukan gambar yang didukung!" }))
			}
		}

		if (fotoDepanJauh === undefined) {
			failed = true
			setError((error) => ({ ...error, "fotoDepanJauh": "Foto depan tidak boleh kosong!" }))
		} else {
			if (!imgAllow.includes(fotoDepanJauh.type)) {
				failed = true
				setError((error) => ({ ...error, "fotoDepanJauh": "Foto depan bukan gambar yang didukung!" }))
			}
		}

		if (putra === false && putri === false && campur === false) {
			failed = true
			setError((error) => ({ ...error, "jenis": "Jenis kos tidak boleh kosong!" }))
		}

		if (tahun === "") {
			failed = true
			setError((error) => ({ ...error, "tahun": "Tahun kos tidak boleh kosong!" }))
		}

		if (deskripsi === "") {
			failed = true
			setError((error) => ({ ...error, "deskripsi": "Deskripsi kos tidak boleh kosong!" }))
		}

		if (nama === "") {
			failed = true
			setError((error) => ({ ...error, "nama": "Nama kos tidak boleh kosong!" }))
		}

		if (failed) {
			return
		}

		const payload = {
			nama: nama,
			deskripsi: deskripsi,
			jenis: {
				"Putra": putra,
				"Putri": putri,
				"Campur": campur
			},
			foto: {
				"fotoDepan": fotoDepan,
				"fotoDepanJalan": fotoDepanJalan,
				"fotoDepanJauh": fotoDepanJauh
			},
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
			<Form onSubmit={handleSetelahnya} encType="multipart/form-data">
				<Row className="g-2 justify-content-center">
					<Col xs={12} lg={6}>
						<Form.Group className="mb-4" controlId="formBasicNama">
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

						<Form.Group className="mb-4" controlId="formBasicDeskripsi">
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

						<Form.Group className="mb-4" controlId="formBasicCheckbox">
							<Form.Label className="w-100">Jenis kos</Form.Label>
							<div className="d-flex">
								<Form.Check className="w-100" type="checkbox" label="Putra"
									defaultChecked={kos.jenis.Putra}
									ref={(ref) => formRef.current.putra = ref}
								/>
								<Form.Check className="w-100" type="checkbox" label="Putri"
									defaultChecked={kos.jenis.Putri}
									ref={(ref) => formRef.current.putri = ref}
								/>
								<Form.Check className="w-100" type="checkbox" label="Campur"
									defaultChecked={kos.jenis.Campur}
									ref={(ref) => formRef.current.campur = ref}
								/>
							</div>
							{
								(error.hasOwnProperty("jenis") && error.jenis !== "") ?
									<Form.Text className="text-danger">
										{error.jenis}
									</Form.Text> :
									""
							}
						</Form.Group>

						<Form.Group className="mb-4" controlId="formBasicDeskripsi">
							<Form.Label className="w-100">Foto Kos</Form.Label>
							<Form.Control type="file" name="fotoDepan"
								ref={(ref) => formRef.current.fotoDepan = ref}
							/>
							<Form.Text>
								Upload foto dari depan kos dengan extensi ".png", ".jpg", atau ".jpeg"
							</Form.Text><br />
							{
								(error.hasOwnProperty("fotoDepan") && error.fotoDepan !== "") ?
									<Form.Text className="text-danger">
										{error.fotoDepan}
									</Form.Text> :
									""
							}
							<Form.Control type="file" className="mt-3"
								ref={(ref) => formRef.current.fotoDepanJalan = ref}
							/>
							<Form.Text>
								Upload foto dari depan jalan kos dengan extensi ".png", ".jpg", atau ".jpeg"
							</Form.Text><br />
							{
								(error.hasOwnProperty("fotoDepanJalan") && error.fotoDepanJalan !== "") ?
									<Form.Text className="text-danger">
										{error.fotoDepanJalan}
									</Form.Text> :
									""
							}
							<Form.Control type="file" className="mt-3"
								ref={(ref) => formRef.current.fotoDepanJauh = ref}
							/>
							<Form.Text>
								Upload foto dari jauh memperlihatkan seluruh bangunan kos dengan extensi ".png", ".jpg", atau ".jpeg"
							</Form.Text><br />
							{
								(error.hasOwnProperty("fotoDepanJauh") && error.fotoDepanJauh !== "") ?
									<Form.Text className="text-danger">
										{error.fotoDepanJauh}
									</Form.Text> :
									""
							}
						</Form.Group>

						<Form.Group className="mb-4" controlId="formBasicNama">
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