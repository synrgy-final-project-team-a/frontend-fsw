import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Breadcrumb, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../../components/profile";
import { useEditUserMutation } from "../../../store/apis/users";
import { addUser } from "../../../store/slices/userSlice";
import AdminLayout from "../../../layouts/admin.layout";

const imgAllow = [
	"image/png",
	"image/jpg",
	"image/jpeg",
]

const InformasiPersonal = () => {
	const dispatch = useDispatch()

	const token = useSelector(state => state.auth.token.access_token);
	const userData = useSelector(state => state.user.current);
	const provinsi = useSelector(state => state.alamat.provinsi)

	const formRef = useRef({})
	const [error, setError] = useState({})

	const [selectedProfile, setSelectedProfile] = useState()
	const [previewProfile, setPreviewProfile] = useState()

	const [
		editUserHit,
		{ isLoading, isSuccess, isError, data: dataEdit, error: errorEdit }
	] = useEditUserMutation()

	const editProfilSubmit = (e) => {
		e.preventDefault()

		setError({})
		let failed = false

		const firstName = formRef.current.firstName.value
		const lastName = formRef.current.lastName.value
		const phoneNumber = formRef.current.phoneNumber.value
		const email = formRef.current.email.value
		const gender = formRef.current.gender.value
		const province = formRef.current.province.value
		const city = formRef.current.city.value
		const address = formRef.current.address.value

		if (firstName === "") {
			failed = true
			setError((error) => ({ ...error, "firstName": "Nama depan tidak boleh kosong!" }))
		}

		if (lastName === "") {
			failed = true
			setError((error) => ({ ...error, "lastName": "Nama belakang tidak boleh kosong!" }))
		}

		if (phoneNumber === "") {
			failed = true
			setError((error) => ({ ...error, "phoneNumber": "Nomor handphone tidak boleh kosong!" }))
		}

		if (email === "") {
			failed = true
			setError((error) => ({ ...error, "email": "Email tidak boleh kosong!" }))
		}

		if (gender === "") {
			failed = true
			setError((error) => ({ ...error, "gender": "Jenis kelamin tidak boleh kosong!" }))
		}

		if (province === "") {
			failed = true
			setError((error) => ({ ...error, "province": "Provinsi tidak boleh kosong!" }))
		}

		if (city === "") {
			failed = true
			setError((error) => ({ ...error, "city": "Kabupaten/Kota tidak boleh kosong!" }))
		}

		if (address === "") {
			failed = true
			setError((error) => ({ ...error, "address": "Alamat tidak boleh kosong!" }))
		}

		if (failed) {
			return
		}

		const payload = new FormData()

		payload.append('first_name', firstName)
		payload.append('last_name', lastName)
		payload.append('phone_number', phoneNumber)
		payload.append('gender', gender)
		payload.append('province', province)
		payload.append('city', city)
		payload.append('address', address)

		if (!!selectedProfile) {
			payload.append('avatar', selectedProfile)
		}

		editUserHit({ token: token, body: payload })
	}

	const changeProfileHandler = (e) => {
		e.preventDefault()
		let failed = false
		setError((error) => ({ ...error, "fotoProfil": "" }))

		if (!e.target.files || e.target.files.length === 0) {
			setSelectedProfile(undefined)
			return
		}

		if (!imgAllow.includes(e.target.files[0].type)) {
			failed = true
			setError((error) => ({ ...error, "fotoProfil": "Foto profil bukan gambar yang didukung!" }))
		}

		if (failed) {
			return
		}

		setSelectedProfile(e.target.files[0])
	}

	const resetProfilehandler = (e) => {
		e.preventDefault()
		setSelectedProfile(undefined)
		setPreviewProfile(undefined)
	}

	useEffect(() => {
		if (isSuccess) {
			dispatch(addUser(dataEdit.data))
			setSelectedProfile(undefined)
			setPreviewProfile(undefined)
			setError((error) => ({ ...error, "alert": { "variant": "success", "message": "Berhasil melakukan edit profil!" } }))
		}

		if (isError) {
			if (Array.isArray(errorEdit.data)) {
				errorEdit.data.forEach((el) =>
					setError((error) => ({ ...error, "alert": { "variant": "danger", "message": el.data.message } }))
				);
			} else {
				setError((error) => ({ ...error, "alert": { "variant": "danger", "message": errorEdit.data.message } }))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	useEffect(() => {
		if (!selectedProfile) {
			setPreviewProfile(undefined)
			return
		}

		let objectUrl = URL.createObjectURL(selectedProfile)
		setPreviewProfile(objectUrl)

		return () => URL.revokeObjectURL(objectUrl)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProfile])

	return (
		<AdminLayout>
			<Container className="mt-3">
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none" }}>
						Beranda
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Profil</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="mt-5">
					<Col xs={12} lg={3}>
						<ProfileNav />
					</Col>
					<Col xs={12} lg={9} className="border rounded px-3 px-lg-5" id="profile-information">
						{
							isLoading ?
								<div className="overlay">
									<FontAwesomeIcon icon={faSpinner} spin />
								</div> :
								""
						}
						<Form className="px-0 px-lg-5" onSubmit={editProfilSubmit}>
							{
								(error.hasOwnProperty("alert") && error.alert.message !== "") ?
									<Alert variant={error.alert.variant} className="mt-5">
										{error.alert.message}
									</Alert> :
									""
							}
							<div className="d-flex justify-content-between align-items-center mt-5">
								<h6 className="fw-bold">Edit Profil</h6>
								<Button variant="outline-primary" type="submit">Simpan</Button>
							</div>
							<div className="text-center mt-5">
								{
									selectedProfile ?
										<img src={previewProfile} className="rounded-circle border profile-picture" alt="..." />
										:
										userData.avatar !== null ? (
											<img src={userData.avatar} className="rounded-circle border profile-picture" alt="..." />
										) : (
											<img src="/logo512.png" className="rounded-circle border profile-picture" alt="..." />
										)
								}
								<br />
								<div className="mt-2">
									<label htmlFor="profile-picture-upload" className="text-decoration-none text-primary fw-bold cursor-pointer">
										Edit foto
									</label>
									<input id="profile-picture-upload" type="file" onChange={changeProfileHandler} style={{ display: "none" }} />
									{
										selectedProfile ?
											<label className="text-decoration-none text-warning fw-bold ms-2 cursor-pointer" onClick={resetProfilehandler}>
												Ulang
											</label> :
											""
									}
								</div>
								{
									(error.hasOwnProperty("fotoProfil") && error.fotoProfil !== "") ?
										<label className="text-danger">
											{error.fotoProfil}
										</label> :
										""
								}
							</div>
							<div className="mt-4">
								<Form.Group className="mb-4" controlId="formBasicNamaDepan">
									<Form.Label>Nama Depan</Form.Label>
									<Form.Control type="text" placeholder="Masukan nama depan"
										defaultValue={userData.first_name}
										ref={(ref) => formRef.current.firstName = ref}
									/>
									{
										(error.hasOwnProperty("firstName") && error.firstName !== "") ?
											<Form.Text className="text-danger">
												{error.firstName}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicNamaBelakang">
									<Form.Label>Nama Belakang</Form.Label>
									<Form.Control type="text" placeholder="Masukan nama belakang"
										defaultValue={userData.last_name}
										ref={(ref) => formRef.current.lastName = ref}
									/>
									{
										(error.hasOwnProperty("lastName") && error.lastName !== "") ?
											<Form.Text className="text-danger">
												{error.lastName}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicNomorHandphone">
									<Form.Label>Nomor Handphone</Form.Label>
									<Form.Control type="text" placeholder="Masukan nomor handphonemu"
										defaultValue={userData.phone_number}
										ref={(ref) => formRef.current.phoneNumber = ref}
									/>
									{
										(error.hasOwnProperty("phoneNumber") && error.phoneNumber !== "") ?
											<Form.Text className="text-danger">
												{error.phoneNumber}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control type="text" placeholder="Masukan email aktifmu"
										defaultValue={userData.email}
										disabled
										ref={(ref) => formRef.current.email = ref}
									/>
									{
										(error.hasOwnProperty("email") && error.email !== "") ?
											<Form.Text className="text-danger">
												{error.email}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Jenis Kelamin</Form.Label>
									<Form.Select defaultValue={userData.gender}
										ref={(ref) => formRef.current.gender = ref}
									>
										<option value="MALE">Laki-Laki</option>
										<option value="FEMALE">Perempuan</option>
									</Form.Select>
									{
										(error.hasOwnProperty("gender") && error.gender !== "") ?
											<Form.Text className="text-danger">
												{error.gender}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Provinsi</Form.Label>
									<Form.Control list="provinsi-list" type="text" placeholder="Masukan Provinsimu"
										defaultValue={userData.province}
										ref={(ref) => formRef.current.province = ref}
									/>
									{
										(error.hasOwnProperty("province") && error.province !== "") ?
											<Form.Text className="text-danger">
												{error.province}
											</Form.Text> :
											""
									}
									<datalist id="provinsi-list">
										{
											provinsi.map((el, i) => {
												return (
													<option key={i} value={el} />
												)
											})
										}
									</datalist>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicKota">
									<Form.Label>Kabupaten/Kota</Form.Label>
									<Form.Control type="text" placeholder="Masukan kabupaten/kota-mu"
										defaultValue={userData.city}
										ref={(ref) => formRef.current.city = ref}
									/>
									{
										(error.hasOwnProperty("city") && error.city !== "") ?
											<Form.Text className="text-danger">
												{error.city}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicAlamat">
									<Form.Label>Alamat</Form.Label>
									<Form.Control as="textarea" rows={3}
										defaultValue={userData.address}
										ref={(ref) => formRef.current.address = ref}
									/>
									{
										(error.hasOwnProperty("address") && error.address !== "") ?
											<Form.Text className="text-danger">
												{error.address}
											</Form.Text> :
											""
									}
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Google Maps</Form.Label>
									<Form.Control type="text" disabled />
								</Form.Group>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</AdminLayout>
	);
}

export default InformasiPersonal