import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import AdminLayout from "../../../layouts/admin.layout"
import { toast } from "react-toastify";
import { useAddBannerMutation, useDeleteBannerMutation, useListBannerMutation } from "../../../store/apis/banner";

const imgAllow = [
	"image/png",
	"image/jpg",
	"image/jpeg",
]

const ListBanner = () => {
	const namaBannerRef = useRef();
	const [show, setShow] = useState(false);
	const [selectedBanner, setSelectedBanner] = useState()
	const [previewBanner, setPreviewBanner] = useState()

	const [
		listHit,
		{ isLoading: loadingList, isSuccess: successList, isError: errorList, data: dataList }
	] = useListBannerMutation()
	const [
		addHit,
		{ isLoading: loadingAdd, isSuccess: successAdd, isError: errorAdd, error: errorsAdd }
	] = useAddBannerMutation()
	const [
		deleteHit,
		{ isLoading: loadingDelete, isSuccess: successDelete, isError: errorDelete }
	] = useDeleteBannerMutation()

	const handleClose = () => {
		if (!loadingAdd) {
			setShow(false)
		}
	}
	const handleShow = () => setShow(true);

	const submitBanner = (e) => {
		e.preventDefault()

		if (namaBannerRef.current.value === "") {
			toast.error("Nama banner tidak boleh kosong", {
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

		if (selectedBanner === undefined) {
			toast.error("Tambahkan sebuah file gambar", {
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

		toast.loading('Sedang menambahkan banner', {
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

		formdata.append("bannerName", namaBannerRef.current.value)
		formdata.append("bannerImage", selectedBanner)

		addHit(formdata)
	}

	const handleDeleteBanner = (e, id) => {
		e.preventDefault()

		const confirm = window.confirm("Apakah anda yakin?")

		if (!confirm) {
			return
		}

		toast.loading('Sedang menghapus banner', {
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

	const changeBannerHandler = (e) => {
		e.preventDefault()

		if (!e.target.files || e.target.files.length === 0) {
			setSelectedBanner(undefined)
			return
		}

		if (!imgAllow.includes(e.target.files[0].type)) {
			toast.error("File tidak didukung", {
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

		setSelectedBanner(e.target.files[0])
	}

	useEffect(() => {
		if (!selectedBanner) {
			setPreviewBanner(undefined)
			return
		}

		let objectUrl = URL.createObjectURL(selectedBanner)
		setPreviewBanner(objectUrl)

		return () => URL.revokeObjectURL(objectUrl)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedBanner])

	useEffect(() => {
		if (successAdd) {
			toast.dismiss()
			toast.success("Sukses menambah banner", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})

			namaBannerRef.current.value = ""
			URL.revokeObjectURL(previewBanner)
			setPreviewBanner(undefined)
			setSelectedBanner(undefined)
			handleClose()
			listHit()
		}

		if (errorAdd) {
			console.log(errorsAdd)
			toast.dismiss()
			toast.error("Gagal menambah banner", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})

			handleClose()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingAdd])

	useEffect(() => {
		if (successDelete) {
			toast.dismiss()
			toast.success("Sukses menghapus banner", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})

			handleClose()
			listHit()
		}

		if (errorDelete) {
			toast.dismiss()
			toast.error("Gagal menghapus banner", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})

			handleClose()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingDelete])

	useEffect(() => {
		listHit()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<AdminLayout>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Banner</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control type="text" className="mb-2" placeholder="Nama banner"
						ref={namaBannerRef}
						disabled={loadingAdd}
					/>
					<Form.Control type="file" className="mb-2"
						onChange={changeBannerHandler}
						disabled={loadingAdd}
					/>
					{
						selectedBanner ?
							<img src={previewBanner} className="img-fluid" alt="..." />
							: ""
					}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary"
						onClick={submitBanner}
						disabled={loadingAdd}
					>
						Tambah
					</Button>
				</Modal.Footer>
			</Modal>
			<Container className="mt-4">
				<div>
					<h2 className="mt-3">List Users</h2>
					<Button className="mb-4" variant="primary" onClick={handleShow}>Tambah Banner</Button>
				</div>
				<Row className="g-4">
					{
						loadingList ?
							[...Array(4).keys()].map((el, i) => {
								return (
									<Col xs={12} lg={6} key={i}>
										<Card bg="none" className="skeleton" style={{ height: "350px" }}>
											&nbsp;
										</Card>
									</Col>
								)
							}) :
							successList ?
								dataList.data.length === 0 ?
									<h4 className="mt-3">Banner kosong</h4> :
									dataList.data.map((el, i) => {
										return (
											<Col xs={12} lg={6} key={i}>
												<Card bg="outline-primary" className="banner-card">
													<Card.Img variant="top" src={el.bannerImage} alt={el.bannerName} />
													<Card.Body className="d-flex justify-content-end align-items-center">
														<span className="me-3">{el.bannerName}</span>
														<Button variant="outline-danger"
															disabled={loadingAdd || loadingList || loadingDelete}
															onClick={e => handleDeleteBanner(e, el.id)}
														>
															Hapus
														</Button>
													</Card.Body>
												</Card>
											</Col>
										)
									}) :
								errorList ?
									<h4 className="mt-3">Gagal mengambil banner</h4> : ""
					}
				</Row>
			</Container>
		</AdminLayout>
	)
}

export default ListBanner