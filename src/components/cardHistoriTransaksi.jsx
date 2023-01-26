import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faHouse,
  faWallet
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faChevronDown, faHouse, faWallet);
import { useState } from "react";

export default function cardHistoriTransaksi() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isCardVisible, setIsCardVisible] = useState(false);
  return (
    <div>
      <div>
        <Row className="border rounded mx-md-5 row align-items-center">
          <Col xs={12} lg={12} className="col align-self-center p-3">
            <h6 className="fw-bold mb-3">Pembayaran</h6>
            <p className="m-1">
              <small>ID Booking KOSAN32534543</small>
            </p>
            <Row className="row align-items-center">
              <Col xs={12} lg={8}>
                <div className="d-flex my-2">
                  <FontAwesomeIcon icon={faHouse} size="2x" className="mt-2"/>
                  <div className="mx-3">
                    <p className="m-0 fw-bold">
                      <small>Kos H.Turiman Banaran</small>
                    </p>
                    <p className="m-0">
                      <small>
                        Jl. Banaran No.117 Banaran Sekaran Gunung Pati Semarang
                        Jawa Tengah
                      </small>
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={4}>
                <div className="d-flex my-2">
                  <FontAwesomeIcon icon={faWallet} size="2x" className="mt-2"/>
                  <div className="mx-3">
                    <p className="m-0">
                      <small>Total Pembayaran</small>
                    </p>
                    <p className="m-0">
                      <small>Rp. 1.360.000</small>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-3">
              <p className="fw-bold align-self-center m-0"></p>
              {isButtonVisible ? (
                <Button
                  variant="primary"
                  size="sm"
                  className="m-1"
                  onClick={() => {
                    setIsButtonVisible(false);
                    setIsCardVisible(!isCardVisible);
                  }}
                >
                  Selengkapnya
                  <FontAwesomeIcon icon={faChevronDown} className="mx-2" />
                </Button>
              ) : null}
            </div>
          </Col>
          <div style={{ display: isCardVisible ? "block" : "none" }}>
            <hr></hr>
            <Row className="row align-items-center">
              <Col
                xs={12}
                lg={12}
                className="col align-self-center my-3 py-3"
              >
                <h6 className="fw-bold mb-3">Detail Pembayaran</h6>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>ID Booking</small>
                  </p>
                  <p>
                    <small>KOSAN32534543</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Tanggal Pembayaran</small>
                  </p>
                  <p>
                    <small>Kamis, 23 Februari 2023</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Waktu Pembayaran</small>
                  </p>
                  <p>
                    <small>13:45 WIB</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Metode Pembayaran</small>
                  </p>
                  <p>
                    <small>Transfer</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Durasi Sewa</small>
                  </p>
                  <p>
                    <small>1 Bulan</small>
                  </p>
                </div>
              </Col>
              <Col
                xs={12}
                lg={12}
                className="col align-self-center my-3 py-3"
              >
                <h6 className="fw-bold mb-3">Total Transaksi</h6>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Bank Tujuan</small>
                  </p>
                  <p>
                    <small>BCA</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Pembayaran DP</small>
                  </p>
                  <p>
                    <small>Rp. 0</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Biaya Layanan</small>
                  </p>
                  <p>
                    <small>Rp. 10.000</small>
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <small>Total Pembayaran</small>
                  </p>
                  <p className="fw-bold">
                    <small>Rp. 1.360.000</small>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </div>
  );
}
