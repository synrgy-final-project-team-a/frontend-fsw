import { useEffect } from "react";
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TambahKosIndex from "../../../components/kos/tambah"
import PenyewaLayout from "../../../layouts/penyewa.layout"

const TambahKos = () => {
	const navigate = useNavigate()

	const user = useSelector((state) => state.user.current);

	useEffect(() => {
		if (user.bank_account === undefined ||
			user.bank_account === null ||
			user.bank_account === "") {
			navigate('/penyewa')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<PenyewaLayout>
			<Container className="mt-4">
				<TambahKosIndex />
			</Container>
		</PenyewaLayout>
	)
}

export default TambahKos