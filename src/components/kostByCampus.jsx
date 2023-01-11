import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function KostByCampus() {
  return (
    <div className="ms-2">
      <h2 className="ms-2">Kos Rekomendasi di UGM</h2>
      <div class="container-fluid">
        <OwlCarousel items={5} className="owl-theme" loop nav margin={8}>
          <Card className="mb-2">
            <Card.Img variant="top" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" />
            <Card.Body>
              <Badge bg="secondary" text="light">
                Putri
              </Badge>{" "}
              <Badge bg="secondary" text="light">
                Kos Ajimumpung
              </Badge>{" "}
              <Card.Text className="">
                <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                <p style={{ margin: 0 }} className="fw-bold">
                  Jakarta
                </p>
                <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                  K. Mandi Dalam, Kloset Duduk
                </p>
              </Card.Text>
              <Button size="sm" variant="primary">
                Lihat Detail
              </Button>
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Img variant="top" src="https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg" />
            <Card.Body>
              <Badge bg="secondary" text="light">
                Putri
              </Badge>{" "}
              <Badge bg="secondary" text="light">
                Kos Ajimumpung
              </Badge>{" "}
              <Card.Text className="">
                <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                <p style={{ margin: 0 }} className="fw-bold">
                  Jakarta
                </p>
                <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                  K. Mandi Dalam, Kloset Duduk
                </p>
              </Card.Text>
              <Button size="sm" variant="primary">
                Lihat Detail
              </Button>
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Img variant="top" src="https://media.istockphoto.com/id/490673902/photo/roundabout-hi-jakarta-landmark-at-night.jpg?b=1&s=612x612&w=0&k=20&c=ZcEbBCbDfDAqLQsl-ho9caI0RDNLjUlL20YKFoPEJ88=" />
            <Card.Body>
              <Badge bg="secondary" text="light">
                Putri
              </Badge>{" "}
              <Badge bg="secondary" text="light">
                Kos Ajimumpung
              </Badge>{" "}
              <Card.Text className="">
                <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                <p style={{ margin: 0 }} className="fw-bold">
                  Jakarta
                </p>
                <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                  K. Mandi Dalam, Kloset Duduk
                </p>
              </Card.Text>
              <Button size="sm" variant="primary">
                Lihat Detail
              </Button>
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Img variant="top" src="https://media.istockphoto.com/id/490673902/photo/roundabout-hi-jakarta-landmark-at-night.jpg?b=1&s=612x612&w=0&k=20&c=ZcEbBCbDfDAqLQsl-ho9caI0RDNLjUlL20YKFoPEJ88=" />
            <Card.Body>
              <Badge bg="secondary" text="light">
                Putri
              </Badge>{" "}
              <Badge bg="secondary" text="light">
                Kos Ajimumpung
              </Badge>{" "}
              <Card.Text className="">
                <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                <p style={{ margin: 0 }} className="fw-bold">
                  Jakarta
                </p>
                <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                  K. Mandi Dalam, Kloset Duduk
                </p>
              </Card.Text>
              <Button size="sm" variant="primary">
                Lihat Detail
              </Button>
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Img variant="top" src="https://media.istockphoto.com/id/490673902/photo/roundabout-hi-jakarta-landmark-at-night.jpg?b=1&s=612x612&w=0&k=20&c=ZcEbBCbDfDAqLQsl-ho9caI0RDNLjUlL20YKFoPEJ88=" />
            <Card.Body>
              <Badge bg="secondary" text="light">
                Putri
              </Badge>{" "}
              <Badge bg="secondary" text="light">
                Kos Ajimumpung
              </Badge>{" "}
              <Card.Text className="">
                <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                <p style={{ margin: 0 }} className="fw-bold">
                  Jakarta
                </p>
                <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                  K. Mandi Dalam, Kloset Duduk
                </p>
              </Card.Text>
              <Button size="sm" variant="primary">
                Lihat Detail
              </Button>
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Img variant="top" src="https://media.istockphoto.com/id/490673902/photo/roundabout-hi-jakarta-landmark-at-night.jpg?b=1&s=612x612&w=0&k=20&c=ZcEbBCbDfDAqLQsl-ho9caI0RDNLjUlL20YKFoPEJ88=" />
            <Card.Body>
              <Badge bg="secondary" text="light">
                Putri
              </Badge>{" "}
              <Badge bg="secondary" text="light">
                Kos Ajimumpung
              </Badge>{" "}
              <Card.Text className="">
                <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                <p style={{ margin: 0 }} className="fw-bold">
                  Jakarta
                </p>
                <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                  K. Mandi Dalam, Kloset Duduk
                </p>
              </Card.Text>
              <Button size="sm" variant="primary">
                Lihat Detail
              </Button>
            </Card.Body>
          </Card>
        </OwlCarousel>
        {/* <Row lg={5}>
          <Col className="d-flex">
            <Card className="mb-2 flex-fill">
              <Card.Img variant="top" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" />
              <Card.Body>
                <Badge bg="secondary" text="light">
                  Putri
                </Badge>{" "}
                <Badge bg="secondary" text="light">
                  Kos Ajimumpung
                </Badge>{" "}
                <Card.Text className="">
                  <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                  <p style={{ margin: 0 }} className="fw-bold">
                    Jakarta
                  </p>
                  <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                    K. Mandi Dalam, Kloset Duduk
                  </p>
                </Card.Text>
                <Button size="sm" variant="primary">
                  Lihat Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="ms-2 mb-2 flex-fill">
              <Card.Img variant="top" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" />
              <Card.Body>
                <Badge bg="secondary" text="light">
                  Putri
                </Badge>{" "}
                <Badge bg="secondary" text="light">
                  Kos Ajimumpung
                </Badge>{" "}
                <Card.Text className="">
                  <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                  <p style={{ margin: 0 }} className="fw-bold">
                    Jakarta
                  </p>
                  <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                    K. Mandi Dalam, Kloset Duduk
                  </p>
                </Card.Text>
                <Button size="sm" variant="primary">
                  Lihat Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="ms-2 mb-2 flex-fill">
              <Card.Img variant="top" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" />
              <Card.Body>
                <Badge bg="secondary" text="light">
                  Putri
                </Badge>{" "}
                <Badge bg="secondary" text="light">
                  Kos Ajimumpung
                </Badge>{" "}
                <Card.Text className="">
                  <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                  <p style={{ margin: 0 }} className="fw-bold">
                    Jakarta
                  </p>
                  <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                    K. Mandi Dalam, Kloset Duduk
                  </p>
                </Card.Text>
                <Button size="sm" variant="primary">
                  Lihat Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="ms-2 mb-2 flex-fill">
              <Card.Img variant="top" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" />
              <Card.Body>
                <Badge bg="secondary" text="light">
                  Putri
                </Badge>{" "}
                <Badge bg="secondary" text="light">
                  Kos Ajimumpung
                </Badge>{" "}
                <Card.Text className="">
                  <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                  <p style={{ margin: 0 }} className="fw-bold">
                    Jakarta
                  </p>
                  <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                    K. Mandi Dalam, Kloset Duduk
                  </p>
                </Card.Text>
                <Button size="sm" variant="primary">
                  Lihat Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="ms-2 mb-2 flex-fill">
              <Card.Img variant="top" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1" />
              <Card.Body>
                <Badge bg="secondary" text="light">
                  Putri
                </Badge>{" "}
                <Badge bg="secondary" text="light">
                  Kos Ajimumpung
                </Badge>{" "}
                <Card.Text className="">
                  <p style={{ margin: 0 }}>Indekos Bu Sapri</p>
                  <p style={{ margin: 0 }} className="fw-bold">
                    Jakarta
                  </p>
                  <p style={{ margin: 0, fontSize: "12px" }} className="text-muted">
                    K. Mandi Dalam, Kloset Duduk
                  </p>
                </Card.Text>
                <Button size="sm" variant="primary">
                  Lihat Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </div>
    </div>
  );
}

export default KostByCampus;
