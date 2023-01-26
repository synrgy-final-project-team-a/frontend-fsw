import { Container } from "react-bootstrap"
import TambahKosIndex from "../../../components/kos/tambah"
import PenyewaLayout from "../../../layouts/penyewa.layout"

const TambahKos = () => {
	return (
		<PenyewaLayout>
			<Container className="mt-4">
				<TambahKosIndex />
			</Container>
		</PenyewaLayout>
	)
}

export default TambahKos