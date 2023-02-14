import { Container } from "react-bootstrap"
import AdminLayout from "../../layouts/admin.layout";
import VerifikasiKos from "../../components/kos/kelola-kos-admin/verifikasiKos";
import KosDisetujui from "../../components/kos/kelola-kos-admin/kos-disetujui";

const KelolaKos = () => {

	return (
		<AdminLayout>
			<Container>
				<h1 className="mt-3">Kelola Kos</h1>
				<VerifikasiKos />
				<KosDisetujui />
			</Container>
		</AdminLayout>
	)
}

export default KelolaKos;