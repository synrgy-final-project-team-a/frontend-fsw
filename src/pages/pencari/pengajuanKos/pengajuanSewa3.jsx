import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import NumberProgress from "../../../components/numberProgress";
import Accordion from "react-bootstrap/Accordion";
import FooterComponent from "../../../components/footer";

export default function PengajuanSewa3() {
  const navigate = useNavigate();
  return (
    <>
      <NavbarComponent routes={PencariRoutes} />
      <Container>
        <Button variant="link" onClick={() => navigate(-1)}>
          <div className="my-3 d-flex align-items-center h-100">
            <span>
              <svg
                width="9"
                height="18"
                viewBox="0 0 9 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.9993 17.67C7.8093 17.67 7.6193 17.6 7.4693 17.45L0.949297 10.93C-0.110703 9.87002 -0.110703 8.13002 0.949297 7.07002L7.4693 0.55002C7.7593 0.26002 8.2393 0.26002 8.5293 0.55002C8.8193 0.84002 8.8193 1.32002 8.5293 1.61002L2.0093 8.13002C1.5293 8.61002 1.5293 9.39002 2.0093 9.87002L8.5293 16.39C8.8193 16.68 8.8193 17.16 8.5293 17.45C8.3793 17.59 8.1893 17.67 7.9993 17.67Z"
                  fill="#757575"
                />
              </svg>
            </span>
            <h6 className="ms-sm-2 my-auto">Kembali</h6>
          </div>
        </Button>
        <div>
          <NumberProgress current={3} total={4} />
        </div>
        {/* Item 1 */}
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
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="my-4"
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <span>
                      <img src="/document-upload.png" alt=""></img>
                    </span>
                    <p className="fw-bold mb-0 ms-1">Upload Bukti Pembayaran</p>
                  </div>
                </Button>
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
              variant="outline-primary "
              type="submit"
              disabled
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

        {/* item2 */}
        <div className="d-flex flex-column justify-content-center text-center">
          <h2 className="text-center my-2">Pembayaran</h2>
          <h4 className="text-center my-2">
            Pengajuanmu diterima oleh pemilik kos
          </h4>
          <img
            src="/image11.png"
            alt=""
            className="img-fluid m-auto image-sewa"
          ></img>
          <Button
            variant="outline-primary"
            type="submit"
            className="w-sm-25 w-xs-50 m-auto mb-5 fw-bold"
          >
            Hubungi Penyewa Kos
          </Button>
        </div>
      </Container>
      <FooterComponent />
    </>
  );
}
