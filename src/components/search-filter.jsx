import { faFemale, faMale, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";

const FilterComponent = ({ loadKost, payloadQuery, paramsQuery, pageSetter, listSetter, displayFilter }) => {
  const formRef = useRef({});

  const [error, setError] = useState({});
  const [jenisKelamin, setJenisKelamin] = useState({});
  const [durasi, setDurasi] = useState(payloadQuery.duration_type);
  const [rating, setRating] = useState({});

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    let payload = { ...payloadQuery };
    let failed = false;

    const hargaMinimal = formRef.current.hargaMinimal.value;
    const hargaMaksimal = formRef.current.hargaMaksimal.value;

    const { putra, putri, campur } = jenisKelamin;

    if (hargaMinimal !== "") {
      if (!/^[0-9]/i.test(hargaMinimal)) {
        failed = true;
        setError((error) => ({ ...error, hargaMinimal: "Harga minimal tidak valid!" }));
      } else {
        payload.price_minimum = hargaMinimal;
      }
    }

    if (hargaMaksimal !== "") {
      if (!/^[0-9]/i.test(hargaMaksimal)) {
        failed = true;
        setError((error) => ({ ...error, hargaMaksimal: "harga maksimal tidak valid!" }));
      } else {
        payload.price_maximum = hargaMaksimal;
      }
    }

    payload.kost_type_man = putra;
    payload.kost_type_woman = putri;
    payload.kost_type_mixed = campur;

    payload.duration_type = durasi;

    if (failed) {
      return;
    }

    paramsQuery((payloadParams) => ({ ...payloadParams, ...payload }));

    pageSetter(0);
    listSetter([]);
    loadKost({ ...payload, page: 0, size: 6 });
    displayFilter("filter");
  };

  const handleJenisChange = (tipe) => {
    let temp = {
      putra: false,
      putri: false,
      campur: false,
    };

    temp[tipe] = true;

    setJenisKelamin(temp);
  };

  const handleRatingChange = (tipe) => {
    let temp = { ...rating };

    temp[tipe] = !temp[tipe];

    setRating(temp);
  };

  const handleDurationChange = (tipe) => {
    setDurasi(tipe);
  };

  return (
    <Form onSubmit={handleSubmitFilter}>
      <h4 className="fw-bold mt-4">Filter</h4>
      <Accordion alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Harga Kos</Accordion.Header>
          <Accordion.Body>
            <Row className="align-items-end">
              <Col xs="auto">
                <Form.Group controlId="formBasicMinimal">
                  <Form.Label>Minimal</Form.Label>
                  <Form.Control type="number" placeholder="Rp. 750.000" defaultValue={payloadQuery.price_minimum} ref={(ref) => (formRef.current.hargaMinimal = ref)} />
                  {error.hasOwnProperty("hargaMinimal") && error.hargaMinimal !== "" ? <Form.Text className="text-danger">{error.hargaMinimal}</Form.Text> : ""}
                </Form.Group>
              </Col>
              <Col xs="auto">
                <p>---</p>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formBasicMaksimal">
                  <Form.Label>Maksimal</Form.Label>
                  <Form.Control type="number" placeholder="Rp. 1.500.000" defaultValue={payloadQuery.price_maximum} ref={(ref) => (formRef.current.hargaMaksimal = ref)} />
                  {error.hasOwnProperty("hargaMaksimal") && error.hargaMaksimal !== "" ? <Form.Text className="text-danger">{error.hargaMaksimal}</Form.Text> : ""}
                </Form.Group>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Tipe Kos</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formBasicJenisKelamin">
              <label className="me-2 cursor-pointer" htmlFor="jenisPutra">
                <Card bg={jenisKelamin && jenisKelamin.putra === true ? "outline-primary" : "none"} className="jenis-kelamin-card">
                  <h3>
                    <FontAwesomeIcon icon={faMale} />
                  </h3>
                  <p>Putra</p>
                </Card>
              </label>
              <label className="me-2 cursor-pointer" htmlFor="jenisPutri">
                <Card bg={jenisKelamin && jenisKelamin.putri === true ? "outline-primary" : "none"} className="jenis-kelamin-card">
                  <h3>
                    <FontAwesomeIcon icon={faFemale} />
                  </h3>
                  <p>Putri</p>
                </Card>
              </label>
              <label className="me-2 cursor-pointer" htmlFor="jenisCampur">
                <Card bg={jenisKelamin && jenisKelamin.campur === true ? "outline-primary" : "none"} className="jenis-kelamin-card">
                  <h3>
                    <FontAwesomeIcon icon={faUsers} />
                  </h3>
                  <p>Campur</p>
                </Card>
              </label>
              <input type="radio" name="jenisKelamin" id="jenisPutra" hidden checked={jenisKelamin.putra === true} onChange={(e) => handleJenisChange("putra")} />
              <input type="radio" name="jenisKelamin" id="jenisPutri" hidden checked={jenisKelamin.putri === true} onChange={(e) => handleJenisChange("putri")} />
              <input type="radio" name="jenisKelamin" id="jenisCampur" hidden checked={jenisKelamin.campur === true} onChange={(e) => handleJenisChange("campur")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Durasi Kos</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formBasicDurasi">
              <Form.Check className="my-2" type="radio" name="durasi" label="Harian" checked={durasi === "DAILY"} onChange={(e) => handleDurationChange("DAILY")} />
              <Form.Check className="my-2" type="radio" name="durasi" label="Mingguan" checked={durasi === "WEEKLY"} onChange={(e) => handleDurationChange("WEEKLY")} />
              <Form.Check className="my-2" type="radio" name="durasi" label="Bulanan" checked={durasi === "MONTHLY"} onChange={(e) => handleDurationChange("MONTHLY")} />
              <Form.Check className="my-2" type="radio" name="durasi" label="3 Bulanan" checked={durasi === "QUARTER"} onChange={(e) => handleDurationChange("QUARTER")} />
              <Form.Check className="my-2" type="radio" name="durasi" label="6 Bulanan" checked={durasi === "SEMESTER"} onChange={(e) => handleDurationChange("SEMESTER")} />
              <Form.Check className="my-2" type="radio" name="durasi" label="Tahunan" checked={durasi === "YEARLY"} onChange={(e) => handleDurationChange("YEARLY")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Rating Kos</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formBasicRating">
              <label className="me-2 cursor-pointer" htmlFor="ratingSatu">
                <Card bg={rating && rating.satu === true ? "outline-warning" : "none"} className="jenis-kelamin-card">
                  <p className={rating && rating.satu === true ? "text-warning" : ""}>
                    <FontAwesomeIcon icon={faStar} /> 1
                  </p>
                </Card>
              </label>
              <label className="me-2 cursor-pointer" htmlFor="ratingDua">
                <Card bg={rating && rating.dua === true ? "outline-warning" : "none"} className="jenis-kelamin-card">
                  <p className={rating && rating.dua === true ? "text-warning" : ""}>
                    <FontAwesomeIcon icon={faStar} /> 2
                  </p>
                </Card>
              </label>
              <label className="me-2 cursor-pointer" htmlFor="ratingTiga">
                <Card bg={rating && rating.tiga === true ? "outline-warning" : "none"} className="jenis-kelamin-card">
                  <p className={rating && rating.tiga === true ? "text-warning" : ""}>
                    <FontAwesomeIcon icon={faStar} /> 3
                  </p>
                </Card>
              </label>
              <label className="me-2 cursor-pointer" htmlFor="ratingEmpat">
                <Card bg={rating && rating.empat === true ? "outline-warning" : "none"} className="jenis-kelamin-card">
                  <p className={rating && rating.empat === true ? "text-warning" : ""}>
                    <FontAwesomeIcon icon={faStar} /> 4
                  </p>
                </Card>
              </label>
              <label className="me-2 cursor-pointer" htmlFor="ratingLima">
                <Card bg={rating && rating.lima === true ? "outline-warning" : "none"} className="jenis-kelamin-card">
                  <p className={rating && rating.lima === true ? "text-warning" : ""}>
                    <FontAwesomeIcon icon={faStar} /> 5
                  </p>
                </Card>
              </label>
              <input type="checkbox" name="rating" id="ratingSatu" hidden checked={rating.satu === true} onChange={(e) => handleRatingChange("satu")} />
              <input type="checkbox" name="rating" id="ratingDua" hidden checked={rating.dua === true} onChange={(e) => handleRatingChange("dua")} />
              <input type="checkbox" name="rating" id="ratingTiga" hidden checked={rating.tiga === true} onChange={(e) => handleRatingChange("tiga")} />
              <input type="checkbox" name="rating" id="ratingEmpat" hidden checked={rating.empat === true} onChange={(e) => handleRatingChange("empat")} />
              <input type="checkbox" name="rating" id="ratingLima" hidden checked={rating.lima === true} onChange={(e) => handleRatingChange("lima")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="text-center">
        <Button type="submit" variant="primary">
          <span className="mx-5 px-3">Cari</span>
        </Button>
      </div>
    </Form>
  );
};

export default FilterComponent;
