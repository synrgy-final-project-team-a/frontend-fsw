import React from "react";
import { Card, Badge, Container, Row, Col, Button, Form } from "react-bootstrap";
import NavbarComponent from "../../components/navbar";
import PencariRoutes from "../../routes/pencari";
import FooterComponent from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailKos = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-none d-lg-block">
        <NavbarComponent routes={PencariRoutes} />
      </div>

      <div>
        {/* Tulisan  */}
        <div className="container my-3">
          <p>Home / Jawa Tengah / Semarang / Kosan Citra Garden Manalagi</p>
        </div>
        {/* End Tulisan */}

        {/* Gambar Kos */}
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
            </Col>
            <Col xs={12} lg={4} className="d-none d-lg-flex flex-column justify-content-between">
              <img className="img-fluid rounded" src="/image/Kos2.png" alt="" />
              <img className="img-fluid rounded" src="/image/Kos3.png" alt="" />
            </Col>
          </Row>
        </Container>
        {/* End Gambar Kos */}

        {/* Title Kos */}
        <Container>
          <Row className="d-sm-flex ">
            <Col xs={12} md={8} lg={8}>
              <Card className="shadow-sm mt-3">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h1 className="fw-bold my-0 fs-3">Kosan Citra Garden Manalagi</h1>
                    <p className="my-0 fs-5">Banaran, Gununug Pati, Semarang</p>
                    <p className="text-muted fs-5 fw-bolder my-0">Jl. Cempaka Sari Timur, No 123B, 6745B, 2/7 Banaran, Gunung Pati, Semarang</p>
                  </Card.Text>
                  <Badge className="fw-normal" bg="outline-primary">
                    ♂ Pria
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} lg={4} className="flex-column">
              <Card className="shadow-sm mt-3 bg-outline-primary">
                <Card.Body>
                  <Card.Text>
                    Harga Mulai dari
                    <p className="mb-2">
                      <strong className="fs-5">Rp 850.000</strong> / Bulan
                    </p>
                    <Row>
                      <Col lg={6}>
                        <Form.Group controlId="dob">
                          <Form.Control type="date" name="dob" placeholderText="Pilih tanggal" />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Select aria-label="Default select example">
                          <option>Satuan</option>
                          <option value="1">Harian</option>
                          <option value="2">Mingguan</option>
                          <option value="3">Bulanan</option>
                          <option value="3">3 Bulan</option>
                          <option value="3">6 Bulan</option>
                          <option value="3">1 Tahun</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <Button variant="primary" className="col-12 mt-2" onClick={() => navigate("/pengajuan-sewa/1")}>
                      Pilih Tipe Kos
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Spesifikasi Kos */}
        <Container className="my-3">
          <Row>
            <Col xs={12} md={8} lg={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-4 fw-bolder">Spesifikasi Kos</h2>
                    <Container>
                      <ul id="">
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          <img src="/icons/icon-kamar.png" alt="" className="listImage" />3 x 4 meter
                        </li>
                        <li className="list-spesifikasi-kos" id="icon-persen">
                          <img src="/icons/icon-persen.png" alt="" className="listImage" />
                          Gratis biaya listrik
                        </li>
                      </ul>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Fasilitas Kos */}
        <Container className="my-3">
          <Row>
            <Col xs={12} md={8} lg={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-4 fw-bolder">Fasilitas Kos</h2>
                    <Container>
                      <Row>
                        <Col>
                          <ul>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-kasur.png" alt="" className="listImage" /> Kasur
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-tv.png" alt="" className="listImage" />
                              Tv
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-sofa.png" alt="" className="listImage" />
                              Sofa
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-kamar-mandi.png" alt="" className="listImage" />
                              Kamar mandi dalam
                            </li>
                          </ul>
                        </Col>
                        <Col>
                          <ul>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-lemari.png" alt="" className="listImage" />
                              Lemari baju
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-meja.png" alt="" className="listImage" />
                              Meja
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-2user.png" alt="" className="listImage" />
                              Berdua sekamar
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-jendela.png" alt="" className="listImage" />
                              Jendela
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Peraturan Kos */}
        <Container className="mt-3 mb-4">
          <Row>
            <Col xs={12} md={8} lg={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-4 fw-bolder">Peraturan Kos</h2>
                    <Container>
                      <Row>
                        <Col>
                          <ul>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-dilarang.png" alt="" className="listImage" />
                              Dilarang merokok
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-putra.png" alt="" className="listImage" />
                              Hanya putra
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-hormat.png" alt="" className="listImage" />
                              Hormati tetangga
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-parkir.png" alt="" className="listImage" />
                              Parkir yang rapi
                            </li>
                          </ul>
                        </Col>
                        <Col>
                          <ul>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-jam-malam.png" alt="" className="listImage" />
                              Jam malam: 23:00
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-jaga-kebersihan.png" alt="" className="listImage" />
                              Jaga kebersihan
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-dilarang.png" alt="" className="listImage" />
                              Tidak berisik
                            </li>
                            <li className="list-spesifikasi-kos" id="icon-kamar">
                              <img src="/icons/icon-menjaga-sopan.png" alt="" className="listImage" />
                              Menjaga sopan santun
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* End Kolom Kos */}

        {/* Tipe Kamar Kos */}
        <Container>
          {" "}
          <h1 className="fs-2 fw-bolder">Tipe Kamar Kos</h1>
        </Container>

        {/* Tipe A */}
        <div>
          <Container>
            {/* <h5 className="fw-bolder fs-4">Tipe A</h5> */}
            <Row>
              <Col xs={6} lg={4} className="d-none d-lg-flex">
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={12} lg={5} className="border-bottom">
                <h6 className="fw-bolder text-muted fs-5 my-0">Tipe A</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar.png" alt="" className="listImage" />
                    Tempat tidur
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar-mandi.png" alt="" className="listImage" />
                    Kamar Mandi dalam dan Heater
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-laundry.png" alt="" className="listImage" />
                    Free Laundry Baju
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-listrik.png" alt="" className="listImage" /> Free Listrik
                  </li>
                </ul>
              </Col>
              <Col xs={6} lg={3} className="d-none d-lg-flex">
                <Card className="shadow-sm bg-outline-primary">
                  <Card.Body>
                    <Badge className="fw-normal mb-3" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                    <Card.Text>
                      Harga Mulai dari
                      <p className="mb-2 text-muted">
                        <strong className="fs-4 text-dark">Rp 850.000</strong> / Bulan
                      </p>
                      <Button variant="light" className="fw-bolder col-12 btn-outline-primary btn-tipe-outline">
                        Pilih Tipe Kos
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Tipe B */}
        <div>
          <Container className="my-3">
            {/* <h5 className="fw-bolder fs-4">Tipe A</h5> */}
            <Row>
              <Col xs={6} lg={4} className="d-none d-lg-flex">
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={12} lg={5} className="border-bottom">
                <h6 className="fw-bolder text-muted fs-5 my-0">Tipe B</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar.png" alt="" className="listImage" />
                    Tempat tidur
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar-mandi.png" alt="" className="listImage" />
                    Kamar Mandi dalam dan Heater
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-laundry.png" alt="" className="listImage" />
                    Free Laundry Baju
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-listrik.png" alt="" className="listImage" /> Free Listrik
                  </li>
                </ul>
              </Col>
              <Col xs={6} lg={3} className="d-none d-lg-flex">
                <Card className="shadow-sm bg-outline-primary">
                  <Card.Body>
                    <Badge className="fw-normal mb-3" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                    <Card.Text>
                      Harga Mulai dari
                      <p className="mb-2 text-muted">
                        <strong className="fs-4 text-dark">Rp 850.000</strong> / Bulan
                      </p>
                      <Button variant="light" className="fw-bolder col-12 btn-outline-primary btn-tipe-outline">
                        Pilih Tipe Kos
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Tipe C */}
        <div>
          <Container>
            {/* <h5 className="fw-bolder fs-4">Tipe A</h5> */}
            <Row>
              <Col xs={6} lg={4} className="d-none d-lg-flex">
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={12} lg={5} className="border-bottom">
                <h6 className="fw-bolder text-muted fs-5 my-0">Tipe C</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar.png" alt="" className="listImage" />
                    Tempat tidur
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar-mandi.png" alt="" className="listImage" />
                    Kamar Mandi dalam dan Heater
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-laundry.png" alt="" className="listImage" />
                    Free Laundry Baju
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-listrik.png" alt="" className="listImage" /> Free Listrik
                  </li>
                </ul>
              </Col>
              <Col xs={6} lg={3} className="d-none d-lg-flex">
                <Card className="shadow-sm bg-outline-primary">
                  <Card.Body>
                    <Badge className="fw-normal mb-3" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                    <Card.Text>
                      Harga Mulai dari
                      <p className="mb-2 text-muted">
                        <strong className="fs-4 text-dark">Rp 850.000</strong> / Bulan
                      </p>
                      <Button variant="light" className="fw-bolder col-12 btn-outline-primary btn-tipe-outline">
                        Pilih Tipe Kos
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* End Tipe Kamar Kos */}

        {/* Kosan Menarik di Sekitar Lokasi */}
        <Container className="mt-3">
          <Row className="d-flex justify-content-between">
            <Col xs={8}>
              <h2 className="fw-bolder text-muted">Lihat Kosan Menarik Di Sekitarmu</h2>
            </Col>
            <Col xs={4} className="text-end">
              <a href="/pencarian" className="stretched-link text-muted">
                Cari Lokasi lainnya <FontAwesomeIcon icon="fa-duotone fa-chevron-right" />
              </a>
            </Col>
          </Row>
        </Container>
        <Container className="">
          <Row className="d-flex justify-content-evenly">
            <Col lg={4} xs={12} className="d-lg-block">
              <Card className="shadow-sm">
                <img className="img-fluid" src="/image/Kos2.png" alt="" />
                <Card.Body>
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Card.Text className="">
                    <p style={{ margin: 0 }} className="fw-bold">
                      Indekos Bu Sapri
                    </p>
                    <p style={{ margin: 0 }} className="fw-bold text-muted fs-6">
                      Jakarta
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rp 790.000 </strong> / bulan
                    </p>
                    <Badge className="fw-normal mx-0" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="d-none d-lg-block">
              <Card className="shadow-sm">
                <img className="img-fluid" src="/image/Kos2.png" alt="" />
                <Card.Body>
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Card.Text className="">
                    <p style={{ margin: 0 }} className="fw-bold">
                      Indekos Bu Sapri
                    </p>
                    <p style={{ margin: 0 }} className="fw-bold text-muted fs-6">
                      Jakarta
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rp 790.000 </strong> / bulan
                    </p>
                    <Badge className="fw-normal mx-0" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="d-none d-lg-block">
              <Card className="shadow-sm">
                <img className="img-fluid" src="/image/Kos2.png" alt="" />
                <Card.Body>
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Card.Text className="">
                    <p style={{ margin: 0 }} className="fw-bold">
                      Indekos Bu Sapri
                    </p>
                    <p style={{ margin: 0 }} className="fw-bold text-muted fs-6">
                      Jakarta
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rp 790.000 </strong> / bulan
                    </p>
                    <Badge className="fw-normal mx-0" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* End Kosan Menarik di Sekitar Lokasi */}
      </div>
      <FooterComponent />
    </>
  );
};

export default DetailKos;
