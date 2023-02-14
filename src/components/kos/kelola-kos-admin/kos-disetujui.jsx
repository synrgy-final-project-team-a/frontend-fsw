import { useEffect } from "react"
import { Table, Button, ButtonGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useListKosMutation, useDeleteKosMutation } from "../../../store/apis/kos";
import { toast } from "react-toastify";

const KosDisetujui = () => {
	const [listKosHit, { isLoading, isSuccess, data }] = useListKosMutation();
	const [deleteKosHit, { isLoading: loadingDelete, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteKosMutation();
	const token = useSelector((state) => state.auth.token.access_token)
	const param = {
		page: 0,
		size: 12,
		enabled: true
	}

	const handleDeleteKos = (e, id) => {
		e.preventDefault();
		let confirm = window.confirm("Hapus Kos ini?");

		if (!confirm) {
			return
		}

		toast.loading('Sedang menyetujui kos', {
			position: "top-center",
			autoClose: false,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "light",
		})

		deleteKosHit({ token: token, id: id });
	}

	useEffect(() => {
		listKosHit({ token: token, page: param.page, size: param.size, enabled: param.enabled })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (deleteSuccess) {
			toast.dismiss()
			toast.success("Sukses menghapus kos", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			listKosHit({ token: token, page: param.page, size: param.size, enabled: param.enabled })
		}

		if (deleteError) {
			toast.dismiss()
			toast.error("Gagal menghapus kos", {
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

	return (
		<>
			<h3 className="mt-3">Daftar Kos</h3>
			<Table striped hover size="sm" className="mt-3">
				<thead>
					<tr>
						<th>No</th>
						<th>Nama Kos</th>
						<th>Penyewa</th>
						<th>Alamat</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						isLoading ?
							<tr>
								<td colSpan={6} className="text-center">Loading...</td>
							</tr> :
							isSuccess ?
								data.data.content.map((el, it) => {
									return (
										<tr key={it}>
											<td>{it + 1}</td>
											<td>{el.kostName}</td>
											<td>{`${el.profile.firstName} ${el.profile.lastName}`}</td>

											<td>{el.address}</td>
											<td>{el.enabled ?
												<span>Disetujui</span> : ""}</td>

											<td>
												<ButtonGroup>
													<Button size="sm" variant="info">
														Detil
													</Button>
													<Button size="sm" variant="danger" onClick={e => handleDeleteKos(e, el.id)}>
														Hapus
													</Button>
												</ButtonGroup>
											</td>
										</tr>
									)
								}) :
								<tr>
									<td colSpan={6} className="text-center">Ambil data gagal</td>
								</tr>

					}
				</tbody>
			</Table>
		</>
	)
}

export default KosDisetujui;