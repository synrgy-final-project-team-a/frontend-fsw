import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Alert, Card } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PenyewaLayout from "../../../layouts/penyewa.layout";
import { useTransactionDetailMutation, useApproveTransactionMutation, useConfirmTransactionMutation, useRejectTransactionMutation } from "../../../store/apis/transaction";

import { durationToDurasi, indoDateFormat, rupiahFormat } from "../../../store/utils/format";
import { Link } from "react-router-dom";

const DetailPengajuan = () => {

    const [transactionDetailHit, { isLoading, isSuccess, data }] = useTransactionDetailMutation();
    const [confirmTransactionHit, { isSuccess: confirmSuccess, isLoading: loadingConfirm, isError: confirmError }] = useConfirmTransactionMutation();
    const [approveTransactionHit, { isSuccess: approveSuccess, isLoading: loadingApprove, isError: approveError }] = useApproveTransactionMutation();
    const [rejectTransactionHit, { isSuccess: rejectSuccess, isLoading: loadingReject, isError: rejectError }] = useRejectTransactionMutation();
    const token = useSelector(state => state.auth.token.access_token);
    const params = useParams();
    const bookingId = params.id;

    const [alert, setAlert] = useState({ "show": false });

    const navigate = useNavigate();

    useEffect(() => {
        transactionDetailHit({ token: token, id: bookingId });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleConfirm = (e, id) => {
        e.preventDefault();

        let confirm = window.confirm("Konfirmasi pengajuan kos?");

        if (confirm) {
            confirmTransactionHit({ token: token, id: id });
        }
    }

    const handleApprove = (e, id) => {
        e.preventDefault();

        let confirm = window.confirm("Setujui pengajuan kos?");

        if (confirm) {
            approveTransactionHit({ token: token, id: id });
        }
    }

    const handleReject = (e, id) => {
        e.preventDefault();

        let confirm = window.confirm("Tolak pengajuan kos?");

        if (confirm) {
            rejectTransactionHit({ token: token, id: id });
        }
    }

    useEffect(() => {
        if (confirmSuccess) {
            setAlert({
                "variant": "success",
                "message": "Behasil konfirmasi!",
                "show": true
            })
            transactionDetailHit({ token: token, id: bookingId });
        }

        if (confirmError) {
            setAlert({
                "variant": "danger",
                "message": "Konfirmasi gagal!",
                "show": true
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingConfirm])

    useEffect(() => {
        if (approveSuccess) {
            setAlert({
                "variant": "success",
                "message": "Behasil menyetujui penyewaan kos!",
                "show": true
            })
            transactionDetailHit({ token: token, id: bookingId });
        }

        if (approveError) {
            setAlert({
                "variant": "danger",
                "message": "Gagal menyetujui penyewaan kos!",
                "show": true
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingApprove])

    useEffect(() => {
        if (rejectSuccess) {
            setAlert({
                "variant": "success",
                "message": "Pengajuan sewa kos ditolak!",
                "show": true
            })
            transactionDetailHit({ token: token, id: bookingId });
        }

        if (rejectError) {
            setAlert({
                "variant": "danger",
                "message": "Gagal tolak pengajuan sewa kos!",
                "show": true
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingReject])

    return (
        <>
            <PenyewaLayout>

                {
                    alert.show ?
                        <Alert className="mt-3" variant={alert.variant} onClose={() => setAlert({ "show": false })} dismissible>
                            {alert.message}
                        </Alert> :
                        <></>
                }

                {isLoading ?
                    <Container>
                        <Card className="skeleton" style={{ height: "400px" }}>
                            &nbsp;
                        </Card>
                    </Container> :
                    isSuccess ?
                        data.data.map((el, i) => {
                            return (
                                <Container id="detail-pengajuan" key={i}>
                                    <div className="d-flex" style={{ gap: "27%" }}>
                                        <Button as={Link} to="/penyewa/kos" variant="none" className="semibold-text p-0 mb-4"><img src="/arrow-left.png" className="mb-1 me-2" alt="" />Kembali</Button>
                                        {el.status === "REVIEWED" || el.status === "APPROVED" ?
                                            <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pembayaran Sewa Kos</h1> :
                                            <h1 className="fs-2 fw-bold lh-lg mt-3 mb-5 text-center">Pengajuan Sewa Kos</h1>
                                        }
                                    </div>

                                    <Row className="justify-content-center">
                                        <Col xs={12} lg={3} className="px-0">
                                            <img src={el.front_building_photo} alt="" className="text-end" style={{ maxWidth: "286px" }} />
                                        </Col>

                                        {el.status === "POSTED" ?
                                            <Col xs={12} lg={9} className="invoice-box ps-4">
                                                <div className="mb-2">
                                                    <h5 className="nama-kos mb-1">{el.kost_name}</h5>
                                                    <p className="regular-text mb-1">{el.address}</p>
                                                    <p className="regular-text mb-3">{el.room_name}</p>
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="d-flex pe-3">
                                                                <span><img src="/calendar-tick.png" className="border-right pe-2" alt="" /></span>
                                                                <div className="ps-2">
                                                                    <p className="tanggal-durasi m-0">Tanggal Masuk</p>
                                                                    <p className="tanggal-durasi-sub">{indoDateFormat(el.check_in)}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex">
                                                                <span><img src="/clock.png" className="border-right pe-2" alt="" /></span>
                                                                <div className="ps-2">
                                                                    <p className="tanggal-durasi m-0">Durasi Sewa</p>
                                                                    <p className="tanggal-durasi-sub">{durationToDurasi(el.duration_type)}an</p>


                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="bold-text" style={{ color: "#616161" }}>{rupiahFormat(el.price)} <span className="text-muted">/ {durationToDurasi(el.duration_type)} </span></p>
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
                                                                <td className="text-end bold-text" style={{ paddingLeft: "300px" }}>{el.booking_code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">Tanggal Sewa</td>
                                                                <td className="text-end bold-text">{indoDateFormat(el.check_in)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="regular-text">Tanggal Selesai</td>
                                                                <td className="text-end bold-text">{indoDateFormat(el.check_out)}</td>
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
                                                    <Button className="btn-terima" onClick={e => handleConfirm(e, el.transaction_id)}>Konfirmasi</Button>
                                                    <Button className="btn-tolak me-4" onClick={e => handleReject(e, el.transaction_id)}>Tolak</Button>
                                                </div>

                                            </Col>

                                            :

                                            el.status === "CONFIRMED" ?
                                                <Col xs={12} lg={9} className="invoice-box ps-4">
                                                    <div className="mb-2">
                                                        <h5 className="nama-kos mb-1">{el.kost_name}</h5>
                                                        <p className="regular-text mb-1">{el.address}</p>
                                                        <p className="regular-text mb-3">{el.room_name}</p>
                                                        <div className="d-flex">
                                                            <div>
                                                                <div className="d-flex pe-3">
                                                                    <span><img src="/calendar-tick.png" className="border-right pe-2" alt="" /></span>
                                                                    <div className="ps-2">
                                                                        <p className="tanggal-durasi m-0">Tanggal Masuk</p>
                                                                        <p className="tanggal-durasi-sub">{indoDateFormat(el.check_in)}</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="d-flex">
                                                                    <span><img src="/clock.png" className="border-right pe-2" alt="" /></span>
                                                                    <div className="ps-2">
                                                                        <p className="tanggal-durasi m-0">Durasi Sewa</p>
                                                                        <p className="tanggal-durasi-sub">{durationToDurasi(el.duration_type)}an</p>


                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="bold-text" style={{ color: "#616161" }}>{rupiahFormat(el.price)} <span className="text-muted">/ {durationToDurasi(el.duration_type)} </span></p>
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
                                                                    <td className="text-end bold-text" style={{ paddingLeft: "300px" }}>{el.booking_code}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="regular-text">Tanggal Sewa</td>
                                                                    <td className="text-end bold-text">{indoDateFormat(el.check_in)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="regular-text">Tanggal Selesai</td>
                                                                    <td className="text-end bold-text">{indoDateFormat(el.check_out)}</td>
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
                                                </Col>

                                                :

                                                el.status === "REJECTED" ?
                                                    navigate("/penyewa/kos")

                                                    :

                                                    <Col xs={12} lg={9} className="invoice-box-2 p-3 ms-3">
                                                        <div className="mb-2">
                                                            <div className="d-flex" style={{ gap: "364px" }}>
                                                                <h5 className="semibold-text mb-1">Pembayaran</h5>
                                                                <Button className="btn-bukti-bayar"><img src="/document-download.png" className="mb-1 me-2" alt="" /><a href={el.proof_of_payment} className="text-decoration-none">Unduh Bukti Pembayaran</a></Button>
                                                            </div>


                                                            <p className="regular-text my-2">ID Booking {el.booking_code}</p>
                                                            <div className="d-flex" style={{ gap: "364px" }}>
                                                                <div>
                                                                    <div className="d-flex">
                                                                        <span className="py-2"><img src="/house-filled.png" className="border-right pe-1" alt="" /></span>
                                                                        <div className="ps-2 pe-1">
                                                                            <p className="bold-text m-0">{el.kost_name}</p>
                                                                            <p className="small-text mb-0">{el.address}</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="d-flex">
                                                                        <span className="py-2"><img src="/empty-wallet-tick.png" className="border-right pe-1" alt="" /></span>
                                                                        <div className="ps-2">
                                                                            <p className="total-pembayaran m-0">Total Pembayaran</p>
                                                                            <p className="total-pembayaran-sub mb-0">{rupiahFormat(el.price)}</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="mb-2">
                                                            <p className="bold-text" style={{ color: "#616161" }}>Data Penghuni Kos</p>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="regular-text">Nama</td>
                                                                        <td className="text-end bold-text" >{el.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">No. Handphone</td>
                                                                        <td className="text-end bold-text" style={{ paddingLeft: "466px" }}>{el.phone_number}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Tanggal Mulai Sewa</td>
                                                                        <td className="text-end bold-text">{indoDateFormat(el.check_in)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Tanggal Selesai Sewa</td>
                                                                        <td className="text-end bold-text">{indoDateFormat(el.check_out)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <hr />
                                                        <div>
                                                            <p className="bold-text" style={{ color: "#616161" }}>Detail Pembayaran</p>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="regular-text">ID Booking</td>
                                                                        <td className="text-end bold-text" style={{ paddingLeft: "463px" }}>{el.booking_code}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Tanggal Pembayaran</td>
                                                                        <td className="text-end bold-text">{el.date_payment}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Metode Pembayaran</td>
                                                                        <td className="text-end bold-text">{el.payment_method}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Durasi Sewa</td>
                                                                        <td className="text-end bold-text">{durationToDurasi(el.duration_type)}an</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                        <hr />
                                                        <div>
                                                            <p className="bold-text" style={{ color: "#616161" }}>Total Transaksi</p>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="regular-text">Bank Tujuan</td>
                                                                        <td className="text-end bold-text" style={{ paddingLeft: "567px" }}>{el.bank_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Pembayaran DP</td>
                                                                        <td className="text-end bold-text">Rp. 0</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="regular-text">Total Pembayaran</td>
                                                                        <td className="text-end bold-text">{rupiahFormat(el.price)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                        {el.status === "REVIEWED" ?
                                                            <div className="d-flex flex-row-reverse mt-3">
                                                                <Button className="btn-terima" onClick={e => handleApprove(e, el.transaction_id)}>Terima Pembayaran</Button>
                                                                <Button className="btn-tolak me-4" onClick={e => handleReject(e, el.transaction_id)}>Tolak</Button>
                                                            </div> : ""
                                                        }

                                                    </Col>

                                        }






                                    </Row>
                                </Container>
                            )

                        })
                        : ""
                }

            </PenyewaLayout>

        </>

    )
}

export default DetailPengajuan;