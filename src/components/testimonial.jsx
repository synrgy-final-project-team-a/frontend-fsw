import { Card, Container, Row, Col } from "react-bootstrap";

const Testimonial = () => {
  return (
    <Container className="my-5">
      <h3 className="text-muted fw-bolder mb-3">Kata Mereka</h3>
      <div className="">
        <Row className="d-flex justify-content-between scrolling-wrapper">
          <Col xs={8} lg={4} className="text-center">
            <Card className="testi-card">
              <Card.Body>
                <Card.Text className="fw-bolder fs-6">“ Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus “</Card.Text>
                <Card.Text className="mb-1">
                  <img
                    src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
                    className="img-fluid rounded-circle"
                    style={{ width: "28px", height: "28px" }}
                    alt=""
                  />{" "}
                  Andini Suryaningrum
                </Card.Text>
                <Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={8} lg={4} className="text-center">
            <Card className="testi-card">
              <Card.Body>
                <Card.Text className="fw-bolder">“ Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus “</Card.Text>
                <Card.Text className="mb-1">
                  <img
                    src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
                    className="img-fluid rounded-circle"
                    style={{ width: "28px", height: "28px" }}
                    alt=""
                  />{" "}
                  Andini Suryaningrum
                </Card.Text>
                <Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={8} lg={4} className="text-center">
            <Card className="testi-card">
              <Card.Body>
                <Card.Text className="fw-bolder">“ Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus “</Card.Text>
                <Card.Text className="mb-1">
                  <img
                    src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
                    className="img-fluid rounded-circle"
                    style={{ width: "28px", height: "28px" }}
                    alt=""
                  />{" "}
                  Andini Suryaningrum
                </Card.Text>
                <Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Testimonial;
