import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../../store/slices/kosSlice";

const DataAlamatKos = ({ setKeynya }) => {
  const dispatch = useDispatch();
  const provinsi = useSelector((state) => state.alamat.provinsi);
  const kos = useSelector((state) => state.kos);

  const formRef = useRef({});
  const [error, setError] = useState({});

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 1;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();

    setError({});
    let failed = false;

    const alamat = formRef.current.alamat.value;
    const kelurahan = formRef.current.kelurahan.value;
    const kecamatan = formRef.current.kecamatan.value;
    const kota = formRef.current.kota.value;
    const provinsi = formRef.current.provinsi.value;

    if (alamat === "") {
      failed = true;
      setError((error) => ({
        ...error,
        alamat: "Alamat kos tidak boleh kosong!",
      }));
    }
    if (kelurahan === "") {
      failed = true;
      setError((error) => ({
        ...error,
        kelurahan: "Kelurahan kos tidak boleh kosong!",
      }));
    }
    if (kecamatan === "") {
      failed = true;
      setError((error) => ({
        ...error,
        kecamatan: "Kecamatan kos tidak boleh kosong!",
      }));
    }
    if (kota === "") {
      failed = true;
      setError((error) => ({
        ...error,
        kota: "Kota kos tidak boleh kosong!",
      }));
    }
    if (provinsi === "") {
      failed = true;
      setError((error) => ({
        ...error,
        provinsi: "Provinsi kos tidak boleh kosong!",
      }));
    }
    if (failed) {
      return;
    }

    const payload = {
      status:2,
      alamat: alamat,
      kelurahan: kelurahan,
      kecamatan: kelurahan,
      kota: kota,
      provinsi: provinsi,
    };

    dispatch(submitForm(payload));
    let newKey = 3;
    setKeynya(newKey);
  };


  return (
    <>
      <h1 className="text-center">Data Kos</h1>
      <h3 className="text-center">Mari lengkapi alamat kos</h3>
      <Form onSubmit={handleSetelahnya}>
        <Row className="g-2 justify-content-center">
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3" controlId="formBasicNama">
              <Form.Label className="w-100">Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan alamat kos"
                ref={(ref) => (formRef.current.alamat = ref)}
                defaultValue={kos.alamat}
              />
              {error.hasOwnProperty("alamat") && error.alamat !== "" ? (
                <Form.Text className="text-danger">{error.alamat}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicKelurahan">
              <Form.Label className="w-100">Kelurahan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kelurahan kos"
                ref={(ref) => (formRef.current.kelurahan = ref)}
                defaultValue={kos.kelurahan}
              />
              {error.hasOwnProperty("kelurahan") && error.kelurahan !== "" ? (
                <Form.Text className="text-danger">{error.kelurahan}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicKecamatan">
              <Form.Label className="w-100">Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kecamatan kos"
                ref={(ref) => (formRef.current.kecamatan = ref)}
                defaultValue={kos.kecamatan}
              />
              {error.hasOwnProperty("kecamatan") && error.kecamatan !== "" ? (
                <Form.Text className="text-danger">{error.kecamatan}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicKota">
              <Form.Label className="w-100">Kabupaten / Kota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kabupaten / kota kos"
                ref={(ref) => (formRef.current.kota = ref)}
                defaultValue={kos.kota}
              />
              {error.hasOwnProperty("kota") && error.kota !== "" ? (
                <Form.Text className="text-danger">{error.kota}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicKecamatan">
              <Form.Label className="w-100">Provinsi</Form.Label>
              <Form.Control
                type="text"
                list="provinsi-list"
                placeholder="Masukkan Provinsi kos"
                ref={(ref) => (formRef.current.provinsi = ref)}
                defaultValue={kos.provinsi}
              />
              <datalist id="provinsi-list">
                {provinsi.map((el, i) => {
                  return <option key={i} value={el} />;
                })}
              </datalist>
              {error.hasOwnProperty("provinsi") && error.provinsi !== "" ? (
                <Form.Text className="text-danger">{error.provinsi}</Form.Text>
              ) : (
                ""
              )}
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

export default DataAlamatKos;
