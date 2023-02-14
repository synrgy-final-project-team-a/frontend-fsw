import { useEffect, useRef, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import PenyewaLayout from "../../../layouts/penyewa.layout"
import { useGetOneKamarByPenyewaMutation, useUpdateRoomByPenyewaMutation } from "../../../store/apis/kos"
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const EditKamar = () => {
	const navigate = useNavigate()
	const params = useParams()

	const fasilitasKamar = useSelector((state) => state.kos.fasilitasKamar);
	const fasilitasKamarMandi = useSelector((state) => state.kos.fasilitasKamarMandi);

	const formRef = useRef({});
	const fasilitasKamarRef = useRef([]);
	const fasilitasKamarMandiRef = useRef([]);
	const [error, setError] = useState({});
	const [selectedFotoDalam, setSelectedFotoDalam] = useState();
	const [previewFotoDalam, setPreviewFotoDalam] = useState();
	const [selectedFotoKamarMandi, setSelectedFotoKamarMandi] = useState();
	const [previewFotoKamarMandi, setPreviewFotoKamarMandi] = useState();

	const [
		oneHit,
		{ isLoading: loadingOne, isSuccess: successOne, isError: errorOne, data: dataOne }
	] = useGetOneKamarByPenyewaMutation()

	const [
		updateHit,
		{ isLoading: loadingUpdate, isSuccess: successUpdate, isError: errorUpdate }
	] = useUpdateRoomByPenyewaMutation()

	const handleUbahSubmit = async (e) => {
		e.preventDefault()

		const confirm = window.confirm("Apakah anda yakin?")

		if (!confirm) {
			return
		}

		setError({})

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

		updateHit({ idKost: params.id, body: formdata })
	}

	useEffect(() => {
		if (successOne) {
			let room = dataOne.room[0]

			console.log(dataOne)
			// formRef.current.nama.value = kos.kost_name
			// formRef.current.deskripsi.value = kos.description
			// formRef.current.tahun.value = kos.year_since
			// setPreviewFrontPhoto(kos.front_building_photo)
			// setPreviewFarRoadPhoto(kos.front_farbuilding_photo)
			// formRef.current.provinsi.value = kos.province
			// formRef.current.kota.value = kos.city
			// formRef.current.alamat.value = kos.address

			// fasilitasKamarRef.current[0].checked = kos.restricted_night
			// fasilitasKamarRef.current[1].checked = kos.identity_card
			// fasilitasKamarRef.current[2].checked = kos.restricted_gender
			// fasilitasKamarRef.current[3].checked = kos.restricted_guest
			// fasilitasKamarRef.current[4].checked = kos.maxixmum_one
			// fasilitasKamarRef.current[5].checked = kos.maximum_two
			// fasilitasKamarRef.current[6].checked = kos.restricted_checkout
			// fasilitasKamarRef.current[7].checked = kos.restricted_checkin
			// fasilitasKamarRef.current[8].checked = kos.include_electricity
			// fasilitasKamarRef.current[9].checked = kos.no_smoking

			// fasilitasKamarMandiRef.current[0].checked = kos.water;
			// fasilitasKamarMandiRef.current[1].checked = kos.parking_car;
			// fasilitasKamarMandiRef.current[2].checked = kos.parking_motorcycle;
			// fasilitasKamarMandiRef.current[3].checked = kos.dispenser;
			// fasilitasKamarMandiRef.current[4].checked = kos.laundry;
			// fasilitasKamarMandiRef.current[5].checked = kos.kitchen;
			// fasilitasKamarMandiRef.current[6].checked = kos.drying_ground;
			// fasilitasKamarMandiRef.current[7].checked = kos.living_room;
			// fasilitasKamarMandiRef.current[8].checked = kos.wifi;
			// fasilitasKamarMandiRef.current[9].checked = kos.refrigerator;
			// fasilitasKamarMandiRef.current[10].checked = kos.kost_tv;
			// fasilitasKamarMandiRef.current[11].checked = kos.electric;
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
									<h3 className="my-2">Data Kamar</h3>
									<Form.Group className="mb-3">
										<Form.Label>Nama Kamar</Form.Label>
										<Card className="skeleton p-1">
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Foto Kamar Kos</Form.Label>
										<Card className="skeleton p-1" style={{ height: "200px" }}>
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Ukuran kamar</Form.Label>
										<Card className="skeleton p-1">
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Total kamar</Form.Label>
										<Card className="skeleton p-1">
											&nbsp;
										</Card>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Ketersediaan jumlah kamar</Form.Label>
										<Card className="skeleton p-1">
											&nbsp;
										</Card>
									</Form.Group>
								</div> :
								successOne ?
									<Form onSubmit={handleUbahSubmit}>
										<h3 className="my-2">Data Kamar</h3>
										<hr />
										<h3 className="my-2">Data Alamat</h3>
										<hr />
										<h3 className="my-2">Data Peraturan</h3>
										<hr />
										<h3 className="my-2">Data Fasilitas</h3>
										<div className="d-grid">
											<Button variant="primary" type="submit"
											>
												Ubah Kamar
											</Button>
										</div>
									</Form> : ""
						}
					</Col>
				</Row>
			</Container>
		</PenyewaLayout>
	)
}

export default EditKamar