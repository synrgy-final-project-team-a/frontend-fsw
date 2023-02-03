import { useRef, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const PreviewKos = ({ setKeynya }) => {
  const kos = useSelector((state) => state.kos);
  // console.log(kos.jenis);

  const formRef = useRef({});
  const [error, setError] = useState({});

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 3;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();

    setError({});
    let failed = false;

    let newKey = 8;
    setKeynya(newKey);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={8}>
            <h1 className="text-center">Preview</h1>
            <h3 className="text-center">
              Silahkan cek terlebih dahulu sebelum menampilkan kos di aplikasi.
            </h3>
            <div>
              <h3 className="fw-bold">Data Kos</h3>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Nama Kos </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.nama} </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Deskripsi </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h5>{kos.deskripsi}</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Tipe Kos </h4>
                </Col>
                <Col xs={6} lg={8}>
                  {Object.values(kos.jenis).map((el, index) => {
                    if (el === true) {
                      return <h4>{Object.keys(kos.jenis)[index]} </h4>;
                    }
                  })}
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Tahun </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.tahun} </h4>
                </Col>
              </Row>
            </div>
            <div>
              <h3 className="fw-bold">Alamat Kos</h3>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Provinsi </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.provinsi} </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Kota </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.kota}</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Alamat </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h5>{kos.alamat}</h5>
                </Col>
              </Row>
            </div>
            <div>
              <h3 className="fw-bold">Peraturan Kos</h3>
              <ul>
                <div className="row row-cols-xs-1 row-cols-lg-2">
                  {Object.values(kos.peraturan).map((el, index) => {
                    if (el === true) {
                      return (
                        <li>
                          <h5>{Object.keys(kos.peraturan)[index]}</h5>
                        </li>
                      );
                    }
                  })}
                </div>
              </ul>
            </div>
            <div>
              <h3 className="fw-bold">Fasilitas Kos </h3>
              <ul>
                <div className="row row-cols-xs-1 row-cols-lg-2">
                  {Object.values(kos.fasilitas).map((el, index) => {
                    if (el === true) {
                      return (
                        <li>
                          <h5>{Object.keys(kos.fasilitas)[index]}</h5>
                        </li>
                      );
                    }
                  })}
                </div>
              </ul>
            </div>
            <div>
              <h3>Gambar Bangunan Kos</h3>
              <Row>
                <Col>
                  <img src="/Frame26086255.png" alt />
                </Col>
                <Col>
                  <img src="/Frame26086255.png" alt />
                </Col>
              </Row>
            </div>
            <div>
              <h3>Data Kamar </h3>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Nama Kamar </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.namaKamar} </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Ukuran kamar </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.ukuranKamar} </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Total kamar </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.totalKamar} </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>kamar tersedia </h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>{kos.ketersediaanKamar} </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={3}>
                  <h4>Harga</h4>
                </Col>
                <Col xs={6} lg={8}>
                  <h4>Rp. 1.350.000</h4>
                </Col>
              </Row>
            </div>
            <div>
              <h3>Fasilitas Kamar </h3>
              <ul>
                <div class="row row-cols-lg-2 row-cols-1">
                  {Object.values(kos.fasilitasKamar).map((el, index) => {
                    if (el === true) {
                      return (
                        <li>
                          <h5>{Object.keys(kos.fasilitasKamar)[index]}</h5>
                        </li>
                      );
                    }
                  })}
                </div>
              </ul>
            </div>
            <div>
              <h3>Fasilitas Kamar Mandi </h3>
              <ul>
                <div class="row row-cols-lg-2 row-cols-1">
                  {Object.values(kos.fasilitasKamarMandi).map((el, index) => {
                    if (el === true) {
                      return (
                        <li>
                          <h5>{Object.keys(kos.fasilitasKamarMandi)[index]}</h5>
                        </li>
                      );
                    }
                  })}
                </div>
              </ul>
            </div>
            <div>
              <h3>Gambar Kamar Kos </h3>
              <div className="row row-cols-2">
                <img src="/Frame26086255.png" alt="" />
                <img src="/Frame26086255.png" alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PreviewKos;
