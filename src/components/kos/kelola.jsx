import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ListKos from "./lists"
import VerifikasiPembayaran from "./verifikasi-pembayaran"

const KelolaKos = () => {
	const navigate = useNavigate()

	const tambahHandler = () => {
		navigate('/penyewa/kos/tambah')
	}

	return (
		<div id="kelola-kos">
			<h3 className="mt-3">Kelola Kos</h3>
			<div>
				<Button variant="primary" className="mt-3" onClick={tambahHandler}>Tambah Kos Baru</Button>
			</div>
			<ListKos />
			<hr />
			<VerifikasiPembayaran />
		</div>
	)

}

export default KelolaKos