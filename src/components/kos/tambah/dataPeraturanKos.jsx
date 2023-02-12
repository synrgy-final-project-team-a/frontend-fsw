import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProgress, submitForm } from "../../../store/slices/kosSlice";

const DataPeraturanKos = ({ setKeynya }) => {
  const dispatch = useDispatch();

  const rule = useSelector((state) => state.kos.peraturan);
  const kos = useSelector((state) => state.kos);

  const formRef = useRef({});

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 2;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();

    const peraturan1 = formRef.current[0].checked;
    const peraturan2 = formRef.current[1].checked;
    const peraturan3 = formRef.current[2].checked;
    const peraturan4 = formRef.current[3].checked;
    const peraturan5 = formRef.current[4].checked;
    const peraturan6 = formRef.current[5].checked;
    const peraturan7 = formRef.current[6].checked;
    const peraturan8 = formRef.current[7].checked;
    const peraturan9 = formRef.current[8].checked;
    const peraturan10 = formRef.current[9].checked;

    const payload = {
      peraturan: {
        "Ada jam malam": peraturan1,
        "Wajib sertakan KTP saat pengajuan sewa": peraturan2,
        "Lawan jenis dilarang ke kamar": peraturan3,
        "Tamu dilarang menginap": peraturan4,
        "Maks. 1 orang / kamar": peraturan5,
        "Maks. 2 orang / kamar": peraturan6,
        "Check out maks. pukul 12:00 (sewa harian)": peraturan7,
        "Check in pukul 14:00-21:00 (sewa harian)": peraturan8,
        "Termasuk listrik": peraturan9,
        "Dilarang merokok di kamar": peraturan10,
      }
    };

    dispatch(submitForm(payload));
    let newKey = 4;
    if(kos.progress < 4) {
      dispatch(setProgress(4));
    }
    setKeynya(newKey);
  };

  return (
    <>
      <h1 className="text-center">Data Kos</h1>
      <h3 className="text-center">Masukan peraturan kos</h3>
      <Form onSubmit={handleSetelahnya}>
        <Row className="g-2 justify-content-center">
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              {Object.keys(rule).map((el, i) => {
                return (
                  <Form.Check
                    className="w-100 mb-3"
                    type="checkbox"
                    label={el}
                    key={i}
                    defaultChecked={Object.values(rule)[i]}
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

export default DataPeraturanKos;
