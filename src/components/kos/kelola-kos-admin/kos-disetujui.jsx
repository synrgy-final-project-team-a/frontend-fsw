import { useEffect, useState } from "react"
import { Table, Button, ButtonGroup, Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useListKosMutation, useDeleteKosMutation } from "../../../store/apis/kos";

const KosDisetujui = () => {
    const [listKosHit, {isLoading, isSuccess, data}] = useListKosMutation();
    const [deleteKosHit, {isLoading: loadingDelete, isSuccess: deleteSuccess, isError: deleteError}] = useDeleteKosMutation();
    const token = useSelector((state) => state.auth.token.access_token)
    const param = {
		page: 0,
		size: 12,
		enabled: true
	}
    
    const [alert, setAlert] = useState({ "show": false });

    const handleDeleteKos = (e, id) => {
		e.preventDefault();
		let confirm = window.confirm("Hapus Kos ini?");

		if (confirm) {
			deleteKosHit({token: token, id: id});
		}
	}

    useEffect(() => {
		listKosHit({token: token, page: param.page, size: param.size, enabled: param.enabled})		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    useEffect(() => {
		if (deleteSuccess) {
			setAlert({
				"variant": "success",
				"message": "Kos berhasil dihapus!",
				"show": true
			})
			listKosHit({token: token, page: param.page, size: param.size, enabled: param.enabled})
		}

		if (deleteError) {
			setAlert({
				"variant": "danger",
				"message": "Gagal menghapus kos!",
				"show": true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingDelete])

    return (
        <>
            <h3 className="mt-3">Daftar Kos</h3>
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
								data.data.content.map((el, it) => {	
                                    if (el.deletedAt == null) {
                                        return (
                                            <tr key={it}>
                                                <td>{it + 1}</td>
                                                <td>{el.kostName}</td>
                                                <td>{`${el.profile.firstName} ${el.profile.lastName}`}</td>											
                                                
                                                <td>{el.address}</td>
                                                <td>{el.enabled ?
												<span>Disetujui</span> : "" }</td>
                                                
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
                                    }															
									
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

export default KosDisetujui;