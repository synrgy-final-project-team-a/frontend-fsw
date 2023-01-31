import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../../../components/footer";
import NavbarComponent from "../../../components/navbar";
import NumberProgress from "../../../components/numberProgress";
import PencariRoutes from "../../../routes/pencari";

export default function PengajuanSewa1() {
  const navigate = useNavigate();
  function handleSubmitSewa(e) {
    navigate("/pengajuan-sewa/2");
  }
  return (
    <>
      <NavbarComponent routes={PencariRoutes} />
      <Container className="">
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
          <NumberProgress current={1} total={4} />
        </div>
        <div>
          <h2 className="text-center my-2">Pegajuan Sewa Kos</h2>
        </div>
        <div className="row my-5 justify-content-center">
          <div className="col-xs-10 col-sm-4 offset-md-1 ">
            <img
              className="mb-3 img-fluid center"
              src="/image5.png"
              alt=""
            ></img>
            <h2>Kos H.Turiman Banaran</h2>
            <h5>Tipe A</h5>
            <p>Jl. Banaran No.117, Banaran Sekarang Gunung Pati Semarang </p>
          </div>
          <div className="col-12 col-sm-2 rightborder"></div>
          <div className="col-xs-10 col-sm-5 ">
            <div className="my-2">
              <div className="d-flex justify-content-between mt-1 align-items-center">
                <h4 className="fw-semibold">Informasi Penyewa</h4>
              </div>

              <h5 className="h5">Nama Penyewa </h5>
              <input placeholder="Dion Kurniawan" className="form-control"/>
            </div>
            <div className="my-2">
              <h5 className="h5">Jenis Kelamin </h5>
              <input placeholder="Laki-laki" className="form-control"/>
            </div>
            <div className="my-2">
              <h5 className="h5">Pekerjaan </h5>
              <input placeholder="Mahasiswa" className="form-control"/>
            </div>
            <div className="my-2">
              <h5 className="h5">Nomor Handphone </h5>
              <input placeholder="082148372834" className="form-control"/>
            </div>
            <div className="my-2 bordertop">
              <div className="d-flex justify-content-between mt-1 align-items-center">
                <h5 className="fw-semibold fontcolor mb-0 p-auto">
                  Pembayaran{" "}
                </h5>
                <Button variant="link" className="mb-0 fw-bold">
                  Edit
                </Button>
              </div>
            </div>
            <div className="mb-2">
              <p className="mb-0">Tanggal mulai kos </p>
              <p className="fw-semibold fontcolor"> 23 Februari 2023</p>
            </div>
            <div className="mb-2">
              <p className="mb-0">Durasi sewa kos </p>
              <p className="fw-semibold fontcolor">1 Bulan </p>
            </div>
            <div className="mb-2">
              <p className="mb-0">Harga per bulan </p>
              <p className="fw-semibold fontcolor">Rp. 1.350.000 </p>
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <p className="mb-0 fs-5 fw-bold fontcolor">
                  Total Harga Sewa Kos
                </p>
                <p className="fw-bold fs-5">Rp.1.350.000</p>
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
      <FooterComponent />
    </>
  );
}
