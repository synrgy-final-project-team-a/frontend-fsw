import { useEffect, useState } from "react"
import { Table, Button, ButtonGroup, Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useApproveKosMutation, useListKosMutation, useRejectKosMutation } from "../../../store/apis/kos";

const VerifikasiKos = () => {
    const [listKosHit, {isLoading, isSuccess, data}] = useListKosMutation();
	const [rejectKosHit, {isLoading: loadingReject, isSuccess: rejectSuccess, isError: rejectError}] = useRejectKosMutation();
	const [approveKosHit, {isLoading: loadingApprove, isSuccess: approveSuccess, isError: approveError}] = useApproveKosMutation();
	
	const token = useSelector((state) => state.auth.token.access_token);
	const param = {
		page: 0,
		size: 12,
		enabled: false
	}

	const [alert, setAlert] = useState({ "show": false });

	const handleRejectKos = (e, id) => {
		e.preventDefault();
		let confirm = window.confirm("Tolak kos ini?");

		if (confirm) {
			rejectKosHit({token: token, id});
		}
	}

	const handleApproveKos = (e, id) => {
		e.preventDefault();
		let confirm = window.confirm("Setujui kos ini?");

		if (confirm) {
			approveKosHit({token: token, id});
		}
	}
	
	useEffect(() => {
		listKosHit({token: token, page: param.page, size: param.size, enabled: param.enabled})		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (rejectSuccess) {
			setAlert({
				"variant": "success",
				"message": "Kos berhasil ditolak!",
				"show": true
			})
			listKosHit({token: token, page: param.page, size: param.size, enabled: param.enabled})			
		}

		if (rejectError) {
			setAlert({
				"variant": "danger",
				"message": "Gagal tolak kos!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingReject])

	useEffect(() => {
		if (approveSuccess) {
			setAlert({
				"variant": "success",
				"message": "Kos telah disetujui!",
				"show": true
			})
			listKosHit({token: token, page: param.page, size: param.size, enabled: param.enabled})
		}

		if (approveError) {
			setAlert({
				"variant": "danger",
				"message": "Gagal menyetujui kos!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingApprove])

    return (
        <>
            <h3 className="mt-3">Verifikasi Kos</h3>
            {
				alert.show ?
					<Alert className="mt-3" variant={alert.variant} onClose={() => setAlert({ "show": false })} dismissible>
						{alert.message}
					</Alert> :
					<></>
				}
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
								<td colSpan={5} className="text-center">Loading...</td>
							</tr> :
							isSuccess ?
								data.data.content.map((el, i) => {																
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{el.kostName}</td>
											<td>{`${el.profile.firstName} ${el.profile.lastName}`}</td>											
											
											<td>{el.address}</td>
											<td>{el.enabled ?
												"" : <span>Menunggu Persetujuan</span> }</td>
											
											<td>
												<ButtonGroup>
													<Button size="sm" variant="info">
														Detil
													</Button>
													<Button onClick={e => handleApproveKos(e, el.id)} size="sm" variant="primary">
														Setujui
													</Button>
													<Button size="sm" variant="danger" onClick={e => handleRejectKos(e, el.id)}>
														Tolak
													</Button>
												</ButtonGroup>
											</td>
										</tr>
									) 
								}) :
								<tr>
									<td colSpan={5} className="text-center">Ambil data gagal</td>
								</tr>
								
					}
				</tbody>
			</Table>
        </>
    )

}

export default VerifikasiKos;