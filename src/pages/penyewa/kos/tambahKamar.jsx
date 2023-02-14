import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import PenyewaLayout from "../../../layouts/penyewa.layout"
import { useInsertRoomByPenyewaMutation } from "../../../store/apis/kos"
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const TambahKamar = () => {
	const navigate = useNavigate()
	const params = useParams()

	const fasilitasKamar = useSelector((state) => state.kos.fasilitasKamar);
	const fasilitasKamarMandi = useSelector((state) => state.kos.fasilitasKamarMandi);
	const price = useSelector((state) => state.kos.harga);

	const formRef = useRef({});
	const fasilitasKamarRef = useRef([]);
	const fasilitasKamarMandiRef = useRef([]);
	const checkHargaRef = useRef({});
	const inputHargaRef = useRef({});
	const [error, setError] = useState({});
	const [selectedFotoDalam, setSelectedFotoDalam] = useState();
	const [previewFotoDalam, setPreviewFotoDalam] = useState();
	const [selectedFotoKamarMandi, setSelectedFotoKamarMandi] = useState();
	const [previewFotoKamarMandi, setPreviewFotoKamarMandi] = useState();

	const [
		insertHit,
		{ isLoading: loadingInsert, isSuccess: successInsert, isError: errorInsert, error: errorsInsert }
	] = useInsertRoomByPenyewaMutation()

	const handleInsertSubmit = async (e) => {
		e.preventDefault()

		const confirm = window.confirm("Apakah anda yakin?")

		if (!confirm) {
			return
		}

		setError({})

		const namaKamar = formRef.current.namaKamar
		const foto = formRef.current.foto;
		const ukuranKamar = formRef.current.ukuranKamar
		const totalKamar = formRef.current.totalKamar
		const ketersediaanKamar = formRef.current.ketersediaanKamar
		const fotoDalam = selectedFotoDalam;
		const fotoKamarMandi = selectedFotoKamarMandi;
		const harga = formRef.current.harga;

		const ac = fasilitasKamarRef.current[0].checked
		const pillow = fasilitasKamarRef.current[1].checked
		const fan = fasilitasKamarRef.current[2].checked
		const furniture = fasilitasKamarRef.current[3].checked
		const windows = fasilitasKamarRef.current[4].checked
		const springbed = fasilitasKamarRef.current[5].checked
		const room_tv = fasilitasKamarRef.current[6].checked
		const table_learning = fasilitasKamarRef.current[7].checked
		const chair = fasilitasKamarRef.current[8].checked

		const outside_bathroom = fasilitasKamarMandiRef.current[0].checked
		const sitting_closet = fasilitasKamarMandiRef.current[1].checked
		const water_heater = fasilitasKamarMandiRef.current[2].checked
		const inside_bathroom = fasilitasKamarMandiRef.current[3].checked
		const non_sitting_closet = fasilitasKamarMandiRef.current[4].checked
		const shower = fasilitasKamarMandiRef.current[5].checked

		if (namaKamar.value === "") {
			setError((error) => ({
				...error,
				namaKamar: "Nama kamar tidak boleh kosong!",
			}));
			namaKamar.scrollIntoView()
			return
		}

		if (fotoDalam === undefined) {
			setError((error) => ({
				...error,
				fotoDalam: "Foto dalam kamar tidak boleh kosong!",
			}));
			foto.scrollIntoView()
			return
		} else {
			if (!imgAllow.includes(fotoDalam.type)) {
				setError((error) => ({
					...error,
					fotoDalam: "Foto dalam kamar bukan gambar yang didukung!",
				}));
				foto.scrollIntoView()
				return
			}
		}

		if (fotoKamarMandi === undefined) {
			setError((error) => ({
				...error,
				fotoKamarMandi: "Foto lain tidak boleh kosong!",
			}));
			foto.scrollIntoView()
			return
		} else {
			if (!imgAllow.includes(fotoKamarMandi.type)) {
				setError((error) => ({
					...error,
					fotoKamarMandi: "Foto lain bukan gambar yang didukung!",
				}));
				foto.scrollIntoView()
				return
			}
		}

		if (ukuranKamar.value === "") {
			setError((error) => ({
				...error,
				ukuranKamar: "Ukuran kamar tidak boleh kosong!",
			}));
			ukuranKamar.scrollIntoView()
			return
		}

		if (totalKamar.value === "") {
			setError((error) => ({
				...error,
				totalKamar: "Total kamar tidak boleh kosong!",
			}));
			totalKamar.scrollIntoView()
			return
		} else {
			if (!/[0-9]/i.test(totalKamar.value)) {
				setError((error) => ({
					...error,
					totalKamar: "Total kamar harus angka!",
				}));
				totalKamar.scrollIntoView()
				return
			}
		}

		if (ketersediaanKamar.value === "") {
			setError((error) => ({
				...error,
				ketersediaanKamar: "ketersediaan kamar tidak boleh kosong!",
			}));
			ketersediaanKamar.scrollIntoView()
			return
		} else {
			if (!/[0-9]/i.test(ketersediaanKamar.value)) {
				setError((error) => ({
					...error,
					ketersediaanKamar: "Ketersediaan kamar harus angka!",
				}));
				ketersediaanKamar.scrollIntoView()
				return
			} else {
				if (parseInt(totalKamar.value) < parseInt(ketersediaanKamar.value)) {
					setError((error) => ({
						...error,
						ketersediaanKamar: "ketersediaan kamar tidak boleh lebih dari total kamar!",
					}));
					ketersediaanKamar.scrollIntoView()
					return
				}
			}
		}

		const checkHarga1 = checkHargaRef.current[0].checked;
		const checkHarga2 = checkHargaRef.current[1].checked;
		const checkHarga3 = checkHargaRef.current[2].checked;
		const checkHarga4 = checkHargaRef.current[3].checked;
		const checkHarga5 = checkHargaRef.current[4].checked;
		const checkHarga6 = checkHargaRef.current[5].checked;

		const inputHarga1 = inputHargaRef.current[0].value;
		const inputHarga2 = inputHargaRef.current[1].value;
		const inputHarga3 = inputHargaRef.current[2].value;
		const inputHarga4 = inputHargaRef.current[3].value;
		const inputHarga5 = inputHargaRef.current[4].value;
		const inputHarga6 = inputHargaRef.current[5].value;

		const payloadHarga = {
			harian: 0,
			mingguan: 0,
			bulanan: 0,
			"3 bulanan": 0,
			"6 bulanan": 0,
			tahunan: 0
		};

		if (checkHarga1) {
			if (inputHarga1 === "") {
				setError((error) => ({
					...error,
					harian: "Harga harian tidak boleh kosong!",
				}));
				harga.scrollIntoView()
				return
			} else {
				if (!/[0-9]/i.test(inputHarga1)) {
					setError((error) => ({
						...error,
						harian: "Harga harian harus angka!",
					}));
					harga.scrollIntoView()
					return
				}
			}
			payloadHarga.harian = inputHarga1
		}

		if (checkHarga2) {
			if (inputHarga2 === "") {
				setError((error) => ({
					...error,
					mingguan: "Harga mingguan tidak boleh kosong!",
				}));
				harga.scrollIntoView()
				return
			} else {
				if (!/[0-9]/i.test(inputHarga2)) {
					setError((error) => ({
						...error,
						mingguan: "Harga mingguan harus angka!",
					}));
					harga.scrollIntoView()
					return
				}
			}
			payloadHarga.mingguan = inputHarga2
		}

		if (checkHarga3) {
			if (inputHarga3 === "") {
				setError((error) => ({
					...error,
					bulanan: "Harga bulanan tidak boleh kosong!",
				}));
				harga.scrollIntoView()
				return
			} else {
				if (!/[0-9]/i.test(inputHarga3)) {
					setError((error) => ({
						...error,
						bulanan: "Harga bulanan harus angka!",
					}));
					harga.scrollIntoView()
					return
				}
			}
			payloadHarga.bulanan = inputHarga3
		}

		if (checkHarga4) {
			if (inputHarga4 === "") {
				setError((error) => ({
					...error,
					"3 bulanan": "Harga 3 bulanan tidak boleh kosong!",
				}));
				harga.scrollIntoView()
				return
			} else {
				if (!/[0-9]/i.test(inputHarga4)) {
					setError((error) => ({
						...error,
						"3 bulanan": "Harga 3 bulanan harus angka!",
					}));
					harga.scrollIntoView()
					return
				}
			}
			payloadHarga["3 bulanan"] = inputHarga4
		}

		if (checkHarga5) {
			if (inputHarga5 === "") {
				setError((error) => ({
					...error,
					"6 bulanan": "Harga 6 bulanan tidak boleh kosong!",
				}));
				harga.scrollIntoView()
				return
			} else {
				if (!/[0-9]/i.test(inputHarga5)) {
					setError((error) => ({
						...error,
						"6 bulanan": "Harga 6 bulanan harus angka!",
					}));
					harga.scrollIntoView()
					return
				}
			}
			payloadHarga["6 bulanan"] = inputHarga5
		}

		if (checkHarga6) {
			if (inputHarga6 === "") {
				setError((error) => ({
					...error,
					tahunan: "Harga tahunan tidak boleh kosong!",
				}));
				harga.scrollIntoView()
				return
			} else {
				if (!/[0-9]/i.test(inputHarga6)) {
					setError((error) => ({
						...error,
						tahunan: "Harga tahunan harus angka!",
					}));
					harga.scrollIntoView()
					return
				}
			}
			payloadHarga.tahunan = inputHarga6
		}

		toast.loading('Sedang menambahkan kamar', {
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

		formdata.append("roomName", namaKamar.value)
		formdata.append("insideRoomPhoto", fotoDalam)
		formdata.append("otherRoomPhoto", fotoKamarMandi)
		formdata.append("quantityRoom", totalKamar.value)
		formdata.append("availableRoom", ketersediaanKamar.value)
		formdata.append("sizeRoom", ukuranKamar.value)
		formdata.append("ac", ac)
		formdata.append("pillow", pillow)
		formdata.append("fan", fan)
		formdata.append("furniture", furniture)
		formdata.append("shower", shower)
		formdata.append("sittingCloset", sitting_closet)
		formdata.append("springBed", springbed)
		formdata.append("tableLearning", table_learning)
		formdata.append("waterHeater", water_heater)
		formdata.append("insideBathroom", inside_bathroom)
		formdata.append("nonSittingCloset", non_sitting_closet)
		formdata.append("outsideBathroom", outside_bathroom)
		formdata.append("windows", windows)
		formdata.append("chair", chair)
		formdata.append("roomTv", room_tv)
		formdata.append("priceDaily", payloadHarga.harian)
		formdata.append("priceWeekly", payloadHarga.mingguan)
		formdata.append("priceMonthly", payloadHarga.bulanan)
		formdata.append("priceQuarter", payloadHarga["3 bulanan"])
		formdata.append("priceSemester", payloadHarga["6 bulanan"])
		formdata.append("priceYearly", payloadHarga.tahunan)

		insertHit({ idKost: params.id, body: formdata })
	}

	useEffect(() => {
		if (successInsert) {
			toast.dismiss()
			toast.success("Sukses mengubah kamar", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			setTimeout(() => {
				navigate('/penyewa/kos/edit/' + params.id)
			}, 1000);
		}

		if (errorInsert) {
			toast.dismiss()
			if (errorsInsert.hasOwnProperty('data')) {
				if (Array.isArray(errorsInsert.data)) {
					errorsInsert.data.forEach((el) => {
						toast.error(el.data.message, {
							position: "top-center",
							autoClose: 1000,
							hideProgressBar: false,
							closeOnClick: false,
							pauseOnHover: false,
							draggable: false,
							progress: undefined,
							theme: "light",
						})
					})
				} else {
					toast.error(errorsInsert.data.message, {
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
			} else {
				toast.error("Gagal menambahkan kamar", {
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingInsert])

	const changeFotoDalamHandler = (e) => {
		e.preventDefault();
		setError((error) => ({ ...error, fotoDalam: "" }));

		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFotoDalam(undefined);
			return;
		}
		if (!imgAllow.includes(e.target.files[0].type)) {
			setError((error) => ({
				...error,
				fotoDalam: "Foto dalam kamar bukan gambar yang didukung!",
			}));
			formRef.current.foto.scrollIntoView()
			return;
		}

		setSelectedFotoDalam(e.target.files[0]);
	};

	useEffect(() => {
		if (!selectedFotoDalam) {
			setPreviewFotoDalam(undefined);
			return;
		}

		let objectUrl = URL.createObjectURL(selectedFotoDalam);
		setPreviewFotoDalam(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFotoDalam]);

	const changeFotoKamarMandiHandler = (e) => {
		e.preventDefault();
		setError((error) => ({ ...error, fotoKamarMandi: "" }));

		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFotoKamarMandi(undefined);
			return;
		}
		if (!imgAllow.includes(e.target.files[0].type)) {
			setError((error) => ({
				...error,
				fotoKamarMandi: "Foto kamar mandi bukan gambar yang didukung!",
			}));
			formRef.current.foto.scrollIntoView()
			return;
		}

		setSelectedFotoKamarMandi(e.target.files[0]);
	};

	useEffect(() => {
		if (!selectedFotoKamarMandi) {
			setPreviewFotoKamarMandi(undefined);
			return;
		}

		let objectUrl = URL.createObjectURL(selectedFotoKamarMandi);
		setPreviewFotoKamarMandi(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFotoKamarMandi])

	return (
		<PenyewaLayout>
			<Container className="mt-4">
				<Row className="justify-content-center">
					<Col xs={12} lg={6}>
						<Form onSubmit={handleInsertSubmit}>
							<h3 className="my-2">Data Kamar</h3>
							<Form.Group className="mb-3" controlId="formBasicNamaKamar">
								<Form.Label className="w-100">Nama Kamar</Form.Label>
								<Form.Control
									type="text"
									placeholder="Masukkan nama kamar"
									ref={(ref) => (formRef.current.namaKamar = ref)}
								/>
								{error.hasOwnProperty("namaKamar") && error.namaKamar !== "" ? (
									<Form.Text className="text-danger">{error.namaKamar}</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicFotoKamar" ref={(ref) => (formRef.current.foto = ref)}>
								<Form.Label className="w-100 mb-0">Foto Kamar Kos</Form.Label>
								{selectedFotoDalam ? (
									<img
										src={previewFotoDalam}
										className="rounded preview-photo mt-2"
										alt="..."
									/>
								) : (
									""
								)}
								<Form.Control
									type="file"
									name="fotoDalam"
									onChange={changeFotoDalamHandler}
								/>
								<Form.Text>
									Upload Foto dalam kamar kos dengan extensi ".png", ".jpg", atau
									".jpeg"
								</Form.Text>
								<br />
								{error.hasOwnProperty("fotoDalam") &&
									error.fotoDalam !== "" ? (
									<Form.Text className="text-danger">
										{error.fotoDalam}
									</Form.Text>
								) : (
									""
								)}
								{selectedFotoKamarMandi ? (
									<img
										src={previewFotoKamarMandi}
										className="rounded preview-photo mt-2"
										alt="..."
									/>
								) : (
									""
								)}
								<Form.Control
									type="file"
									onChange={changeFotoKamarMandiHandler}
								/>
								<Form.Text>
									Upload *foto kamar mandi (opsional) dengan extensi ".png",
									".jpg", atau ".jpeg"
								</Form.Text>
								<br />
								{error.hasOwnProperty("fotoKamarMandi") &&
									error.fotoKamarMandi !== "" ? (
									<Form.Text className="text-danger">
										{error.fotoKamarMandi}
									</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicUkuranKamar">
								<Form.Label className="w-100">Ukuran kamar</Form.Label>
								<Form.Control
									type="text"
									placeholder="Masukkan ukuran kamar"
									ref={(ref) => (formRef.current.ukuranKamar = ref)}
								/>
								{error.hasOwnProperty("ukuranKamar") &&
									error.ukuranKamar !== "" ? (
									<Form.Text className="text-danger">
										{error.ukuranKamar}
									</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicTotalKamar">
								<Form.Label className="w-100">Total kamar</Form.Label>
								<Form.Control
									type="text"
									placeholder="Masukkan total kamar kos"
									ref={(ref) => (formRef.current.totalKamar = ref)}
								/>
								{error.hasOwnProperty("totalKamar") && error.totalKamar !== "" ? (
									<Form.Text className="text-danger">
										{error.totalKamar}
									</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicKetersediaanKamar">
								<Form.Label className="w-100">
									Ketersediaan jumlah kamar
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Masukkan ketersediaan jumlah kamar"
									ref={(ref) => (formRef.current.ketersediaanKamar = ref)}
								/>
								{error.hasOwnProperty("ketersediaanKamar") &&
									error.ketersediaanKamar !== "" ? (
									<Form.Text className="text-danger">
										{error.ketersediaanKamar}
									</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<hr />
							<h3 className="my-2">Data Fasilitas Kamar</h3>
							<Form.Group
								className="mb-3 ms-1"
								controlId="formBasicCheckbox"
							>
								<Row xs={1} lg={2}>
									{Object.keys(fasilitasKamar).map((el, i) => {
										return (
											<Col key={i}>
												<Form.Check
													className="mb-3"
													type="checkbox"
													label={el}
													defaultChecked={Object.values(fasilitasKamar)[i]}
													ref={(ref) => (fasilitasKamarRef.current[i] = ref)}
												/>
											</Col>
										);
									})}
								</Row>
								{error.hasOwnProperty("fasilitasKamar") &&
									error.fasilitasKamar !== "" ? (
									<Form.Text className="text-danger">
										{error.fasilitasKamar}
									</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<hr />
							<h3 className="my-2">Data Fasilitas Kamar Mandi</h3>
							<Form.Group
								className="mb-3 ms-1"
								controlId="formBasicCheckbox"
							>
								<Row xs={1} lg={2}>
									{Object.keys(fasilitasKamarMandi).map((el, i) => {
										return (
											<Col key={i}>
												<Form.Check
													className="mb-3"
													type="checkbox"
													label={el}
													defaultChecked={Object.values(fasilitasKamarMandi)[i]}
													ref={(ref) => (fasilitasKamarMandiRef.current[i] = ref)}
												/>
											</Col>
										);
									})}
								</Row>
								{error.hasOwnProperty("fasilitasKamarMandi") &&
									error.fasilitasKamarMandi !== "" ? (
									<Form.Text className="text-danger">
										{error.fasilitasKamarMandi}
									</Form.Text>
								) : (
									""
								)}
							</Form.Group>
							<hr />
							<Form.Group className="mb-3" controlId="formBasicCheckbox" ref={(ref) => (formRef.current.harga = ref)}>
								{Object.keys(price).map((el, i) => {
									return (
										<div className="d-flex mb-3 w-100 align-items-center" key={i}>
											<Form.Check
												className="w-50"
												type="checkbox"
												label={el}
												ref={(ref) => (checkHargaRef.current[i] = ref)}
											/>
											<div>
												<Form.Control
													type="text"
													placeholder={el}
													ref={(ref) => (inputHargaRef.current[i] = ref)}
												/>
												{error.hasOwnProperty(el) && error[el] !== "" ? (
													<Form.Text className="text-danger">{error[el]}</Form.Text>
												) : (
													""
												)}
											</div>
										</div>
									);
								})}
							</Form.Group>
							<div className="d-grid">
								<Button variant="primary" type="submit"
								>
									Tambah Kamar
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</PenyewaLayout>
	)
}

export default TambahKamar