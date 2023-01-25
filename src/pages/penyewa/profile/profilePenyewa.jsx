import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faChevronRight, faPlusCircle);
import PenyewaRoutes from "../../../routes/penyewa";
import NavbarComponent from "../../../components/navbar";
import Banner from "../../../components/banner";
import Rating from "../../../components/ratingStar";

export default function profilePenyewa() {
  return (
    <div>
      <NavbarComponent routes={PenyewaRoutes} />
      <Container className="mt-5">
        <Banner />
        <Row className="mt-5">
          <h5 className="fw-bold">Fitur Premium</h5>
        </Row>
        <Row className="mt-3">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary text-start p-3 fw-bold"
            >
              <small className="d-flex justify-content-between">
                <Link to="/" className="text-light text-decoration-none">
                  Tingkatkan jumlah pengunjung kosan anda melalui fitur premium
                  dari kami
                </Link>
                <span>
                  <FontAwesomeIcon icon={faChevronRight} rotate={90} />
                </span>
              </small>
            </button>
          </div>
        </Row>
        <Row className="mt-3">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary text-start p-3 fw-bold"
            >
              <small className="d-flex justify-content-between">
                <Link to="/" className="text-light text-decoration-none">
                  Dapatkan badge "premium" sekarang juga!
                </Link>
                <span>
                  <FontAwesomeIcon icon={faChevronRight} rotate={90} />
                </span>
              </small>
            </button>
          </div>
        </Row>
        <Row className="mt-3">
          <h5 className="fw-bold">Penilaian Kos</h5>
          <p>
            <small>
              Kosan yang telah dinilai oleh pencari kos dapat dilihat di bawah
            </small>
          </p>
          <Col xs={12} lg={2}>
            <img src="/pencari.png" alt="" className="img-fluid" />
          </Col>
          <Col xs={12} lg={3} className="col align-self-center mt-3">
            <h6 className="fw-bold">Kos Graha Mulia Banaran</h6>
            <h6 className="fw-bold">Sekaran Semarang</h6>
            <div className="d-flex ps-2">
              <h6 className="fw-bold pe-2">4.0</h6>
              <Rating />
              <p className="ps-2">
                <small>(9 Reviews)</small>
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 mb-5">
          <h5 className="fw-bold">Kelola Kosmu</h5>
          <div>
            <div className="btn-group me-1 col col-6">
              <button
                type="button"
                className="btn btn-primary text-start p-2 fw-bold"
              >
                <small className="d-flex justify-content-between">
                  <Link to="/" className="text-light text-decoration-none">
                    Tambahkan Kos Anda
                  </Link>
                  <span>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      size="lg"
                      color="white"
                    />
                  </span>
                </small>
              </button>
            </div>
            <div className="btn-group col col-5">
              <button
                type="button"
                className="btn btn-primary text-start p-2 fw-bold"
              >
                <small className="d-flex justify-content-between">
                  <Link to="/" className="text-light text-decoration-none">
                    Butuh Bantuan
                  </Link>
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} rotate={90} />
                  </span>
                </small>
              </button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
