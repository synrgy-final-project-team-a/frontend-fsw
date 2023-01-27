import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/navbar";
import NumberProgress from "../../components/numberProgress";
import PencariRoutes from "../../routes/pencari";

export default function PengajuanSewa1() {
  const navigate = useNavigate();
  function handleSubmitSewa(e) {
    navigate("/pengajuan-sewa/2");
  }
  return (
    <>
      <NavbarComponent routes={PencariRoutes} />
      <Container className="">
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
        <div>
          <NumberProgress current={2} total={4} />
        </div>
        <div>
          <h2 className="text-center my-2">Pegajuan Sewa Kos</h2>
        </div>
        <div className="row my-5 justify-content-center">
          <div className="col-xs-10 col-sm-4 offset-md-1 ">
            <img className="mb-3 img-fluid" src="/image5.png" alt=""></img>
            <h2>Kos H.Turiman Banaran</h2>
            <h5>Tipe A</h5>
            <p>Jl. Banaran No.117, Banaran Sekarang Gunung Pati Semarang </p>
          </div>
          <div className="col-12 col-sm-2 rightborder"></div>
          <div className="col-xs-10 col-sm-5 ">
            <div className="my-2">
              <h4>Informasi Penyewa</h4>
              <h5>Nama Penyewa </h5>
              <p>Dion Kurniawan</p>
            </div>
            <div className="my-2">
              <h5>Jenis Kelamin </h5>
              <p>Laki-laki </p>
            </div>
            <div className="my-2">
              <h5>Status </h5>
              <p>Mahasiswa </p>
            </div>
            <div className="my-2">
              <h5>Nomor Handphone </h5>
              <p>082148372834 </p>
            </div>
            <div className="my-2">
              <h5>Pembayaran </h5>
            </div>
            <div className="mb-2">
              <h5>Tanggal mulai kos </h5>
              <p> 23 Februari 2023</p>
            </div>
            <div className="mb-2">
              <h5>Durasi sewa kos </h5>
              <p>1 Bulan </p>
            </div>
            <div className="mb-2">
              <h5>Harga per bulan </h5>
              <p>Rp. 1.350.000 </p>
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <h4>Total Harga Sewa Kos</h4>
                <h4>Rp.1.350.000</h4>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmitSewa(e)}
              >
                Ajukan Sewa Kos Sekarang
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
