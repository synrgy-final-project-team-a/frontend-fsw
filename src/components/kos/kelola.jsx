import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { emptyKos } from "../../store/slices/kosSlice"
import ListKos from "./lists"
import InformasiAktivitas from "../../pages/penyewa/kos/informasi-aktivitas"

const KelolaKos = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const tambahHandler = () => {
		dispatch(emptyKos())
		navigate('/penyewa/kos/tambah')
	}

	return (
		<div id="kelola-kos">
			<h3 className="mt-3">Kelola Kos</h3>
			<Button variant="primary" className="mt-3" onClick={tambahHandler}>Tambah Kos Baru</Button>
			<ListKos />
			<InformasiAktivitas />
		</div>
	)

}

export default KelolaKos