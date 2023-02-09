import { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProgress, submitForm } from "../../../store/slices/kosSlice";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const DataKamarKos = ({ setKeynya }) => {
  const dispatch = useDispatch();
  const fasilitasKamar = useSelector((state) => state.kos.fasilitasKamar);
  const fasilitasKamarMandi = useSelector((state) => state.kos.fasilitasKamarMandi);
  const kos = useSelector((state) => state.kos);

  const formRef = useRef({});
  const fasilitasKamarRef = useRef({});
  const fasilitasKamarMandiRef = useRef({});
  const [error, setError] = useState({});

  const [selectedFotoDalam, setSelectedFotoDalam] = useState();
  const [previewFotoDalam, setPreviewFotoDalam] = useState();

  const [selectedFotoKamarMandi, setSelectedFotoKamarMandi] = useState();
  const [previewFotoKamarMandi, setPreviewFotoKamarMandi] = useState();

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 4;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();

    setError({});
    let failed = false;

    const namaKamar = formRef.current.namaKamar.value;
    const ukuranKamar = formRef.current.ukuranKamar.value;
    const totalKamar = formRef.current.totalKamar.value;
    const ketersediaanKamar = formRef.current.ketersediaanKamar.value;
    const fotoDalamKamar = selectedFotoDalam;
    const fotoKamarMandi = selectedFotoKamarMandi;

    // Fasilitas kamar
    const airConditioner = fasilitasKamarRef.current[0].checked;
    const bantal = fasilitasKamarRef.current[1].checked;
    const kipasAngin = fasilitasKamarRef.current[2].checked;
    const lemariBaju = fasilitasKamarRef.current[3].checked;
    const jendela = fasilitasKamarRef.current[4].checked;
    const kasur = fasilitasKamarRef.current[5].checked;
    const televisi = fasilitasKamarRef.current[6].checked;
    const meja = fasilitasKamarRef.current[7].checked;
    const kursi = fasilitasKamarRef.current[8].checked;

    // Fasilitas kamar Mandi
    const kamarMandiLuar = fasilitasKamarMandiRef.current[0].checked;
    const toiletDuduk = fasilitasKamarMandiRef.current[1].checked;
    const pemanasAir = fasilitasKamarMandiRef.current[2].checked;
    const kamarMandiDalam = fasilitasKamarMandiRef.current[3].checked;
    const toiletJongkok = fasilitasKamarMandiRef.current[4].checked;
    const shower = fasilitasKamarMandiRef.current[5].checked;

    if (fotoDalamKamar === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDalamKamar: "Foto dalam kamar tidak boleh kosong!",
      }));
    } else {
      if (!imgAllow.includes(fotoDalamKamar.type)) {
        failed = true;
        setError((error) => ({
          ...error,
          fotoDalamKamar: "Foto dalam kamar bukan gambar yang didukung!",
        }));
      }
    }

    if (namaKamar === "") {
      failed = true;
      setError((error) => ({
        ...error,
        namaKamar: "Nama kamar tidak boleh kosong!",
      }));
    }

    if (ukuranKamar === "") {
      failed = true;
      setError((error) => ({
        ...error,
        ukuranKamar: "Ukuran kamar tidak boleh kosong!",
      }));
    }

    if (totalKamar === "") {
      failed = true;
      setError((error) => ({
        ...error,
        totalKamar: "Total kamar tidak boleh kosong!",
      }));
    } else {
      if (!/[0-9]/i.test(totalKamar)) {
        failed = true;
        setError((error) => ({
          ...error,
          totalKamar: "Total kamar harus angka!",
        }));
      }
    }

    if (ketersediaanKamar === "") {
      failed = true;
      setError((error) => ({
        ...error,
        ketersediaanKamar: "ketersediaan kamar tidak boleh kosong!",
      }));
    } else {
      if (!/[0-9]/i.test(ketersediaanKamar)) {
        failed = true;
        setError((error) => ({
          ...error,
          ketersediaanKamar: "Ketersediaan kamar harus angka!",
        }));
      } else {
        if (parseInt(totalKamar) < parseInt(ketersediaanKamar)) {
          failed = true;
          setError((error) => ({
            ...error,
            ketersediaanKamar: "ketersediaan kamar tidak boleh lebih dari total kamar!",
          }));
        }
      }
    }

    if (fotoDalamKamar === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDalamKamar: "Foto dalam kamar tidak boleh kosong!",
      }));
    } else {
      if (!imgAllow.includes(fotoDalamKamar.type)) {
        failed = true;
        setError((error) => ({
          ...error,
          fotoDalamKamar: "Foto dalam kamar bukan gambar yang didukung!",
        }));
      }
    }

    if (fotoKamarMandi === undefined) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoKamarMandi: "Foto kamar mandi tidak boleh kosong!",
      }));
    } else {
      if (!imgAllow.includes(fotoKamarMandi.type)) {
        failed = true;
        setError((error) => ({
          ...error,
          fotoKamarMandi: "Foto kamar mandi bukan gambar yang didukung!",
        }));
      }
    }

    if (failed) {
      return;
    }

    let payload = {
      namaKamar: namaKamar,
      ukuranKamar: ukuranKamar,
      totalKamar: totalKamar,
      fotoDalamKos: fotoDalamKamar,
      fotoKamarMandi: fotoKamarMandi,
      ketersediaanKamar: ketersediaanKamar,
      fasilitasKamar: {
        "Air Conditioner": airConditioner,
        Bantal: bantal,
        "Kipas Angin": kipasAngin,
        "Lemari Baju": lemariBaju,
        Jendela: jendela,
        Kasur: kasur,
        "Televisi (TV)": televisi,
        Meja: meja,
        Kursi: kursi,
      },
      fasilitasKamarMandi: {
        "Kamar Mandi Luar": kamarMandiLuar,
        "Toilet Duduk": toiletDuduk,
        "Pemanas Air": pemanasAir,
        "Kamar Mandi Dalam": kamarMandiDalam,
        "Toilet Jongkok": toiletJongkok,
        Shower: shower,
      },
    };

    dispatch(submitForm(payload));
    let newKey = 6;
    if (kos.progress < 6) {
      dispatch(setProgress(6));
    }
    setKeynya(newKey);
  };

  const changeFotoDalamHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoDalamKamar: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFotoDalam(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoDalamKamar: "Foto dalam kamar bukan gambar yang didukung!",
      }));
    }
    if (failed) {
      return;
    }

    setSelectedFotoDalam(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFotoDalam) {
      setPreviewFotoDalam(undefined);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedFotoDalam);
    setPreviewFotoDalam(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFotoDalam]);

  const changeFotoKamarMandiHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoKamarMandi: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFotoKamarMandi(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoKamarMandi: "Foto kamar mandi bukan gambar yang didukung!",
      }));
    }
    if (failed) {
      return;
    }

    setSelectedFotoKamarMandi(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFotoKamarMandi) {
      setPreviewFotoKamarMandi(undefined);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedFotoKamarMandi);
    setPreviewFotoKamarMandi(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFotoKamarMandi]);

  return (
    <>
      <h1 className="text-center">Data Kos</h1>
      <h3 className="text-center">Masukan data kamar kosanmu</h3>
      <Form onSubmit={handleSetelahnya}>
        <Row className="g-2 justify-content-center">
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3" controlId="formBasicNamaKamar">
              <Form.Label className="w-100">Nama Kamar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kamar"
                ref={(ref) => (formRef.current.namaKamar = ref)}
                defaultValue={kos.namaKamar}
              />
              {error.hasOwnProperty("namaKamar") && error.namaKamar !== "" ? (
                <Form.Text className="text-danger">{error.namaKamar}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicFotoKamar">
              <Form.Label className="w-100 mb-0">Foto Kamar Kos</Form.Label>
              {selectedFotoDalam ? (
                <img
                  src={previewFotoDalam}
                  className="rounded preview-photo"
                  alt="..."
                />
              ) : (
                <></>
              )}
              <Form.Control
                type="file"
                name="fotoDalamKamar"
                onChange={changeFotoDalamHandler}
                className="mt-3"
                ref={(ref) => (formRef.current.fotoDalamKamar = ref)}
              />
              <Form.Text>
                Upload Foto dalam kamar kos dengan extensi ".png", ".jpg", atau
                ".jpeg"
              </Form.Text>

              <br />
              {error.hasOwnProperty("fotoDalamKamar") &&
                error.fotoDalamKamar !== "" ? (
                <Form.Text className="text-danger">
                  {error.fotoDalamKamar}
                </Form.Text>
              ) : (
                ""
              )}
              {selectedFotoKamarMandi ? (
                <img
                  src={previewFotoKamarMandi}
                  className="rounded preview-photo"
                  alt="..."
                />
              ) : (
                <></>
              )}
              <Form.Control
                type="file"
                className="mt-3"
                onChange={changeFotoKamarMandiHandler}
                ref={(ref) => (formRef.current.fotoKamarMandi = ref)}
              />
              <Form.Text>
                Upload *foto kamar mandi (opsional) dengan extensi ".png",
                ".jpg", atau ".jpeg"
              </Form.Text>
              <br />
              {error.hasOwnProperty("fotoKamarMandi") &&
                error.fotoKamarMandi !== "" ? (
                <Form.Text className="text-danger">
                  {error.fotoKamarMandi}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUkuranKamar">
              <Form.Label className="w-100">Ukuran kamar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan ukuran kamar"
                ref={(ref) => (formRef.current.ukuranKamar = ref)}
                defaultValue={kos.ukuranKamar}
              />
              {error.hasOwnProperty("ukuranKamar") &&
                error.ukuranKamar !== "" ? (
                <Form.Text className="text-danger">
                  {error.ukuranKamar}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTotalKamar">
              <Form.Label className="w-100">Total kamar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan total kamar kos"
                ref={(ref) => (formRef.current.totalKamar = ref)}
                defaultValue={kos.totalKamar}
              />
              {error.hasOwnProperty("totalKamar") && error.totalKamar !== "" ? (
                <Form.Text className="text-danger">
                  {error.totalKamar}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicKetersediaanKamar">
              <Form.Label className="w-100">
                Ketersediaan jumlah kamar
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan ketersediaan jumlah kamar"
                ref={(ref) => (formRef.current.ketersediaanKamar = ref)}
                defaultValue={kos.ketersediaanKamar}
              />
              {error.hasOwnProperty("ketersediaanKamar") &&
                error.ketersediaanKamar !== "" ? (
                <Form.Text className="text-danger">
                  {error.ketersediaanKamar}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group
              className="mb-3 row row-cols-3 ms-1"
              controlId="formBasicCheckbox"
            >
              <Form.Label className="w-100 ps-0">Fasilitas kamar</Form.Label>
              {Object.keys(fasilitasKamar).map((el, i) => {
                return (
                  <Form.Check
                    className="mb-3"
                    type="checkbox"
                    label={el}
                    key={i}
                    defaultChecked={Object.values(fasilitasKamar)[i]}
                    ref={(ref) => (fasilitasKamarRef.current[i] = ref)}
                  />
                );
              })}

              {error.hasOwnProperty("fasilitasKamar") &&
                error.fasilitasKamar !== "" ? (
                <Form.Text className="text-danger">
                  {error.fasilitasKamar}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group
              className="mb-3 row row-cols-3 ms-1"
              controlId="formBasicCheckbox"
            >
              <Form.Label className="w-100 ps-0">
                Fasilitas kamar mandi
              </Form.Label>
              {Object.keys(fasilitasKamarMandi).map((el, i) => {
                return (
                  <Form.Check
                    className="mb-3"
                    type="checkbox"
                    label={el}
                    key={i}
                    defaultChecked={Object.values(fasilitasKamarMandi)[i]}
                    ref={(ref) => (fasilitasKamarMandiRef.current[i] = ref)}
                  />
                );
              })}

              {error.hasOwnProperty("fasilitasKamarMandi") &&
                error.fasilitasKamarMandi !== "" ? (
                <Form.Text className="text-danger">
                  {error.fasilitasKamarMandi}
                </Form.Text>
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

export default DataKamarKos;
