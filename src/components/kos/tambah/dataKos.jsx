import { faFemale, faMale, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProgress, submitForm } from "../../../store/slices/kosSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const DataKos = ({ setKeynya }) => {
  const dispatch = useDispatch();

  const kos = useSelector((state) => state.kos);

  const formRef = useRef({});
  const [error, setError] = useState({});
  const [valueDescription, setValueDescription] = useState('');

  const [jenisKelamin, setJenisKelamin] = useState(kos.jenis)

  const [selectedFrontPhoto, setSelectedFrontPhoto] = useState();
  const [previewFrontPhoto, setPreviewFrontPhoto] = useState();

  const [selectedFrontFarPhoto, setSelectedFrontFarPhoto] = useState();
  const [previewFrontFarPhoto, setPreviewFarRoadPhoto] = useState();

  const handleSetelahnya = (e) => {
    e.preventDefault();

    setError({});
    let failed = false;

    const nama = formRef.current.nama.value;
    const deskripsi = valueDescription;
    const tahun = formRef.current.tahun.value;
    const { Putra, Putri, Campur } = jenisKelamin;
    const fotoDepan = selectedFrontPhoto;
    const fotoDepanJauh = selectedFrontFarPhoto;

    console.log(deskripsi)

    if (fotoDepan === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDepan: "Foto depan tidak boleh kosong!",
      }));
    } else {
      if (!imgAllow.includes(fotoDepan.type)) {
        failed = true;
        setError((error) => ({
          ...error,
          fotoDepan: "Foto depan bukan gambar yang didukung!",
        }));
      }
    }

    if (fotoDepanJauh === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDepanJauh: "Foto depan tidak boleh kosong!",
      }));
    } else {
      if (!imgAllow.includes(fotoDepanJauh.type)) {
        failed = true;
        setError((error) => ({
          ...error,
          fotoDepanJauh: "Foto depan bukan gambar yang didukung!",
        }));
      }
    }

    if (Putra === undefined && Putri === undefined && Campur === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        jenis: "Jenis kos tidak boleh kosong!",
      }));
    }

    if (tahun === "") {
      failed = true;
      setError((error) => ({
        ...error,
        tahun: "Tahun kos tidak boleh kosong!",
      }));
    } else {
      if (!/[0-9]/i.test(tahun)) {
        failed = true;
        setError((error) => ({
          ...error,
          tahun: "Tahun kos harus angka!",
        }));
      }
    }

    if (deskripsi === "" || deskripsi === "<p><br></p>") {
      failed = true;
      setError((error) => ({
        ...error,
        deskripsi: "Deskripsi kos tidak boleh kosong!",
      }));
    }

    if (nama === "") {
      failed = true;
      setError((error) => ({ ...error, nama: "Nama kos tidak boleh kosong!" }));
    }

    if (failed) {
      return;
    }

    const payload = {
      nama: nama,
      deskripsi: deskripsi,
      jenis: {
        Putra: Putra,
        Putri: Putri,
        Campur: Campur,
      },
      fotoDepan: fotoDepan,
      fotoDepanJauh: fotoDepanJauh,
      tahun: tahun,
    };

    dispatch(submitForm(payload));

    let newKey = 2;
    if(kos.progress < 2) {
      dispatch(setProgress(2));
    }
    setKeynya(newKey);
  };

  const handleJenisChange = (tipe) => {
    let temp = {
      Putra: false,
      Putri: false,
      Campur: false
    }

    temp[tipe] = true

    setJenisKelamin(temp)
  }

  const changeFrontPhotoHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoDepan: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFrontPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDepan: "Foto de bukan gambar yang didukung!",
      }));
    }
    if (failed) {
      return;
    }

    setSelectedFrontPhoto(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFrontPhoto) {
      setPreviewFrontPhoto(undefined);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedFrontPhoto);
    setPreviewFrontPhoto(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFrontPhoto]);

  const changeFrontFarPhotoHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoDepanJauh: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFrontFarPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDepanJauh: "Foto bukan gambar yang didukung!",
      }));
    }
    if (failed) {
      return;
    }

    setSelectedFrontFarPhoto(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFrontFarPhoto) {
      setSelectedFrontFarPhoto(undefined);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedFrontFarPhoto);
    setPreviewFarRoadPhoto(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFrontFarPhoto]);

  return (
    <>
      <h1 className="text-center">Data Kos</h1>
      <h3 className="text-center">Mari lengkapi data kos</h3>
      <Form onSubmit={handleSetelahnya} encType="multipart/form-data">
        <Row className="g-2 justify-content-center">
          <Col xs={12} lg={6}>
            <Form.Group className="mb-4" controlId="formBasicNama">
              <Form.Label className="w-100">Berikan nama kos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kos"
                defaultValue={kos.nama}
                ref={(ref) => (formRef.current.nama = ref)}
              />
              {error.hasOwnProperty("nama") && error.nama !== "" ? (
                <Form.Text className="text-danger">{error.nama}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicDeskripsi">
              <Form.Label className="w-100">Deskripsi</Form.Label>
              <ReactQuill
                className="mb-5 pb-3"
                theme="snow" 
                value={valueDescription}
                onChange={setValueDescription}
              />
              {error.hasOwnProperty("deskripsi") && error.deskripsi !== "" ? (
                <Form.Text className="text-danger">{error.deskripsi}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicJenisKelamin">
              <Form.Label className="w-100">Jenis Kelamin</Form.Label>
              <div className="w-100">
                <label className="me-2 cursor-pointer" htmlFor="jenisPutra">
                  <Card bg={(jenisKelamin && jenisKelamin.Putra === true) ? "outline-primary" : "none"} className="jenis-kelamin-card">
                    <h3>
                      <FontAwesomeIcon icon={faMale} />
                    </h3>
                    <p>Putra</p>
                  </Card>
                </label>
                <label className="me-2 cursor-pointer" htmlFor="jenisPutri">
                  <Card bg={(jenisKelamin && jenisKelamin.Putri === true) ? "outline-primary" : "none"} className="jenis-kelamin-card">
                    <h3>
                      <FontAwesomeIcon icon={faFemale} />
                    </h3>
                    <p>Putri</p>
                  </Card>
                </label>
                <label className="me-2 cursor-pointer" htmlFor="jenisCampur">
                  <Card bg={(jenisKelamin && jenisKelamin.Campur === true) ? "outline-primary" : "none"} className="jenis-kelamin-card">
                    <h3>
                      <FontAwesomeIcon icon={faUsers} />
                    </h3>
                    <p>Campur</p>
                  </Card>
                </label>
                <input type="radio" name="jenisKelamin" id="jenisPutra" hidden
                  checked={jenisKelamin.Putra === true}
                  onChange={e => handleJenisChange("Putra")}
                />
                <input type="radio" name="jenisKelamin" id="jenisPutri" hidden
                  checked={jenisKelamin.Putri === true}
                  onChange={e => handleJenisChange("Putri")}
                />
                <input type="radio" name="jenisKelamin" id="jenisCampur" hidden
                  checked={jenisKelamin.Campur === true}
                  onChange={e => handleJenisChange("Campur")}
                />
              </div>
              {error.hasOwnProperty("jenis") && error.jenis !== "" ? (
                <Form.Text className="text-danger">{error.jenis}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicDeskripsi">
              <Form.Label className="w-100">Foto Kos</Form.Label>
              {selectedFrontPhoto ? (
                <img
                  src={previewFrontPhoto}
                  className="rounded preview-photo"
                  alt="..."
                />
              ) : (
                <></>
              )}
              <Form.Control
                type="file"
                name="fotoDepan"
                onChange={changeFrontPhotoHandler}
                ref={(ref) => (formRef.current.fotoDepan = ref)}
              />
              <Form.Text>
                Upload foto dari depan kos dengan extensi ".png", ".jpg", atau
                ".jpeg"
              </Form.Text>
              <br />
              {error.hasOwnProperty("fotoDepan") && error.fotoDepan !== "" ? (
                <Form.Text className="text-danger">{error.fotoDepan}</Form.Text>
              ) : (
                ""
              )}
              <br />
              {error.hasOwnProperty("fotoDepanJalan") &&
                error.fotoDepanJalan !== "" ? (
                <Form.Text className="text-danger">
                  {error.fotoDepanJalan}
                </Form.Text>
              ) : (
                ""
              )}
              {selectedFrontFarPhoto ? (
                <img
                  src={previewFrontFarPhoto}
                  className="rounded preview-photo"
                  alt="..."
                />
              ) : (
                <></>
              )}
              <Form.Control
                type="file"
                className="mt-3"
                onChange={changeFrontFarPhotoHandler}
                ref={(ref) => (formRef.current.fotoDepanJauh = ref)}
              />
              <Form.Text>
                Upload foto dari jauh memperlihatkan seluruh bangunan kos dengan
                extensi ".png", ".jpg", atau ".jpeg"
              </Form.Text>
              <br />
              {error.hasOwnProperty("fotoDepanJauh") &&
                error.fotoDepanJauh !== "" ? (
                <Form.Text className="text-danger">
                  {error.fotoDepanJauh}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicNama">
              <Form.Label className="w-100">Tahun kos dibangun</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan tahun kos selesai dibangun"
                defaultValue={kos.tahun}
                ref={(ref) => (formRef.current.tahun = ref)}
              />
              {error.hasOwnProperty("tahun") && error.tahun !== "" ? (
                <Form.Text className="text-danger">{error.tahun}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
          <div className="w-100"></div>
          <Col xs={12} lg={6} className="d-flex">
            <Button variant="outline-warning" className="w-100 me-1" disabled>
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

export default DataKos;
