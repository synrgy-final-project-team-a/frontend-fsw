import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function BestKost() {
  return (
    <Container fluid>
      <div className="px-5 ">
      <h2 className="section-title ps-3">Kos Terbaik dari Kami</h2>
      
        <Row lg={3} className="g-2 px-1">
          <Col className="d-flex px-3">
            <Card className="mb-2 flex-fill border-0 px-1">
              <Card.Img variant="top" src="/kos-giya-putri.png" />
              <Card.Body className="kost-desc pe-0">
                <Card.Title className="kost-title">Kos Giya Putri</Card.Title>
                <Card.Text className="mb-1">
                  <p className="kost-location m-0">Cempaka Timur, Semarang</p>
                  <p className="kost-price m-0">
                    Rp. 1.500.000 / <span style={{color: "#8E9191"}}>Bulan</span>
                  </p>
                </Card.Text>
                <Badge className="kost-category-badge" bg="none" text="primary">
                  <span><img src="/woman.png" alt="" /></span>
                  Putri
                </Badge>{" "}
                <a href="#" ><img src="/like.png" style={{ marginLeft: '70%' }} alt="" /></a>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex px-3">
            <Card className="mb-2 flex-fill border-0 px-1">
              <Card.Img variant="top" src="/kos-turiman.png" />
              <Card.Body className="kost-desc pe-0">
                <Card.Title className="kost-title">Kos H.Turiman Banaran</Card.Title>
                <Card.Text className="mb-1">
                  <p className="kost-location m-0">Jl.Banaran No.117 Banaran Sekaran, Semarang</p>
                  <p className="kost-price m-0">
                    Rp. 850.000 / <span style={{color: "#8E9191"}}>Bulan</span>
                  </p>
                </Card.Text>
                <Badge className="kost-category-badge" bg="none" text="primary">
                  <span><img src="/people.png" alt="" /></span>
                  Putri
                </Badge>{" "}
                <a href="#" ><img src="/like.png" style={{ marginLeft: '70%' }} alt="" /></a>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex px-3">
            <Card className="mb-2 flex-fill border-0 px-1">
              <Card.Img variant="top" src="/kos-mambo.png" />
              <Card.Body className="kost-desc pe-0">
                <Card.Title className="kost-title">Kos MAMBO 23 DUREN TIGA</Card.Title>
                <Card.Text className="mb-1">
                  <p className="kost-location m-0">Jl. Prof. Huda No.76 Banyumanik, Banyuwangi</p>
                  <p className="kost-price m-0">
                    Rp. 750.000 / <span style={{color: "#8E9191"}}>Bulan</span>
                  </p>
                </Card.Text>
                <Badge className="kost-category-badge" bg="none" text="primary">
                  <span><img src="/man.png" alt="" /></span>
                  Putri
                </Badge>{" "}
                <a href="#" ><img src="/like.png" style={{ marginLeft: '70%' }} alt="" /></a>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex px-3">
            <Card className="mb-2 flex-fill border-0 px-1">
              <Card.Img variant="top" src="/kos-bunda-rina.png" />
              <Card.Body className="kost-desc pe-0">
                <Card.Title className="kost-title">Kos Bunda Rina Kalimasada</Card.Title>
                <Card.Text className="mb-1">
                  <p className="kost-location m-0">Kecoklat Barat D-15, Kota Surabaya</p>
                  <p className="kost-price m-0">
                    Rp. 1.099.000 / <span style={{color: "#8E9191"}}>Bulan</span>
                  </p>
                </Card.Text>
                <Badge className="kost-category-badge" bg="none" text="primary">
                  <span><img src="/people.png" alt="" /></span>
                  Putri
                </Badge>{" "}
                <a href="#" ><img src="/like.png" style={{ marginLeft: '70%' }} alt="" /></a>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex px-3">
            <Card className="mb-2 flex-fill border-0 px-1">
              <Card.Img variant="top" src="/agatha.png" />
              <Card.Body className="kost-desc pe-0">
                <Card.Title className="kost-title">Agatha Adam Malik, Bandung</Card.Title>
                <Card.Text className="mb-1">
                  <p className="kost-location m-0">Tanjung Sari, Bandung Barat</p>
                  <p className="kost-price m-0">
                    Rp. 1.500.000 / <span style={{color: "#8E9191"}}>Bulan</span>
                  </p>
                </Card.Text>
                <Badge className="kost-category-badge" bg="none" text="primary">
                  <span><img src="/man.png" alt="" /></span>
                  Putri
                </Badge>{" "}
                <a href="#" style={{position: "relative", left:"15.5rem"}}><img src="/like.png" style={{ marginLeft: '70%' }} alt="" /></a>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex px-3">
            <Card className="mb-2 flex-fill border-0 px-1">
              <Card.Img variant="top" src="/grand-luxury.png" />
              <Card.Body className="kost-desc pe-0">
                <Card.Title className="kost-title">Grand Luxury Balemong Barat</Card.Title>
                <Card.Text className="mb-1">
                  <p className="kost-location m-0">Jl. Pakintelan 34, Jakarta Utara</p>
                  <p className="kost-price m-0">
                    Rp. 1.830.000 / <span style={{color: "#8E9191"}}>Bulan</span>
                  </p>
                </Card.Text>
                <Badge className="kost-category-badge" bg="none" text="primary">
                  <span><img src="/woman.png" alt="" /></span>
                  Putri
                </Badge>{" "}
                <a href="#" ><img src="/like.png" style={{ marginLeft: '70%' }} alt="" /></a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
           
    </div>
    </Container>
  );
}

export default BestKost;
