import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useGetListMutation } from "../store/apis/kos";
import { useEffect } from "react";
import { rupiahFormat } from "../store/utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

function BestKost() {
  const [getListHit, { isError, isSuccess, data }] = useGetListMutation();

  useEffect(() => {
    let payload = {};

    payload.duration_type = "MONTHLY";

    payload["sort-by"] = "price";
    payload["order-type"] = "asc";

    getListHit({ ...payload, page: 0, size: 6 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isSuccess ? (
    <Container className="mb-5">
      <h2 className="mb-3">Cari Kosan Terbaik dari Kami</h2>
      <Row className="g-4">
        {data.data.map((el, i) => {
          console.log(el);
          return (
            <Col xs={12} lg={4} key={i}>
              <Card
                className="kos-card bg-outline-primary text-decoration-none"
                as={Link}
                to={"/kos/" + el.kost_id}
              >
                <Card.Img
                  variant="top"
                  src={el.front_building_foto}
                  alt={el.kost_name}
                />
                <Card.Body>
                  <Card.Title>{el.kost_name}</Card.Title>
                  <Card.Text className="kos-location mb-1">
                    {el.address}
                  </Card.Text>
                  <Card.Text className="kos-location mb-1">
                    {el.city}, {el.province}
                  </Card.Text>
                  <Card.Text className="kos-price mb-1">
                    <span className="fw-bold">{rupiahFormat(el.price)}</span> /
                    {el.duration_type === "DAILY"
                      ? "Hari"
                      : el.duration_type === "WEEKLY"
                      ? "Minggu"
                      : el.duration_type === "MONTHLY"
                      ? "Bulan"
                      : el.duration_type === "QUARTER"
                      ? "3 Bulan"
                      : el.duration_type === "SEMESTER"
                      ? "6 Bulan"
                      : el.duration_type === "YEARLY"
                      ? "Tahun"
                      : ""}
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
        })}
      </Row>
    </Container>
  ) : isError ? (
    <Col xs={12} className="text-center">
      <h6 className="fw-bold"> Data gagal diambil</h6>
    </Col>
  ) : (
    ""
  );
}

export default BestKost;
