import { Container } from "react-bootstrap"
import PengajuanSewaIndex from "../../components/pengajuanSewa/tambah"
import PencariLayout from "../../layouts/pencari.layout"

const PengajuanSewa = () => {
	return (
		<PencariLayout>
			<Container className="mt-4">
				<PengajuanSewaIndex />
			</Container>
		</PencariLayout>
	)
}

export default PengajuanSewa