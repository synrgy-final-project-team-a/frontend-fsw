import React from "react";
import { Button, Container } from "react-bootstrap";

export default function KonfirmasiPemilik() {
  return (
    <Container>
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
  );
}
