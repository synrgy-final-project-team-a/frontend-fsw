import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";
import PengajuanSewaKos from "./sewaTab/pengajuanSewaKos"
import KonfirmasiPemilik from "./sewaTab/konfirmasiPemilik";
import Pembayaran from "./sewaTab/pembayaran";
import Diterima from "./sewaTab/diterima";
import { useSelector } from "react-redux";

const PengajuanSewaIndex = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [key, setKey] = useState('1');

	const transaksi = useSelector(state => state.transaksi)

	useEffect(() => {
		if (params.id === undefined) {
			if (transaksi.status === "") {
				if (transaksi.check_in === "" || transaksi.check_in === "") {
					navigate('/')
				} else {
					navigate('/pengajuan-sewa/1')
				}
			} else if (transaksi.status === "POSTED") {
				navigate('/pengajuan-sewa/2')
			} else if (transaksi.status === "CONFIRMED") {
				navigate('/pengajuan-sewa/3')
			} else if (transaksi.status === "REVIEWED") {
				navigate('/pengajuan-sewa/4')
			}
		} else {
			if (params.id === "1") {
				if (transaksi.status === "") {
					if (transaksi.check_in === "" || transaksi.check_in === "") {
						navigate('/')
					} else {
						setKey(params.id)
					}
				} else {
					navigate('/pengajuan-sewa')
				}
			} else if (params.id === "2") {
				if (transaksi.status === "POSTED") {
					if (transaksi.check_in === "" || transaksi.check_in === "") {
						navigate('/')
					} else {
						setKey(params.id)
					}
				} else {
					navigate('/pengajuan-sewa')
				}
			} else if (params.id === "3") {
				if (transaksi.status === "CONFIRMED") {
					if (transaksi.check_in === "" || transaksi.check_in === "") {
						navigate('/')
					} else {
						setKey(params.id)
					}
				} else {
					navigate('/pengajuan-sewa')
				}
			} else if (params.id === "4") {
				if (transaksi.status === "REVIEWED") {
					if (transaksi.check_in === "" || transaksi.check_in === "") {
						navigate('/')
					} else {
						setKey(params.id)
					}
				} else {
					navigate('/pengajuan-sewa')
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id])

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