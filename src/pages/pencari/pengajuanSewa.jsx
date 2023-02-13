import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import PengajuanSewaIndex from "../../components/kos/pengajuanSewa"
import PencariLayout from "../../layouts/pencari.layout"
import { useNavigate } from "react-router-dom"

const PengajuanSewa = () => {
	const navigate = useNavigate()
	const token = useSelector(state => state.auth.token)

	useEffect(() => {
		if (Object.keys(token).length === 0) {
			navigate('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<PencariLayout>
			<Container className="mt-4">
				<PengajuanSewaIndex />
			</Container>
		</PencariLayout>
	)
}

export default PengajuanSewa