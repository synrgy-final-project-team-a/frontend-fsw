import React, { useEffect, useState } from "react";
import { Button, Container, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddBuktiByPencariMutation } from "../../../store/apis/transaksi";
import { addBooking } from "../../../store/slices/transaksiSlice";

const imgAllow = [
  "image/png",
  "image/jpg",
  "image/jpeg",
]

const Pembayaran = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [selectedProfile, setSelectedProfile] = useState()
  const [previewProfile, setPreviewProfile] = useState()

  const transaksi = useSelector(state => state.transaksi.transaction_id)

  const [
    uploadHit,
    { isSuccess, isError, isLoading, error }
  ] = useAddBuktiByPencariMutation()

  const handleKirimBukti = (e) => {
    e.preventDefault()

    const confirm = window.confirm("Apakah anda yakin?")

    if (!confirm) {
      return
    }

    const formdata = new FormData()

    formdata.append("file", selectedProfile)

    uploadHit({ body: formdata, transactionId: transaksi })
  }

  const changeProfileHandler = (e) => {
    e.preventDefault()
    let failed = false

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedProfile(undefined)
      return
    }

    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true
    }

    if (failed) {
      return
    }

    setSelectedProfile(e.target.files[0])
  }

  const resetProfilehandler = (e) => {
    e.preventDefault()
    setSelectedProfile(undefined)
    setPreviewProfile(undefined)
  }

  useEffect(() => {
    if (isSuccess) {
      const initialState = {
        status: "REVIEWED"
      }

      dispatch(addBooking(initialState))
      navigate('/pengajuan-sewa/2')
    }

    if (isError) {
      alert("gagal")
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    if (!selectedProfile) {
      setPreviewProfile(undefined)
      return
    }

    let objectUrl = URL.createObjectURL(selectedProfile)
    setPreviewProfile(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProfile])

  return (
    <>
      <Container>
        <div>
          <h2 className="text-center my-2">Pembayaran</h2>
          <h4 className="text-center my-2">
            Pengajuanmu diterima oleh pemilik kos
          </h4>
          <div className="row my-5 justify-content-center">
            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <h5>No Invoice</h5>
                <h5 className="fw-semibold">28242874/2023/02/2422</h5>
              </div>
              <div>
                <h5>Silahkan bayar melalui </h5>
                <div className="d-flex justify-content-between">
                  <h5 className="fw-semibold">Transfer Rekening BCA </h5>
                  <img src="/image25.png" alt=""></img>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="mb-0">Nomor Rekening Pemilik Kos </p>
                    <p className="fw-semibold mb-0">8077772349823792312</p>
                    <p className="mb-0">a/n. Sri Boga Sari </p>
                  </div>
                  <Button variant="link">
                    Salin{" "}
                    <span>
                      <img src="/document-copy.png" alt=""></img>
                    </span>
                  </Button>
                </div>
                <p className="mb-0">Total Pembayaran</p>
                <div className="d-flex justify-content-between mb-3">
                  <p className="fw-semibold">Rp. 1.360.000</p>
                  <Button variant="link">
                    Salin{" "}
                    <span>
                      <img src="/document-copy.png" alt=""></img>
                    </span>
                  </Button>
                </div>
                <h5>Cara pembayaran</h5>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Internet Banking BCA</Accordion.Header>
                    <Accordion.Body>
                      <ol>
                        <li>
                          Login pada alamat Internet Banking BCA (https://
                          klikbca.com)
                        </li>
                        <li>
                          Pilih menu Pembayaran Tagihan {">"} Pembayaran {">"}
                          Transfer ke rekening BCA
                        </li>
                        <li>
                          Pada kolom kode bayar, masukkan nomor rekening yang
                          tertera diatas
                        </li>
                        <li>
                          Di halaman konfirmasi, pastikan detil pembayaran sudah
                          sesuai seperti Nomor Rekening BCA, Nama Pemilik dan
                          Jumlah Pembayaran
                        </li>
                        <li>Masukkan password dan mToken</li>
                        <li>
                          Cetak/simpan struk pembayaran Transfer BCA sebagai
                          bukti pembayaran
                        </li>
                      </ol>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>ATM BCA</Accordion.Header>
                    <Accordion.Body>
                      <ol>
                        <li>Masukkan Kartu ATM BCA & PIN</li>
                        <li>
                          Pilih menu Pembayaran Tagihan {">"} Pembayaran {">"}{" "}
                          BCA Virtual Account
                        </li>
                        <li>
                          Pilih menu Transaksi Lainnya {">"} Transfer {">"} ke
                          Rekening sesama BCA
                        </li>
                        <li>
                          Masukkan nomor Virtual Account yang tertera diatas
                        </li>
                        <li>
                          {" "}
                          Di halaman konfirmasi, pastikan detil pembayaran sudah
                          sesuai seperti No Rekening, Nama, Perus/Produk dan
                          Total Tagihan
                        </li>
                        <li>
                          Masukkan Jumlah Transfer sesuai dengan Total Tagihan
                        </li>
                        <li> Ikuti instruksi untuk menyelesaikan transaksi</li>
                        <li>Simpan struk transaksi sebagai bukti pembayaran</li>
                      </ol>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="my-3">
                  <label htmlFor="formInputFoto" className="btn btn-outline-primary mx-2">
                    <div className="d-flex justify-content-center align-items-center">
                      <span>
                        <img src="/document-upload.png" alt=""></img>
                      </span>
                      <p className="fw-bold mb-0 ms-1">Upload Bukti Pembayaran</p>
                    </div>
                  </label>
                  {
                    selectedProfile ?
                      <label htmlFor="formInputFoto" className="btn btn-outline-warning mx-2" onClick={resetProfilehandler}>
                        <div className="d-flex justify-content-center align-items-center">
                          <p className="fw-bold mb-0 ms-1">Ulang</p>
                        </div>
                      </label> :
                      ""
                  }
                  <input type="file" hidden id="formInputFoto" onChange={changeProfileHandler} />
                </div>
                <div>
                  {
                    selectedProfile ?
                      <img src={previewProfile} style={{ width: "250px" }} alt="..." /> : ""
                  }
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 offsed-lg-1">
              <div className="card p-2">
                <div
                  className="my-1"
                  style={{ borderBottom: "1px solid #ACCED0" }}
                >
                  <h5>Infromasi Pembayaran</h5>
                  <div className="d-flex align-items-center  py-2">
                    <img
                      src="/house.png"
                      className="img-fluid"
                      alt=""
                      style={{ width: "48px", height: "40px" }}
                    ></img>
                    <div>
                      <p className="mb-0">Kos H.Turiman Banaran </p>
                      <p className="mb-0">Tipe A </p>
                      <p className="mb-0" style={{ fontSize: "12px" }}>
                        Jl. Banaran No.117, Banaran Sekarang Gunung Pati
                        Semarang{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="my-1"
                  style={{ borderBottom: "1px solid #ACCED0" }}
                >
                  <p className="fw-bold">Detail Infromasi </p>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      ID Booking{" "}
                    </p>
                    <p className="fw-semibold mb-0">KOSAN32534543</p>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Nama Penyewa{" "}
                    </p>
                    <p className="fw-semibold mb-0">Dion Kurniawan</p>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Tanggal Mulai Sewa{" "}
                    </p>
                    <p className="fw-semibold mb-0">Kamis, 23 Februari 2023</p>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Tanggal Selesai Sewa{" "}
                    </p>
                    <p className="fw-semibold mb-0">Kamis, 23 Maret 2023 </p>
                  </div>
                  <div className="d-flex justify-content-between mb-1 pb-2">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Durasi Sewa
                    </p>
                    <p className="fw-semibold mb-0"> 1 bulan</p>
                  </div>
                </div>
                <div className="my-1">
                  <p className="fw-bold">Total Transaksi </p>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Bank Tujuan{" "}
                    </p>
                    <p className=" mb-0">BCA</p>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Pembayaran DP{" "}
                    </p>
                    <p className=" mb-0">Rp. 0</p>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Biaya Sewa
                    </p>
                    <p className=" mb-0">Rp. 1.350.000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Biaya Layanan
                    </p>
                    <p className=" mb-0">Rp. 10.000 </p>
                  </div>
                  <div className="d-flex justify-content-between mb-1 pb-2">
                    <p style={{ fontSize: "14px" }} className="mb-0">
                      Total Pembayaran
                    </p>
                    <p className="fw-bolder mb-0"> Rp.1.360.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 text-center">
            <Button
              onClick={handleKirimBukti}
              variant="outline-primary "
              type="submit"
              className="mb-5"
            >
              <div className="d-flex justify-content-center align-items-center">
                <span>
                  <img src="/send-2.png" alt=""></img>
                </span>
                <p className="fw-bold mb-0 ms-1">Kirim Bukti Pembayaran</p>
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}


export default Pembayaran