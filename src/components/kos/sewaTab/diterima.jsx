import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Diterima() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="d-flex flex-column justify-content-center text-center">
          <h2>Tempati Kosanmu </h2>
          <h4 className="text-center m-auto" style={{ maxWidth: "820px" }}>
            Yeeay, Pembayaranmu diterima, silahkan hubung pemilik kos untuk
            mengkonfirmasi kedatanganmu{" "}
          </h4>
          <img
            src="/image10.png"
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
    </>
  );
}
