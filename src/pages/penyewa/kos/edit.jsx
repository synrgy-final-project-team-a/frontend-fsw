import { faFemale, faMale, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Button, ButtonGroup, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import PenyewaLayout from "../../../layouts/penyewa.layout"
import { useDeleteRoomByPenyewaMutation, useGetOneByPenyewaMutation, useUpdateKostByPenyewaMutation } from "../../../store/apis/kos"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const EditKos = () => {
	const navigate = useNavigate()
	const params = useParams()

	const rule = useSelector((state) => state.kos.peraturan);
	const facility = useSelector((state) => state.kos.fasilitas);
	const provinsi = useSelector((state) => state.alamat.provinsi);

	const formRef = useRef({});
	const ruleRef = useRef([]);
	const facilityRef = useRef([]);
	const [descState, setDescState] = useState("");
	const [error, setError] = useState({});
	const [jenisKelamin, setJenisKelamin] = useState({})
	const [selectedFrontPhoto, setSelectedFrontPhoto] = useState();
	const [previewFrontPhoto, setPreviewFrontPhoto] = useState();
	const [selectedFrontFarPhoto, setSelectedFrontFarPhoto] = useState();
	const [previewFrontFarPhoto, setPreviewFarRoadPhoto] = useState();
	const [room, setRoom] = useState([]);

	const [
		oneHit,
		{ isLoading: loadingOne, isSuccess: successOne, isError: errorOne, data: dataOne }
	] = useGetOneByPenyewaMutation()

	const [
		updateHit,
		{ isLoading: loadingUpdate, isSuccess: successUpdate, isError: errorUpdate }
	] = useUpdateKostByPenyewaMutation()

	const [
		deleteHit,
		{ isLoading: loadingDelete, isSuccess: successDelete, isError: errorDelete }
	] = useDeleteRoomByPenyewaMutation()

	const handleUbahSubmit = async (e) => {
		e.preventDefault()

		const confirm = window.confirm("Apakah anda yakin?")

		if (!confirm) {
			return
		}

		setError({})

		const nama = formRef.current.nama;
		const deskripsi = descState;
		const tahun = formRef.current.tahun;
		const jeniskelamin = formRef.current.jenisKelamin;
		const foto = formRef.current.foto;
		const { Putra, Putri, Campur } = jenisKelamin;
		const fotoDepan = selectedFrontPhoto;
		const fotoDepanJauh = selectedFrontFarPhoto;

		const alamat = formRef.current.alamat;
		const kota = formRef.current.kota;
		const provinsi = formRef.current.provinsi;

		let blobFotoDepan
		let blobFotoDepanJauh

		if (nama.value === "") {
			setError((error) => ({ ...error, nama: "Nama kos tidak boleh kosong!" }));
			nama.scrollIntoView()
			return
		}

		if (deskripsi.value === "" || deskripsi.value === "<p><br></p>") {
			setError((error) => ({
				...error,
				deskripsi: "Deskripsi kos tidak boleh kosong!",
			}));
			deskripsi.scrollIntoView()
			return
		}

		if (tahun.value === "") {
			setError((error) => ({
				...error,
				tahun: "Tahun kos tidak boleh kosong!",
			}));
			tahun.scrollIntoView()
			return
		} else {
			if (!/[0-9]/i.test(tahun.value)) {
				setError((error) => ({
					...error,
					tahun: "Tahun kos harus angka!",
				}));
				tahun.scrollIntoView()
				return
			}
		}

		if (Putra === undefined && Putri === undefined && Campur === undefined) {
			setError((error) => ({
				...error,
				jenis: "Jenis kos tidak boleh kosong!",
			}));
			jeniskelamin.scrollIntoView()
			return
		}

		if (fotoDepan === undefined) {
			blobFotoDepan = await fetch(previewFrontPhoto).then(r => r.blob());
		} else {
			if (!imgAllow.includes(fotoDepan.type)) {
				setError((error) => ({
					...error,
					fotoDepan: "Foto depan bukan gambar yang didukung!",
				}));
				foto.scrollIntoView()
				return
			}
			blobFotoDepan = fotoDepan
		}

		if (fotoDepanJauh === undefined) {
			blobFotoDepanJauh = await fetch(previewFrontFarPhoto).then(r => r.blob());
		} else {
			if (!imgAllow.includes(fotoDepanJauh.type)) {
				setError((error) => ({
					...error,
					fotoDepanJauh: "Foto depan bukan gambar yang didukung!",
				}));
				foto.scrollIntoView()
				return
			}
			blobFotoDepanJauh = fotoDepanJauh
		}

		if (provinsi.value === "") {
			setError((error) => ({
				...error,
				provinsi: "Provinsi kos tidak boleh kosong!",
			}));
			provinsi.scrollIntoView()
			return
		}

		if (kota.value === "") {
			setError((error) => ({
				...error,
				kota: "Kota kos tidak boleh kosong!",
			}));
			kota.scrollIntoView()
			return
		}

		if (alamat.value === "") {
			setError((error) => ({
				...error,
				alamat: "Alamat kos tidak boleh kosong!",
			}));
			alamat.scrollIntoView()
			return
		}

		const restricted_night = ruleRef.current[0].checked
		const identity_card = ruleRef.current[1].checked
		const restricted_gender = ruleRef.current[2].checked
		const restricted_guest = ruleRef.current[3].checked
		const maxixmum_one = ruleRef.current[4].checked
		const maximum_two = ruleRef.current[5].checked
		const restricted_checkout = ruleRef.current[6].checked
		const restricted_checkin = ruleRef.current[7].checked
		const include_electricity = ruleRef.current[8].checked
		const no_smoking = ruleRef.current[9].checked

		const water = facilityRef.current[0].checked
		const parking_car = facilityRef.current[1].checked
		const parking_motorcycle = facilityRef.current[2].checked
		const dispenser = facilityRef.current[3].checked
		const laundry = facilityRef.current[4].checked
		const kitchen = facilityRef.current[5].checked
		const drying_ground = facilityRef.current[6].checked
		const living_room = facilityRef.current[7].checked
		const wifi = facilityRef.current[8].checked
		const refrigerator = facilityRef.current[9].checked
		const kost_tv = facilityRef.current[10].checked
		const electric = facilityRef.current[11].checked

		toast.loading('Sedang mengubah kos', {
			position: "top-center",
			autoClose: false,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "light",
		})

		const formdata = new FormData()

		formdata.append("kostName", nama.value)
		formdata.append("description", deskripsi.value)
		formdata.append("kostTypeMan", Putra)
		formdata.append("kostTypeWoman", Putri)
		formdata.append("kostTypeMixed", Campur)
		formdata.append("frontBuildingPhoto", blobFotoDepan)
		formdata.append("frontFarbuildingPhoto", blobFotoDepanJauh)
		formdata.append("yearSince", tahun.value)
		formdata.append("province", provinsi.value)
		formdata.append("city", kota.value)
		formdata.append("address", alamat.value)
		formdata.append("gmaps", "-")

		formdata.append("restrictedNight", restricted_night)
		formdata.append("identityCard", identity_card)
		formdata.append("restrictedGender", restricted_gender)
		formdata.append("restrictedGuest", restricted_guest)
		formdata.append("maximumOne", maxixmum_one)
		formdata.append("maximumTwo", maximum_two)
		formdata.append("restrictedCheckout", restricted_checkout)
		formdata.append("restrictedCheckin", restricted_checkin)
		formdata.append("includeElectricity", include_electricity)
		formdata.append("noSmoking", no_smoking)
		formdata.append("enabled", true)
		formdata.append("kostTv", kost_tv)
		formdata.append("electric", electric)
		formdata.append("laundry", laundry)
		formdata.append("refrigerator", refrigerator)
		formdata.append("water", water)
		formdata.append("wifi", wifi)
		formdata.append("dispenser", dispenser)
		formdata.append("drying_ground", drying_ground)
		formdata.append("kitchen", kitchen)
		formdata.append("livingRoom", living_room)
		formdata.append("parkingMotorcycle", parking_motorcycle)
		formdata.append("parkingCar", parking_car)

		updateHit({ idKost: params.id, body: formdata })
	}

	const handleDeleteRoom = (e, id) => {
		e.preventDefault()

		if (room.length === 1) {
			toast.error("Minimal harus mempunyai 1 tipe kamar", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			return
		}

		const confirm = window.confirm("Apakah anda yakin?")

		if (!confirm) {
			return
		}

		toast.loading('Sedang menghapus tipe kamar', {
			position: "top-center",
			autoClose: false,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "light",
		})

		deleteHit(id)
	}

	const handleJenisChange = (tipe) => {
		let temp = {
			Putra: false,
			Putri: false,
			Campur: false
		}

		temp[tipe] = true

		setJenisKelamin(temp)
	}

	const changeFrontPhotoHandler = (e) => {
		e.preventDefault();
		setError((error) => ({ ...error, fotoDepan: "" }));

		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFrontPhoto(undefined);
			return;
		}
		if (!imgAllow.includes(e.target.files[0].type)) {
			setError((error) => ({
				...error,
				fotoDepan: "Foto de bukan gambar yang didukung!",
			}));
			return
		}

		setSelectedFrontPhoto(e.target.files[0]);
	};

	useEffect(() => {
		if (!selectedFrontPhoto) {
			setPreviewFrontPhoto(undefined);
			return;
		}

		let objectUrl = URL.createObjectURL(selectedFrontPhoto);
		setPreviewFrontPhoto(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFrontPhoto]);

	const changeFrontFarPhotoHandler = (e) => {
		e.preventDefault();
		setError((error) => ({ ...error, fotoDepanJauh: "" }));

		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFrontFarPhoto(undefined);
			return;
		}
		if (!imgAllow.includes(e.target.files[0].type)) {
			setError((error) => ({
				...error,
				fotoDepanJauh: "Foto bukan gambar yang didukung!",
			}));
			return
		}

		setSelectedFrontFarPhoto(e.target.files[0]);
	};

	useEffect(() => {
		if (!selectedFrontFarPhoto) {
			setSelectedFrontFarPhoto(undefined);
			return;
		}

		let objectUrl = URL.createObjectURL(selectedFrontFarPhoto);
		setPreviewFarRoadPhoto(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFrontFarPhoto]);

	useEffect(() => {
		if (successOne) {
			let kos = dataOne.kost[0]
			setRoom(dataOne.room)

			let temp = {
				Putra: kos.kost_type_man,
				Putri: kos.kost_type_woman,
				Campur: kos.kost_type_mixed
			}
			setJenisKelamin(temp)

			formRef.current.nama.value = kos.kost_name
			formRef.current.tahun.value = kos.year_since
			setDescState(kos.description)
			setPreviewFrontPhoto(kos.front_building_photo)
			setPreviewFarRoadPhoto(kos.front_farbuilding_photo)
			formRef.current.provinsi.value = kos.province
			formRef.current.kota.value = kos.city
			formRef.current.alamat.value = kos.address

			ruleRef.current[0].checked = kos.restricted_night
			ruleRef.current[1].checked = kos.identity_card
			ruleRef.current[2].checked = kos.restricted_gender
			ruleRef.current[3].checked = kos.restricted_guest
			ruleRef.current[4].checked = kos.maxixmum_one
			ruleRef.current[5].checked = kos.maximum_two
			ruleRef.current[6].checked = kos.restricted_checkout
			ruleRef.current[7].checked = kos.restricted_checkin
			ruleRef.current[8].checked = kos.include_electricity
			ruleRef.current[9].checked = kos.no_smoking

			facilityRef.current[0].checked = kos.water;
			facilityRef.current[1].checked = kos.parking_car;
			facilityRef.current[2].checked = kos.parking_motorcycle;
			facilityRef.current[3].checked = kos.dispenser;
			facilityRef.current[4].checked = kos.laundry;
			facilityRef.current[5].checked = kos.kitchen;
			facilityRef.current[6].checked = kos.drying_ground;
			facilityRef.current[7].checked = kos.living_room;
			facilityRef.current[8].checked = kos.wifi;
			facilityRef.current[9].checked = kos.refrigerator;
			facilityRef.current[10].checked = kos.kost_tv;
			facilityRef.current[11].checked = kos.electric;
		}

		if (errorOne) {
			navigate("/penyewa/kos")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingOne])

	useEffect(() => {
		if (successUpdate) {
			toast.dismiss()
			toast.success("Sukses mengubah kos", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			oneHit(params.id)
		}

		if (errorUpdate) {
			toast.dismiss()
			toast.error("Gagal mengubah kos", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingUpdate])

	useEffect(() => {
		if (successDelete) {
			toast.dismiss()
			toast.success("Sukses menghapus tipe kamar", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			oneHit(params.id)
		}

		if (errorDelete) {
			toast.dismiss()
			toast.error("Gagal menghapus tipe kamar", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingDelete])

	useEffect(() => {
		oneHit(params.id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<PenyewaLayout>
			<Container className="mt-4">
				<Row className="justify-content-center">
					<Col xs={12} lg={6}>
						{
							loadingOne ?
								<div>
									<h3 className="my-2">Data Kos</h3>
									<Form.Group className="mb-3">
										<Form.Label>Berikan nama kos</Form.Label>
										<Card className="skeleton p-1">
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Deskripsi</Form.Label>
										<Card className="skeleton p-1" style={{ height: "200px" }}>
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Jenis Kelamin</Form.Label>
										<Card className="skeleton p-1" style={{ height: "100px" }}>
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Foto Kos</Form.Label>
										<Card className="skeleton p-1" style={{ height: "100px" }}>
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Tahun kos dibangun</Form.Label>
										<Card className="skeleton p-1">
											&nbsp;
										</Card>
									</Form.Group>
								</div> :
								successOne ?
									<>
										<Form onSubmit={handleUbahSubmit}>
											<h3 className="my-2">Data Kos</h3>
											<Form.Group className="mb-4" controlId="formBasicNama">
												<Form.Label className="w-100">Berikan nama kos</Form.Label>
												<Form.Control
													type="text"
													placeholder="Masukkan nama kos"
													ref={(ref) => (formRef.current.nama = ref)}
												/>
												{error.hasOwnProperty("nama") && error.nama !== "" ? (
													<Form.Text className="text-danger">{error.nama}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<Form.Group className="mb-5" controlId="formBasicDeskripsi">
												<Form.Label className="w-100">Deskripsi</Form.Label>
												<ReactQuill
													className="mb-5 pb-3"
													theme="snow"
													value={descState}
													onChange={setDescState}
												/>
												{error.hasOwnProperty("deskripsi") && error.deskripsi !== "" ? (
													<Form.Text className="text-danger">{error.deskripsi}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicJenisKelamin">
												<Form.Label className="w-100">Jenis Kelamin</Form.Label>
												<div className="w-100" ref={(ref) => (formRef.current.jenisKelamin = ref)}>
													<label className="me-2 cursor-pointer" htmlFor="jenisPutra">
														<Card bg={(jenisKelamin && jenisKelamin.Putra === true) ? "outline-primary" : "none"} className="jenis-kelamin-card">
															<h3>
																<FontAwesomeIcon icon={faMale} />
															</h3>
															<p>Putra</p>
														</Card>
													</label>
													<label className="me-2 cursor-pointer" htmlFor="jenisPutri">
														<Card bg={(jenisKelamin && jenisKelamin.Putri === true) ? "outline-primary" : "none"} className="jenis-kelamin-card">
															<h3>
																<FontAwesomeIcon icon={faFemale} />
															</h3>
															<p>Putri</p>
														</Card>
													</label>
													<label className="me-2 cursor-pointer" htmlFor="jenisCampur">
														<Card bg={(jenisKelamin && jenisKelamin.Campur === true) ? "outline-primary" : "none"} className="jenis-kelamin-card">
															<h3>
																<FontAwesomeIcon icon={faUsers} />
															</h3>
															<p>Campur</p>
														</Card>
													</label>
													<input type="radio" name="jenisKelamin" id="jenisPutra" hidden
														checked={jenisKelamin.Putra === true}
														onChange={e => handleJenisChange("Putra")}
													/>
													<input type="radio" name="jenisKelamin" id="jenisPutri" hidden
														checked={jenisKelamin.Putri === true}
														onChange={e => handleJenisChange("Putri")}
													/>
													<input type="radio" name="jenisKelamin" id="jenisCampur" hidden
														checked={jenisKelamin.Campur === true}
														onChange={e => handleJenisChange("Campur")}
													/>
												</div>
												{error.hasOwnProperty("jenis") && error.jenis !== "" ? (
													<Form.Text className="text-danger">{error.jenis}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicDeskripsi" ref={(ref) => (formRef.current.foto = ref)}>
												<Form.Label className="w-100">Foto Kos</Form.Label>
												<img
													src={previewFrontPhoto}
													className="rounded preview-photo"
													alt="..."
												/>
												<Form.Control
													type="file"
													name="fotoDepan"
													onChange={changeFrontPhotoHandler}
													ref={(ref) => (formRef.current.fotoDepan = ref)}
												/>
												<Form.Text>
													Upload foto dari depan kos dengan extensi ".png", ".jpg", atau
													".jpeg"
												</Form.Text>
												<br />
												{error.hasOwnProperty("fotoDepan") && error.fotoDepan !== "" ? (
													<Form.Text className="text-danger">{error.fotoDepan}</Form.Text>
												) : (
													""
												)}
												<br />
												{error.hasOwnProperty("fotoDepanJalan") &&
													error.fotoDepanJalan !== "" ? (
													<Form.Text className="text-danger">
														{error.fotoDepanJalan}
													</Form.Text>
												) : (
													""
												)}
												<img
													src={previewFrontFarPhoto}
													className="rounded preview-photo"
													alt="..."
												/>
												<Form.Control
													type="file"
													className="mt-3"
													onChange={changeFrontFarPhotoHandler}
													ref={(ref) => (formRef.current.fotoDepanJauh = ref)}
												/>
												<Form.Text>
													Upload foto dari jauh memperlihatkan seluruh bangunan kos dengan
													extensi ".png", ".jpg", atau ".jpeg"
												</Form.Text>
												<br />
												{error.hasOwnProperty("fotoDepanJauh") &&
													error.fotoDepanJauh !== "" ? (
													<Form.Text className="text-danger">
														{error.fotoDepanJauh}
													</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicNama">
												<Form.Label className="w-100">Tahun kos dibangun</Form.Label>
												<Form.Control
													type="text"
													placeholder="Masukkan tahun kos selesai dibangun"
													ref={(ref) => (formRef.current.tahun = ref)}
												/>
												{error.hasOwnProperty("tahun") && error.tahun !== "" ? (
													<Form.Text className="text-danger">{error.tahun}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<hr />
											<h3 className="my-2">Data Alamat</h3>
											<Form.Group className="mb-3" controlId="formBasicProvinsi">
												<Form.Label className="w-100">Provinsi</Form.Label>
												<Form.Control
													type="text"
													list="provinsi-list"
													placeholder="Masukkan Provinsi kos"
													ref={(ref) => (formRef.current.provinsi = ref)}
												/>
												<datalist id="provinsi-list">
													{provinsi.map((el, i) => {
														return <option key={i} value={el} />;
													})}
												</datalist>
												{error.hasOwnProperty("provinsi") && error.provinsi !== "" ? (
													<Form.Text className="text-danger">{error.provinsi}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicKota">
												<Form.Label className="w-100">Kabupaten / Kota</Form.Label>
												<Form.Control
													type="text"
													placeholder="Masukkan kabupaten / kota kos"
													ref={(ref) => (formRef.current.kota = ref)}
												/>
												{error.hasOwnProperty("kota") && error.kota !== "" ? (
													<Form.Text className="text-danger">{error.kota}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicAlamat">
												<Form.Label className="w-100">Alamat</Form.Label>
												<Form.Control
													as="textarea"
													rows={3}
													placeholder="Masukkan alamat kos"
													ref={(ref) => (formRef.current.alamat = ref)}
												/>
												{error.hasOwnProperty("alamat") && error.alamat !== "" ? (
													<Form.Text className="text-danger">{error.alamat}</Form.Text>
												) : (
													""
												)}
											</Form.Group>
											<hr />
											<h3 className="my-2">Data Peraturan</h3>
											<Form.Group className="mb-3" controlId="formBasicCheckbox">
												{Object.keys(rule).map((el, i) => {
													return (
														<Form.Check
															className="w-100 mb-3"
															type="checkbox"
															label={el}
															key={i}
															defaultChecked={Object.values(rule)[i]}
															ref={(ref) => (ruleRef.current[i] = ref)}
														/>
													);
												})}
											</Form.Group>
											<hr />
											<h3 className="my-2">Data Fasilitas</h3>
											<Form.Group className="mb-3" controlId="formBasicCheckbox">
												<Row xs={1} lg={2}>
													{Object.keys(facility).map((el, i) => {
														return (
															<Col key={i}>
																<Form.Check
																	className="mb-3"
																	type="checkbox"
																	label={el}
																	key={i}
																	defaultChecked={Object.values(facility)[i]}
																	ref={(ref) => (facilityRef.current[i] = ref)}
																/>
															</Col>
														);
													})}
												</Row>
											</Form.Group>
											<div className="d-grid">
												<Button variant="primary" type="submit"
													disabled={loadingUpdate || loadingDelete}
												>
													Ubah Kos
												</Button>
											</div>
										</Form>
										<hr />
										<div className="d-flex justify-content-between my-2">
											<h3>Data Kamar</h3>
											<Button size="sm" variant="primary"
												disabled={loadingUpdate || loadingDelete}
												onClick={e => navigate('/penyewa/kos/kamar/tambah/' + dataOne.kost[0].kost_id)}
											>
												Tambah Kamar
											</Button>
										</div>
										<Table responsive striped bordered>
											<thead>
												<tr>
													<th>No</th>
													<th>Nama Kamar</th>
													<th>Ukuran Kamar</th>
													<th>Total Kamar</th>
													<th>Kamar Kosong</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{
													room !== undefined && room.length === 0 ?
														<tr>
															<td colSpan={4}>Tidak ada kamar</td>
														</tr> :
														room.map((el, i) => {
															return (
																<tr key={i}>
																	<td>{i + 1}</td>
																	<td>{el.room_name}</td>
																	<td>{el.size_room}</td>
																	<td>{el.quantity_room}</td>
																	<td>{el.available_room}</td>
																	<td>
																		<ButtonGroup>
																			<Button size="sm" variant="warning"
																				disabled={loadingUpdate || loadingDelete}
																				onClick={e => navigate('/penyewa/kos/kamar/edit/' + el.room_id)}
																			>
																				Ubah
																			</Button>
																			<Button size="sm" variant="danger"
																				disabled={loadingUpdate || loadingDelete}
																				onClick={e => handleDeleteRoom(e, el.room_id)}
																			>
																				Hapus
																			</Button>
																		</ButtonGroup>
																	</td>
																</tr>
															)
														})
												}
											</tbody>
										</Table>
									</> : ""
						}
					</Col>
				</Row>
			</Container>
		</PenyewaLayout>
	)
}

export default EditKos