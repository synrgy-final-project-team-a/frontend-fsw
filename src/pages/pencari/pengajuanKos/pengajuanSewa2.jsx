import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../../../components/footer";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import NumberProgress from "../../../components/numberProgress";
export default function PengajuanSewa2() {
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
            <h6 className="ms-2 my-auto">Kembali</h6>
          </div>
        </Button>
        <div>
          <NumberProgress current={2} total={4} />
        </div>
        <div className="d-flex flex-column justify-content-center text-center">
          <h2>Konfirmasi Pemiliki Kos </h2>
          <h4>Silahkan tunggu konfirmasi dari pemilik kos 1x24 jam </h4>
          <img
            src="/image16.png"
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
