import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap"
import DataAlamatKos from "./tambah/dataAlamatKos";
import DataFasilitasKos from "./tambah/dataFasilitasKos";
import DataKos from "./tambah/dataKos";
import DataPeraturanKos from "./tambah/dataPeraturanKos";

const TambahKosIndex = () => {
	const [key, setKey] = useState('1');

	return (
		<div id="tambah-kos">
			<Tabs
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className="mb-3"
				transition={false}
				justify
			>
				<Tab eventKey="1" title="1" disabled>
					<DataKos setKeynya={setKey} />
				</Tab>
				<Tab eventKey="2" title="2" disabled>
					<DataAlamatKos setKeynya={setKey} />
				</Tab>
				<Tab eventKey="3" title="3" disabled>
					<DataPeraturanKos setKeynya={setKey} />
				</Tab>
				<Tab eventKey="4" title="4" disabled>
					<DataFasilitasKos setKeynya={setKey} />
				</Tab>
				<Tab eventKey="5" title="5" disabled>
					Haihai
				</Tab>
				<Tab eventKey="6" title="6" disabled>
					Hai Profile
				</Tab>
				<Tab eventKey="7" title="7" disabled>
					Hai Longer
				</Tab>
			</Tabs>
		</div>
	)
}

export default TambahKosIndex