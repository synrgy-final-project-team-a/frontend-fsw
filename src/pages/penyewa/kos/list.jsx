import { Container } from "react-bootstrap"
import KelolaKos from "../../../components/kos/kelola"
import PenyewaLayout from "../../../layouts/penyewa.layout"

const ListKos = () => {
	return (
		<PenyewaLayout>
			<Container className="mt-4">
				<KelolaKos />
			</Container>
		</PenyewaLayout>
	)
}

export default ListKos