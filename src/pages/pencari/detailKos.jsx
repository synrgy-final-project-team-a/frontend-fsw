import React from "react";
import { Card, Badge, Container, Row, Col, Button } from "react-bootstrap";
import NavbarComponent from "../../components/navbar";
import PencariRoutes from "../../routes/pencari";
import FooterComponent from "../../components/footer";

const DetailKos = () => {
  return (
    <>
      <div className="d-none d-lg-block">
        <NavbarComponent routes={PencariRoutes} />
      </div>

      <div className="">
        {/* Tulisan  */}
        <div className="container my-3">
          <p>Home / Jawa Tengah / Semarang / Kosan Citra Garden Manalagi</p>
        </div>
        {/* End Tulisan */}

        {/* Gambar Kos */}
        <Container className="mb-5">
          <Row>
            <Col xs={12} md={8}>
              <img className="img-fluid rounded mt-3" src="/image/Kos1.png" alt="" />
            </Col>
            <Col xs={12} md={4}>
              <Row className="mt-3">
                <img className="img-fluid rounded" src="/image/Kos2.png" alt="" />
              </Row>
              <Row className="mt-3">
                <img className="img-fluid rounded" src="/image/Kos3.png" alt="" />
              </Row>
            </Col>
          </Row>
        </Container>
        {/* End Gambar Kos */}

        {/* Title Kos */}
        <Container className="">
          <Row>
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h1 className="fw-bold my-0 fs-3">Kosan Citra Garden Manalagi</h1>
                    <p className="my-0 fs-5">Banaran, Gununug Pati, Semarang</p>
                    <p className="text-muted fs-5 fw-bolder my-0">Jl. Cempaka Sari Timur, No 123B, 6745B, 2/7 Banaran, Gunung Pati, Semarang</p>
                  </Card.Text>
                  <Badge className="fw-normal text-primary badge-outline" bg="success">
                    ♂ Pria
                  </Badge>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm" bg="success">
                <Card.Body>
                  <Card.Text>
                    Harga Mulai dari
                    <p className="mb-2">
                      <strong className="fs-4">Rp 850.000</strong> / Bulan
                    </p>
                    <Button variant="primary" className="col-12">
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
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-4 fw-bolder">Spesifikasi Kos</h2>
                    <Container>
                      <ul id="list-spesifikasi-kos">
                        <li id="icon-kamar">
                          <span>3 x 4 meter</span>{" "}
                        </li>
                        <li id="icon-persen">
                          <span>Gratis biaya listrik</span>{" "}
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
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-4 fw-bolder">Fasilitas Kos</h2>
                    <Container>
                      <Row>
                        <Col>
                          <ul>
                            <li>Kasur</li>
                            <li>Tv</li>
                            <li>Sofa</li>
                            <li>Kamar mandi dalam</li>
                          </ul>
                        </Col>
                        <Col>
                          <ul>
                            <li>Lemari baju</li>
                            <li>Meja</li>
                            <li>Berdua sekamar</li>
                            <li>Jendela</li>
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
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-4 fw-bolder">Peraturan Kos</h2>
                    <Container>
                      <Row>
                        <Col>
                          <ul>
                            <li>Dilarang merokok</li>
                            <li>Hanya putra</li>
                            <li>Hormati tetangga</li>
                            <li>Parkir yang rapi</li>
                          </ul>
                        </Col>
                        <Col>
                          <ul>
                            <li>Jam malam: 23:00</li>
                            <li>Jaga kebersihan</li>
                            <li>Tidak berisik</li>
                            <li>Menjaga sopan santun</li>
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
            <h5 className="fw-bolder fs-4">Tipe A</h5>
            <Row>
              <Col xs={6} md={4}>
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={6} md={5}>
                <h6 className="fw-bolder text-muted fs-5 my-0">Tipe A</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li>Tempat tidur</li>
                  <li>Kamar Mandi dalam dan Heater</li>
                  <li>Free Laundry Baju</li>
                  <li>Free Listrik</li>
                </ul>
              </Col>
              <Col xs={6} md={3}>
                <Card className="shadow-sm" bg="success">
                  <Card.Body>
                    <Badge className="fw-normal text-primary badge-outline mb-3" bg="light">
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
            <h5 className="fw-bolder fs-4">Tipe A</h5>
            <Row>
              <Col xs={6} md={4}>
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={6} md={5}>
                <h6 className="fw-bolder text-muted fs-5 my-0">Tipe A</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li>Tempat tidur</li>
                  <li>Kamar Mandi dalam dan Heater</li>
                  <li>Free Laundry Baju</li>
                  <li>Free Listrik</li>
                </ul>
              </Col>
              <Col xs={6} md={3}>
                <Card className="shadow-sm" bg="success">
                  <Card.Body>
                    <Badge className="fw-normal text-primary badge-outline mb-3" bg="light">
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
            <h5 className="fw-bolder fs-4">Tipe A</h5>
            <Row>
              <Col xs={6} md={4}>
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={6} md={5}>
                <h6 className="fw-bolder text-muted fs-5 my-0">Tipe A</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li>Tempat tidur</li>
                  <li>Kamar Mandi dalam dan Heater</li>
                  <li>Free Laundry Baju</li>
                  <li>Free Listrik</li>
                </ul>
              </Col>
              <Col xs={6} md={3}>
                <Card className="shadow-sm" bg="success">
                  <Card.Body>
                    <Badge className="fw-normal text-primary badge-outline mb-3" bg="light">
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
        <Container className="mt-5">
          {" "}
          <h2 className="fs-4 fw-bolder text-muted">Lihat Kosan Menarik Di Sekitarmu</h2>
        </Container>
        <Container className="mb-5">
          <Row>
            <Col xs={6} md={4}>
              {/* style={{ width: "18rem" }} */}
              <Card className="">
                <img className="img-fluid" src="/image/Kos2.png" alt="" />
                <Card.Body>
                  <Badge bg="secondary" text="light">
                    Putri
                  </Badge>{" "}
                  <Badge bg="secondary" text="light">
                    Kos Ajimumpung
                  </Badge>{" "}
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Card.Text className="">
                    <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                    <p style={{ margin: 0 }} className="fw-bold">
                      Jakarta
                    </p>
                    <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                      K. Mandi Dalam, Kloset Duduk
                    </p>
                  </Card.Text>
                  <Button size="sm" variant="primary" href="/detail-kos">
                    Lihat Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={4}>
              {/* style={{ width: "18rem" }} */}
              <Card className="">
                <img className="img-fluid" src="/image/Kos2.png" alt="" />
                <Card.Body>
                  <Badge bg="secondary" text="light">
                    Putri
                  </Badge>{" "}
                  <Badge bg="secondary" text="light">
                    Kos Ajimumpung
                  </Badge>{" "}
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Card.Text className="">
                    <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                    <p style={{ margin: 0 }} className="fw-bold">
                      Jakarta
                    </p>
                    <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                      K. Mandi Dalam, Kloset Duduk
                    </p>
                  </Card.Text>
                  <Button size="sm" variant="primary" href="/detail-kos">
                    Lihat Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={4}>
              {/* style={{ width: "18rem" }} */}
              <Card className="">
                <img className="img-fluid" src="/image/Kos2.png" alt="" />
                <Card.Body>
                  <Badge bg="secondary" text="light">
                    Putri
                  </Badge>{" "}
                  <Badge bg="secondary" text="light">
                    Kos Ajimumpung
                  </Badge>{" "}
                  {/* <Card.Title>Card Title</Card.Title> */}
                  <Card.Text className="">
                    <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                    <p style={{ margin: 0 }} className="fw-bold">
                      Jakarta
                    </p>
                    <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                      K. Mandi Dalam, Kloset Duduk
                    </p>
                  </Card.Text>
                  <Button size="sm" variant="primary" href="/detail-kos">
                    Lihat Detail
                  </Button>
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
