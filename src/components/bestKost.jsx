import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useGetListMutation } from "../store/apis/kos";
import { useEffect } from "react";
import { durationToDurasi, rupiahFormat } from "../store/utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faVenusMars } from "@fortawesome/free-solid-svg-icons";

function BestKost() {
  const [getListHit, { isError, isSuccess, data, isLoading }] = useGetListMutation();

  useEffect(() => {
    let payload = {};

    payload.duration_type = "MONTHLY";

    payload["sort-by"] = "price";
    payload["order-type"] = "asc";

    getListHit({ ...payload, page: 0, size: 6 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mb-5">
      <h2 className="mb-3">Cari Kosan Terbaik dari Kami</h2>
      <Row className="g-4">
        {
          isLoading ?
            [...Array(6).keys()].map((el, i) => {
              return (
                <Col xs={12} lg={4} key={i}>
                  <Card bg="none" className="skeleton" style={{ height: "300px" }}>
                    &nbsp;
                  </Card>
                </Col>
              )
            }) : isSuccess ?
              data.data.map((el, i) => {
                return (
                  <Col xs={12} lg={4} key={i}>
                    <Card className="kos-card bg-outline-primary text-decoration-none" as={Link} to={"/kos/" + el.kost_id}>
                      <Card.Img variant="top" src={el.front_building_photo} alt={el.kost_name} />
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title>{el.kost_name}</Card.Title>
                        <Card.Text className="kos-location mb-1">{el.address}</Card.Text>
                        <Card.Text className="kos-location mb-1">
                          {el.city}, {el.province}
                        </Card.Text>
                        <Card.Text className="kos-price mb-1">
                          <span className="fw-bold">{rupiahFormat(el.price)}</span> /
                          {durationToDurasi(el.duration_type)}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <div className="tag">
                            {el.kost_type_man === true ? (
                              <Badge bg="outline-primary">
                                <FontAwesomeIcon icon={faMars} /> Putra
                              </Badge>
                            ) : (
                              ""
                            )}
                            {el.kost_type_woman === true ? (
                              <Badge bg="outline-primary">
                                <FontAwesomeIcon icon={faVenus} /> Putri
                              </Badge>
                            ) : (
                              ""
                            )}
                            {el.kost_type_mixed === true ? (
                              <Badge bg="outline-primary">
                                <FontAwesomeIcon icon={faVenusMars} /> Campuran
                              </Badge>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="favorite">
                            <img src="/like.png" alt="..." />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }) : isError ? (
                <Col xs={12} className="text-center">
                  <h6 className="fw-bold"> Data gagal diambil</h6>
                </Col>
              ) : (
                ""
              )
        }
      </Row>
    </Container>
  )
}

export default BestKost;
