import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import ListKos from "./lists"

const KelolaKos = () => {
	return (
		<div id="kelola-kos">
			<h3 className="mt-3">Kelola Kos</h3>
			<Button variant="primary" as={Link} className="mt-3" to="/penyewa/kos/tambah">Tambah Kos Baru</Button>
			<ListKos />
		</div>
	)

}

export default KelolaKos