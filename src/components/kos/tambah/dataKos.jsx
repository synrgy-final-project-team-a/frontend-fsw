import { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../../store/slices/kosSlice";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const DataKos = ({ setKeynya }) => {
  const dispatch = useDispatch();

  const kos = useSelector((state) => state.kos);

  const formRef = useRef({});
  const [error, setError] = useState({});

  const [selectedFrontPhoto, setSelectedFrontPhoto] = useState();
  const [previewFrontPhoto, setPreviewFrontPhoto] = useState();

  const [selectedFrontRoadPhoto, setSelectedFrontRoadPhoto] = useState();
  const [previewFrontRoadPhoto, setPreviewFrontRoadPhoto] = useState();

  const [selectedFrontFarPhoto, setSelectedFrontFarPhoto] = useState();
  const [previewFrontFarPhoto, setPreviewFarRoadPhoto] = useState();
  const handleSetelahnya = (e) => {
    e.preventDefault();

    setError({});
    let failed = false;

    const nama = formRef.current.nama.value;
    const deskripsi = formRef.current.deskripsi.value;
    const tahun = formRef.current.tahun.value;
    const putra = formRef.current.putra.checked;
    const putri = formRef.current.putri.checked;
    const campur = formRef.current.campur.checked;
    const fotoDepan = formRef.current.fotoDepan.files[0];
    const fotoDepanJalan = formRef.current.fotoDepanJalan.files[0];
    const fotoDepanJauh = formRef.current.fotoDepanJauh.files[0];

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

    if (fotoDepanJalan === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDepanJalan: "Foto depan tidak boleh kosong!",
      }));
    } else {
      if (!imgAllow.includes(fotoDepanJalan.type)) {
        failed = true;
        setError((error) => ({
          ...error,
          fotoDepanJalan: "Foto depan jalan bukan gambar yang didukung!",
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

    if (putra === false && putri === false && campur === false) {
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
    }

    if (deskripsi === "") {
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
      status:1,
      nama: nama,
      deskripsi: deskripsi,
      jenis: {
        Putra: putra,
        Putri: putri,
        Campur: campur,
      },
      foto: {
        fotoDepan: fotoDepan,
        fotoDepanJalan: fotoDepanJalan,
        fotoDepanJauh: fotoDepanJauh,
      },
      tahun: tahun,
    };

    dispatch(submitForm(payload));

    let newKey = 2;
    setKeynya(newKey);
  };

  const changeFrontPhotoHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoProfil: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFrontPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoProfil: "Foto profil bukan gambar yang didukung!",
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

  const changeFrontRoadPhotoHandler = (e) => {
    e.preventDefault();
  
    let failed = false;
    setError((error) => ({ ...error, fotoProfil: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFrontRoadPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoKos: "Foto bukan gambar yang didukung!",
      }));
    }
    if (failed) {
      return;
    }

    setSelectedFrontRoadPhoto(e.target.files[0]);
  };

  useEffect(() => {
   
    if (!selectedFrontRoadPhoto) {
      setPreviewFrontRoadPhoto(undefined);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedFrontRoadPhoto);
    setPreviewFrontRoadPhoto(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFrontRoadPhoto]);

  const changeFrontFarPhotoHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoProfil: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFrontFarPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoKos: "Foto bukan gambar yang didukung!",
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

            <Form.Group className="mb-4" controlId="formBasicDeskripsi">
              <Form.Label className="w-100">Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan deskripsi kos"
                defaultValue={kos.deskripsi}
                ref={(ref) => (formRef.current.deskripsi = ref)}
              />
              {error.hasOwnProperty("deskripsi") && error.deskripsi !== "" ? (
                <Form.Text className="text-danger">{error.deskripsi}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
              <Form.Label className="w-100">Jenis kos</Form.Label>
              <div className="d-flex">
                <Form.Check
                  className="w-100"
                  type="checkbox"
                  label="Putra"
                  defaultChecked={kos.jenis.Putra}
                  ref={(ref) => (formRef.current.putra = ref)}
                />
                <Form.Check
                  className="w-100"
                  type="checkbox"
                  label="Putri"
                  defaultChecked={kos.jenis.Putri}
                  ref={(ref) => (formRef.current.putri = ref)}
                />
                <Form.Check
                  className="w-100"
                  type="checkbox"
                  label="Campur"
                  defaultChecked={kos.jenis.Campur}
                  ref={(ref) => (formRef.current.campur = ref)}
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
              {selectedFrontRoadPhoto ? (
                <img
                  src={previewFrontRoadPhoto}
                  className="rounded preview-photo"
                  alt="..."
                />
              ) : (
                <></>
              )}
              <Form.Control
                type="file"
                className="mt-3"
                onChange={changeFrontRoadPhotoHandler}
                ref={(ref) => (formRef.current.fotoDepanJalan = ref)}
              />
              <Form.Text>
                Upload foto dari depan jalan kos dengan extensi ".png", ".jpg",
                atau ".jpeg"
              </Form.Text>
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
