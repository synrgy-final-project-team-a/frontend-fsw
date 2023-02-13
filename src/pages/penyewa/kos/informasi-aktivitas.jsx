import PembayaranSewa from "../../../components/kos/informasi-aktivitas/pembayaran-sewa-kos";
import PengajuanSewa from "../../../components/kos/informasi-aktivitas/pengajuan-sewa-kos";

const InformasiAktivitas = () => {
    return (
        <div className="mt-3" id="informasi-aktivitas">
            <h3>Informasi Aktivitas</h3>
			<PengajuanSewa />
			<PembayaranSewa />			    
        </div>
    )
}

export default InformasiAktivitas;