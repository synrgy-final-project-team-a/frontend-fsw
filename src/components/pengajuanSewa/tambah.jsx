import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";

const PengajuanSewaIndex = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [key, setKey] = useState('1');

	useEffect(() => {
		if(params.id === undefined) {
			setKey('1')
		} else {
			setKey(params.id)
		}
	}, [params.id])

	return (
		<div id="tambah-kos">
			<Tabs
				activeKey={key}
				onSelect={(k) => navigate('/pengajuan-sewa/'+k)}
				className="mb-3"
				transition={false}
				justify
			>
				<Tab eventKey="1" title="1">
					tab 1
				</Tab>
				<Tab eventKey="2" title="2">
					tab 2
				</Tab>
				<Tab eventKey="3" title="3">
					tab 3
				</Tab>
				<Tab eventKey="4" title="4">
					tab 4
				</Tab>
			</Tabs>
		</div>
	)
}

export default PengajuanSewaIndex