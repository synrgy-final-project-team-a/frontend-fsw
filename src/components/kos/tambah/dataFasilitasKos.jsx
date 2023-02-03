import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../../store/slices/kosSlice";

const DataFasilitasKos = ({ setKeynya }) => {
  const dispatch = useDispatch();

  const facility = useSelector((state) => state.kos.fasilitas);

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

    const air = formRef.current[0].checked;
    const parkirMobil = formRef.current[1].checked;
    const parkirMotor = formRef.current[2].checked;
    const dispenser = formRef.current[3].checked;
    const Laundry = formRef.current[4].checked;
    const dapur = formRef.current[5].checked;
    const ruangJemur = formRef.current[6].checked;
    const ruangTamu = formRef.current[7].checked;
    const wifi = formRef.current[8].checked;
    const kulkas = formRef.current[9].checked;
    const televisi = formRef.current[10].checked;
    const listrik = formRef.current[11].checked;

    const payload = {
      status: 4,
      fasilitas: {
        Air: air,
        "Parkir Mobil": parkirMobil,
        "Parkir Motor": parkirMotor,
        Dispenser: dispenser,
        Laundry: Laundry,
        Dapur: dapur,
        "Ruang Jemur": ruangJemur,
        "Ruang Tamu": ruangTamu,
        Wifi: wifi,
        Kulkas: kulkas,
        "Televisi (TV)": televisi,
        Listrik: listrik,
      },
    };
    dispatch(submitForm(payload));
    let newKey = 5;
    setKeynya(newKey);
  };

  return (
    <>
      <h1 className="text-center">Data Kos</h1>
      <h3 className="text-center">
        Pilih fasilitas umum yang ada di kosan anda
      </h3>
      <Form onSubmit={handleSetelahnya}>
        <Row className="g-2 justify-content-center">
          <Col xs={12} lg={6}>
            <Form.Group
              className="mb-3 row row-cols-3"
              controlId="formBasicCheckbox"
            >
              {Object.keys(facility).map((el, i) => {
                return (
                  <Form.Check
                    className="mb-3"
                    type="checkbox"
                    label={el}
                    key={i}
                    defaultChecked={Object.values(facility)[i]}
                    ref={(ref) => (formRef.current[i] = ref)}
                  />
                );
              })}
            </Form.Group>
          </Col>
          <div className="w-100"></div>
          <Col xs={12} lg={6} className="d-flex">
            <Button
              variant="outline-warning"
              className="w-100 me-1"
              onClick={handleSebelumnya}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline-primary"
              className="w-100 ms-1"
              type="submit"
            >
              Selanjutnya
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default DataFasilitasKos;
