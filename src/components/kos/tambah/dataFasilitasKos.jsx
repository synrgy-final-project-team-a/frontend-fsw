import { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../../store/slices/kosSlice";

const DataFasilitasKos = ({ setKeynya }) => {
  const dispatch = useDispatch();

  const facility = useSelector((state) => state.kos.fasilitas);
  const kos = useSelector((state) => state.kos);

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

    const fasilitas1 = formRef.current[0].checked;
    const fasilitas2 = formRef.current[1].checked;
    const fasilitas3 = formRef.current[2].checked;
    const fasilitas4 = formRef.current[3].checked;
    const fasilitas5 = formRef.current[4].checked;
    const fasilitas6 = formRef.current[5].checked;
    const fasilitas7 = formRef.current[6].checked;
    const fasilitas8 = formRef.current[7].checked;
    const fasilitas9 = formRef.current[8].checked;
    const fasilitas10 = formRef.current[9].checked;
    const fasilitas11 = formRef.current[10].checked;
    const fasilitas12 = formRef.current[11].checked;

    const payload = {
      status: 4,
      fasilitas: {
        Air: fasilitas1,
        "Parkir Mobil": fasilitas2,
        "Parkir Motor": fasilitas3,
        Dispenser: fasilitas4,
        Laundry: fasilitas5,
        Dapur: fasilitas6,
        "Ruang Jemur": fasilitas7,
        "Ruang Tamu": fasilitas8,
        Wifi: fasilitas9,
        Kulkas: fasilitas10,
        "Televisi (TV)": fasilitas11,
        Listrik: fasilitas12,
      },
    };
    dispatch(submitForm(payload));
    let newKey = 4;
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
