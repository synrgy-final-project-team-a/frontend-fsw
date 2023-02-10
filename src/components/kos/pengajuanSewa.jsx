import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";
import PengajuanSewaKos from "./sewaTab/pengajuanSewaKos"
import KonfirmasiPemilik from "./sewaTab/konfirmasiPemilik";
import Pembayaran from "./sewaTab/pembayaran";
import Diterima from "./sewaTab/diterima";

const PengajuanSewaIndex = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [key, setKey] = useState('1');

	useEffect(() => {
		if (params.id === undefined) {
			setKey('1')
		} else {
			setKey(params.id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div id="tambah-kos">
			<Tabs
				activeKey={key}
				onSelect={(k) => navigate('/pengajuan-sewa/' + k)}
				className="mb-3"
				transition={false}
				justify
			>
				<Tab eventKey="1" title="1" disabled>
					<PengajuanSewaKos />
				</Tab>
				<Tab eventKey="2" title="2" disabled>
					<KonfirmasiPemilik />
				</Tab>
				<Tab eventKey="3" title="3" disabled>
					<Pembayaran />
				</Tab>
				<Tab eventKey="4" title="4" disabled>
					<Diterima />
				</Tab>
			</Tabs>
		</div>
	)
}

export default PengajuanSewaIndex