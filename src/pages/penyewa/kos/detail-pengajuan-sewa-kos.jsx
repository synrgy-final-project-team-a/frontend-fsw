import { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PenyewaLayout from "../../../layouts/penyewa.layout";
import { useTransactionDetailMutation } from "../../../store/apis/transaction";

import durationToDurasi from "../../../store/utils/format";

const DetailPengajuan = () => {

    const [transactionDetailHit, { isLoading, isSuccess, data }] = useTransactionDetailMutation();
    const token = useSelector(state => state.auth.token.access_token);
    const params = useParams();
    const bookingId = params.id;

    useEffect(() => {
        transactionDetailHit({ token: token, id: bookingId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(transactionDetailHit);
    }, [])

    return (
        <>
            <PenyewaLayout id>
                {/* <Button variant="none" className="semibold-text mt-3"><span><img src="/arrow-left.png" alt="" /></span>Kembali</Button> */}
                {/* { isLoading ? 
                    <h5>Sedang Mengambil Data...</h5> :
                    isSuccess ?
                    data.data.map((el, i) => {
                        return (
                            {el.status === "REVIEWED" || el.status === "APPROVED" ?
                            <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pembayaran Sewa Kos</h1> :
                            <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pengajuan Sewa Kos</h1>}

                            el.status === "POSTED" || el.status === "CONFIRMED" ?
                            
                            
                        )
                    })
                    
                } */}

                {isLoading ?
                    <h5>.................</h5> :
                    isSuccess ?
                        data.data.map((el, i) => {
                            return (
                                <Container id="detail-pengajuan" key={i}>
                                    {el.status === "REVIEWED" || el.status === "APPROVED" ?
                                        <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pembayaran Sewa Kos</h1> :
                                        <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pengajuan Sewa Kos</h1>
                                    }
                                    <Row className="justify-content-center">
                                        <Col xs={12} lg={3} className="px-0">
                                            <img src={el.front_building_photo} alt="" />
                                        </Col>

                                        {el.status === "POSTED" || el.status === "CONFIRMED" ?
                                            <Col xs={12} lg={9} className="invoice-box ps-4">
                                                <div className="mb-2">
                                                    <h5 className="nama-kos mb-1">{el.kost_name}</h5>
                                                    <p className="regular-text mb-1">{el.address}</p>
                                                    <p className="regular-text mb-3">{el.room_name}</p>
                                                    <div className="d-flex flex-columm">
                                                        <div>
                                                            <div className="d-flex flex-columm pe-3">
                                                                <span><img src="/calendar-tick.png" className="border-right pe-2" alt="" /></span>
                                                                <div className="ps-2">
                                                                    <p className="tanggal-durasi m-0">Tanggal Masuk</p>
                                                                    <p className="tanggal-durasi-sub">{el.check_in}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex flex-columm">
                                                                <span><img src="/clock.png" className="border-right pe-2" alt="" /></span>
                                                                <div className="ps-2">
                                                                    <p className="tanggal-durasi m-0">Durasi Sewa</p>                                                                    
                                                                    <p className="tanggal-durasi-sub">{durationToDurasi(el.duration_type)}an</p>
                                                                    
                                                                                                                                      
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="bold-text" style={{ color: "#616161" }}>Rp.{el.price} <span className="text-muted">/ {durationToDurasi(el.duration_type)} </span></p>
                                                </div>
                                                <hr />
                                                <div className="mb-2">
                                                    <p className="bold-text" style={{ color: "#616161" }}>Data Penghuni Kosan</p>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="regular-text">Nama</td>
                                                            <td className="text-end bold-text" style={{ paddingLeft: "300px" }}>{el.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">No. Handphone</td>
                                                                <td className="text-end bold-text">{el.phone_number}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <hr />
                                                <div>
                                                    <p className="bold-text" style={{ color: "#616161" }}>Informasi Sewa Kosan</p>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="regular-text">ID Booking</td>
                                                                <td className="text-end bold-text" style={{ paddingLeft: "300px" }}>{el.booking_id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">Tanggal Sewa</td>
                                                                <td className="text-end bold-text">{el.check_in}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">Tanggal Selesai</td>
                                                                <td className="text-end bold-text">{el.check_out}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">Lama Sewa</td>
                                                                <td className="text-end bold-text">{durationToDurasi(el.duration_type)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">Durasi Sewa</td>
                                                                <td className="text-end bold-text">{durationToDurasi(el.duration_type)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <hr />
                                                <div className="d-flex flex-row-reverse">
                                                    <Button className="btn-terima">Terima</Button>
                                                    <Button className="btn-tolak me-4">Tolak</Button>
                                                </div>
                                            </Col> :""
                                        } 


                                        {/* // <Col xs={12} lg={9} className="invoice-box-2 p-3 ms-3">
                                        //     <div className="mb-2">
                                        //         <div className="d-flex" style={{ gap: "364px" }}>
                                        //             <h5 className="semibold-text mb-1">Pembayaran</h5>
                                        //             <Button className="btn-bukti-bayar"><img src="/document-download.png" className="mb-1 me-2" alt="" />Unduh Bukti Pembayaran</Button>
                                        //         </div>

                                        //         <p className="regular-text mb-1">Jl. Banaran</p>
                                        //         <p className="regular-text mb-3">ID Booking KOSAN32534543</p>
                                        //         <div className="d-flex flex-columm">
                                        //             <div>
                                        //                 <div className="d-flex flex-columm">
                                        //                     <span className="py-2"><img src="/house-filled.png" className="border-right pe-1" alt="" /></span>
                                        //                     <div className="ps-2 pe-1">
                                        //                         <p className="bold-text m-0">Kos H.Turiman Banaran Tipe A</p>
                                        //                         <p className="small-text mb-0">Jl. Banaran No.117, Banaran Sekarang Gunung Pati Semarang</p>
                                        //                     </div>

                                        //                 </div>
                                        //             </div>
                                        //             <div>
                                        //                 <div className="d-flex flex-columm" style={{ paddingLeft: "163px" }}>
                                        //                     <span className="py-2"><img src="/empty-wallet-tick.png" className="border-right pe-1" alt="" /></span>
                                        //                     <div className="ps-2">
                                        //                         <p className="total-pembayaran m-0">Total Pembayaran</p>
                                        //                         <p className="total-pembayaran-sub mb-0">Rp. 1.350.000</p>
                                        //                     </div>

                                        //                 </div>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        //     <hr />
                                        //     <div className="mb-2">
                                        //         <p className="bold-text" style={{ color: "#616161" }}>Data Penghuni Kos</p>
                                        //         <table>
                                        //             <tbody>
                                        //                 <tr>
                                        //                     <td className="regular-text">Nama</td>
                                        //                     <td className="text-end bold-text" style={{ paddingLeft: "458px" }}>Dion Kurniawan</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">No. Handphone</td>
                                        //                     <td className="text-end bold-text">08199999999</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Tanggal Mulai Sewa</td>
                                        //                     <td className="text-end bold-text">Kamis, 23 Februari 2023</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Tanggal Selesai Sewa</td>
                                        //                     <td className="text-end bold-text">Kamis, 23 Maret 2023</td>
                                        //                 </tr>
                                        //             </tbody>
                                        //         </table>
                                        //     </div>
                                        //     <hr />
                                        //     <div>
                                        //         <p className="bold-text" style={{ color: "#616161" }}>Detail Pembayaran</p>
                                        //         <table>
                                        //             <tbody>
                                        //                 <tr>
                                        //                     <td className="regular-text">ID Booking</td>
                                        //                     <td className="text-end bold-text" style={{ paddingLeft: "463px" }}>KOSAN3254738</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Tanggal Pembayaran</td>
                                        //                     <td className="text-end bold-text">Senin, 19 Februari 2023</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Metode Pembayaran</td>
                                        //                     <td className="text-end bold-text">Transfer</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Durasi Sewa</td>
                                        //                     <td className="text-end bold-text">1 Bulan</td>
                                        //                 </tr>
                                        //             </tbody>
                                        //         </table>

                                        //     </div>
                                        //     <hr />
                                        //     <div>
                                        //         <p className="bold-text" style={{ color: "#616161" }}>Total Transaksi</p>
                                        //         <table>
                                        //             <tbody>
                                        //                 <tr>
                                        //                     <td className="regular-text">Bank Tujuan</td>
                                        //                     <td className="text-end bold-text" style={{ paddingLeft: "567px" }}>BCA</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Pembayaran DP</td>
                                        //                     <td className="text-end bold-text">Rp. 0</td>
                                        //                 </tr>
                                        //                 <tr>
                                        //                     <td className="regular-text">Total Pembayaran</td>
                                        //                     <td className="text-end bold-text">Rp.1.350.000</td>
                                        //                 </tr>
                                        //             </tbody>
                                        //         </table>

                                        //     </div>
                                        //     <div className="d-flex flex-row-reverse mt-3">
                                        //         <Button className="btn-terima">Terima</Button>
                                        //         <Button className="btn-tolak me-4">Tolak</Button>
                                        //     </div>
                                        // </Col> */}



                                    </Row>
                                </Container> 
                            ) 

                        })
                        :""
                }

            </PenyewaLayout>

        </>

    )
}

export default DetailPengajuan;