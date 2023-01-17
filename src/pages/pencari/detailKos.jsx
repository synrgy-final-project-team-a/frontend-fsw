import React from "react";
import { Card, Badge, Container, Row, Col, Button } from "react-bootstrap";
import NavbarComponent from "../../components/navbar";
import PencariRoutes from "../../routes/pencari";
import FooterComponent from "../../components/footer";

const DetailKos = () => {
  return (
    <>
      <NavbarComponent routes={PencariRoutes} />
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
              <img className="img-fluid" src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="" />
            </Col>
            <Col xs={6} md={4}>
              <Row>
                <img className="img-fluid" src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="" />
              </Row>
              <Row className="mt-2">
                <img className="img-fluid" src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="" />
              </Row>
            </Col>
          </Row>
        </Container>
        {/* End Gambar Kos */}

        {/* Title Kos */}
        <Container className="">
          <Row>
            <Col md={{ span: 8 }}>
              <Card bg="light">
                <Card.Body>
                  <Card.Text className="mb-1">
                    <p className="fw-bold fs-3 my-0">Kosan Citra Garden Manalagi</p>
                    <p className="my-0">Banaran, Gununug Pati, Semarang</p>
                    <p className="text-muted fw-bolder fs-6 my-0">Jl. Cempaka Sari Timur, No 123B, 6745B, 2/7 Banaran, Gunung Pati, Semarang</p>
                  </Card.Text>
                  <Badge className="fw-normal" bg="light" text="dark">
                    Putri
                  </Badge>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col md={{ span: 3 }}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    Harga Mulai dari
                    <p className="mb-2">
                      <strong className="fs-4">Rp 850.000</strong> / Bulan
                    </p>
                    <Button variant="light" className="col-12">
                      Pilih Tipe Kos
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Spesifikasi Kos */}
        <Container className="my-4">
          <Row>
            <Col md={{ span: 8 }}>
              <Card>
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-3">Spesifikasi Kos</h2>
                    <ul>
                      <li>Banaran, Gununug Pati, Semarang</li>
                      <li>Banaran, Gununug Pati, Semarang</li>
                      <li>Banaran, Gununug Pati, Semarang</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Fasilitas Kos */}
        <Container className="my-4">
          <Row>
            <Col md={{ span: 8 }}>
              <Card>
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-3">Fasilitas Kos</h2>
                    <ul>
                      <li>Banaran, Gununug Pati, Semarang</li>
                      <li>Banaran, Gununug Pati, Semarang</li>
                      <li>Banaran, Gununug Pati, Semarang</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Peraturan Kos */}
        <Container className="my-4">
          <Row>
            <Col md={{ span: 8 }}>
              <Card>
                <Card.Body>
                  <Card.Text className="mb-1">
                    <h2 className="fs-3">Peraturan Kos</h2>
                    <ul>
                      <li>Banaran, Gununug Pati, Semarang</li>
                      <li>Banaran, Gununug Pati, Semarang</li>
                      <li>Banaran, Gununug Pati, Semarang</li>
                    </ul>
                    <p className="mb-1">Banaran, Gununug Pati, Semarang</p>
                    <p className="my-1">Banaran, Gununug Pati, Semarang</p>
                    <p className="my-1">Banaran, Gununug Pati, Semarang</p>
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
          <h1 className="fs-2">Tipe Kamar Kos</h1>
        </Container>

        {/* Tipe A */}
        <div>
          <Container>
            <h5>Tipe A</h5>
            <Row>
              <Col xs={6} md={4}>
                <img className="img-fluid" src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="" />
              </Col>
              <Col xs={6} md={4}>
                <h6>Tipe A</h6>
                Luas Ruangan: 12 meter.
                <ul>
                  <li>Tempat tidur</li>
                  <li>Kamar Mandi dalam dan Heater</li>
                  <li>Free Laundry Baju</li>
                  <li>Free Listrik</li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      Harga Mulai dari
                      <p className="mb-2">
                        <strong className="fs-4">Rp 850.000</strong> / Bulan
                      </p>
                      <Button variant="light" className="col-12">
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
          <Container>
            <h5>Tipe A</h5>
            <Row>
              <Col xs={6} md={4}>
                <img className="img-fluid" src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="" />
              </Col>
              <Col xs={6} md={4}>
                <h6>Tipe A</h6>
                Luas Ruangan: 12 meter.
                <ul>
                  <li>Tempat tidur</li>
                  <li>Kamar Mandi dalam dan Heater</li>
                  <li>Free Laundry Baju</li>
                  <li>Free Listrik</li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      Harga Mulai dari
                      <p className="mb-2">
                        <strong className="fs-4">Rp 850.000</strong> / Bulan
                      </p>
                      <Button variant="light" className="col-12">
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
            <h5>Tipe A</h5>
            <Row>
              <Col xs={6} md={4}>
                <img className="img-fluid" src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="" />
              </Col>
              <Col xs={6} md={4}>
                <h6>Tipe A</h6>
                Luas Ruangan: 12 meter.
                <ul>
                  <li>Tempat tidur</li>
                  <li>Kamar Mandi dalam dan Heater</li>
                  <li>Free Laundry Baju</li>
                  <li>Free Listrik</li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      Harga Mulai dari
                      <p className="mb-2">
                        <strong className="fs-4">Rp 850.000</strong> / Bulan
                      </p>
                      <Button variant="light" className="col-12">
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
          <h2 className="fs-4">Tipe Kamar Kos</h2>
        </Container>
        <Container className="mb-5">
          <Row>
            <Col xs={6} md={4}>
              {/* style={{ width: "18rem" }} */}
              <Card className="">
                <img className="img-fluid" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
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
                <img className="img-fluid" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
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
                <img className="img-fluid" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" alt="" />
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
