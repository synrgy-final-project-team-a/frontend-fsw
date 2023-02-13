import { Col, Container, Row, Button } from "react-bootstrap"
import PenyewaLayout from "../../../layouts/penyewa.layout";

const DetailPengajuan = () => {
    return (
        <>
            <PenyewaLayout>
            <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pengajuan Sewa Kos</h1>
            <Container id="detail-pengajuan">
                <Row className="justify-content-center">
                    <Col xs={12} lg={3}>
                        <img src="/agatha.png" alt="" />
                    </Col>
                    <Col xs={12} lg={9} className="invoice-box">
                        <div className="mb-2">
                            <h5 className="nama-kos mb-1">Kos H.Turiman Banaran</h5>
                            <p className="regular-text mb-1">Jl. Banaran</p>
                            <p className="regular-text mb-3">Tipe A</p>
                            <div className="d-flex flex-columm">
                                <div>
                                    <div className="d-flex flex-columm pe-3">
                                        <span><img src="/calendar-tick.png" className="border-right pe-2" alt="" /></span>
                                        <div className="ps-2">
                                            <p className="tanggal-durasi m-0">Tanggal Masuk</p>
                                            <p className="tanggal-durasi-sub">23 February</p>                                        
                                        </div>                                
                                            
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex flex-columm">
                                        <span><img src="/clock.png" className="border-right pe-2" alt="" /></span>
                                        <div className="ps-2">
                                            <p className="tanggal-durasi m-0">Durasi Sewa</p>
                                            <p className="tanggal-durasi-sub">1 Bulan</p>                                        
                                        </div>                                
                                            
                                    </div>
                                </div>
                            </div>
                            <p className="bold-text" style={{color: "#616161"}}>Rp.1.3500.000 <span className="text-muted">/ bulan</span></p>
                        </div>
                        <hr />
                        <div className="mb-2">
                            <p className="bold-text" style={{color: "#616161"}}>Data Penghuni Kosan</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="regular-text">Nama</td>
                                        <td className="text-end bold-text" style={{paddingLeft: "300px"}}>Dion Kurniawan</td>
                                    </tr>
                                    <tr>
                                        <td className="regular-text">No. Handphone</td>
                                        <td className="text-end bold-text">08199999999</td>
                                    </tr>
                                </tbody>                                
                            </table>                            
                        </div>
                        <hr />
                        <div>
                            <p className="bold-text" style={{color: "#616161"}}>Informasi Sewa Kosan</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="regular-text">ID Booking</td>
                                        <td className="text-end bold-text" style={{paddingLeft: "300px"}}>KOSAN3254738</td>
                                    </tr>
                                    <tr>
                                        <td className="regular-text">Tanggal Sewa</td>
                                        <td className="text-end bold-text">Kamis, 23 Februari 2023</td>
                                    </tr>
                                    <tr>
                                        <td className="regular-text">Tanggal Selesai</td>
                                        <td className="text-end bold-text">Kamis, 23 Maret 2023</td>
                                    </tr>
                                    <tr>
                                        <td className="regular-text">Lama Sewa</td>
                                        <td className="text-end bold-text">1 Bulan</td>
                                    </tr>
                                    <tr>
                                        <td className="regular-text">Durasi Sewa</td>
                                        <td className="text-end bold-text">Bulanan</td>
                                    </tr>
                                </tbody>                            
                            </table>
                            
                        </div>
                        <hr />
                        <div className="d-flex flex-row-reverse">
                            <Button className="btn-terima">Terima</Button>
                            <Button className="btn-tolak me-4">Tolak</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            </PenyewaLayout>
            
        </>

    )
}

export default DetailPengajuan;