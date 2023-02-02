import React from "react";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCalendarCheck, faClock, faChevronDown);

const CardKelolaKosPencari = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isCardVisible, setIsCardVisible] = useState(false);
  return (
    <>
      <Row className="mx-md-5 row align-items-center mb-3">
        <Col xs={12} lg={4}>
          <img src="/pencari.png" alt="" className="img-fluid" />
        </Col>
        <Col
          xs={12}
          lg={8}
          className="border rounded col align-self-center my-3 py-3"
        >
          <h5>Kos H. Turiman Banaran</h5>
          <p className="m-0">
            <small>
              Jl. Banaran No.117 Banaran Sekaran Gunung Pati Semarang Jawa
              Tengah
            </small>
          </p>
          <p className="my-2 fw-bold">
            <small>Tipe A</small>
          </p>
          <Row>
            <Col>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
                <div className="mx-3">
                  <p className="m-0">
                    <small>Tanggal masuk</small>
                  </p>
                  <p className="m-0">
                    <small>25 Januari</small>
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faClock} size="2x" />
                <div className="mx-3">
                  <p className="m-0">
                    <small>Durasi Sewa</small>
                  </p>
                  <p className="m-0">
                    <small>1 bulan</small>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <div className="d-flex justify-content-between">
            <p className="fw-bold align-self-center m-0">Rp. 1.350.000/bulan</p>
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
      </Row>

      <div style={{ display: isCardVisible ? "block" : "none" }}>
        <Row className="mx-md-5 row align-items-center">
          <Col xs={12} lg={4}></Col>
          <Col
            xs={12}
            lg={8}
            className="border rounded col align-self-center my-3 py-3"
          >
            <h6 className="fw-bold mb-3">Data Penghuni Kosan</h6>
            <div className="d-flex justify-content-between">
              <p>Nama</p>
              <p>Dion Kurniawan</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="m-0">No Handphone</p>
              <p className="m-0">082112121212</p>
            </div>
          </Col>
        </Row>
        <Row className="mx-md-5 row align-items-center">
          <Col xs={12} lg={4}></Col>
          <Col
            xs={12}
            lg={8}
            className="border rounded col align-self-center my-3 py-3"
          >
            <h6 className="fw-bold mb-3">Informasi Sewa Kosan</h6>
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
                <small>Tanggal Sewa</small>
              </p>
              <p>
                <small>Kamis, 23 Februari 2023</small>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <small>Tanggal Selesai</small>
              </p>
              <p>
                <small>Kamis, 23 Maret 2023</small>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <small>Lama Sewa</small>
              </p>
              <p>
                <small>1 Bulan</small>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <small>Durasi Sewa</small>
              </p>
              <p>
                <small>Bulanan</small>
              </p>
            </div>
          </Col>
          <div className="d-flex justify-content-between p-0">
            <p className="fw-bold align-self-center m-0"></p>
            <Button variant="primary" size="sm" className="mb-3">
              Perpanjang Sewa Lagi
            </Button>
          </div>
        </Row>
      </div>
    </>
  );
}

export default CardKelolaKosPencari