import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInsertKostByPenyewaMutation, useInsertRoomByPenyewaMutation } from "../../../store/apis/kos";
import { emptyKos, submitForm } from "../../../store/slices/kosSlice";
import { rupiahFormat } from "../../../store/utils/format";

const PreviewKos = ({ setKeynya }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const kos = useSelector((state) => state.kos);
  const profileId = useSelector((state) => state.auth.token.profile_id);

  const [previewFrontPhoto, setPreviewFrontPhoto] = useState();
  const [previewFrontFarPhoto, setPreviewFarRoadPhoto] = useState();
  const [previewFotoDalam, setPreviewFotoDalam] = useState();
  const [previewFotoKamarMandi, setPreviewFotoKamarMandi] = useState();

  const [
    insertKosHit,
    { isLoading: loadingKos, isSuccess: successKos, isError: errorKos, data: dataKos, error: errorsKos }
  ] = useInsertKostByPenyewaMutation()

  const [
    insertRoomHit,
    { isLoading: loadingRoom, isSuccess: successRoom, isError: errorRoom, error: errorsRoom }
  ] = useInsertRoomByPenyewaMutation()

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 6;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();

    let confirm = window.confirm("Apakah anda yakin?")

    if (!confirm) {
      return
    }

    let formdata = new FormData()

    formdata.append('kostName', kos.nama)
    formdata.append('description', kos.deskripsi)
    formdata.append('kostTypeMan', kos.jenis.Putra)
    formdata.append('kostTypeWoman', kos.jenis.Putri)
    formdata.append('kostTypeMixed', kos.jenis.Campur)
    formdata.append('frontBuildingPhoto', kos.fotoDepan)
    formdata.append('frontFarbuildingPhoto', kos.fotoDepanJauh)
    formdata.append('yearSince', kos.tahun)
    formdata.append('province', kos.provinsi)
    formdata.append('city', kos.kota)
    formdata.append('address', kos.alamat)
    formdata.append('gmaps', "-")
    formdata.append("restrictedNight", kos.peraturan["Ada jam malam"])
    formdata.append("identityCard", kos.peraturan["Wajib sertakan KTP saat pengajuan sewa"])
    formdata.append("restrictedGender", kos.peraturan["Lawan jenis dilarang ke kamar"])
    formdata.append("restrictedGuest", kos.peraturan["Tamu dilarang menginap"])
    formdata.append("maximumOne", kos.peraturan["Maks. 1 orang / kamar"])
    formdata.append("maximumTwo", kos.peraturan["Maks. 2 orang / kamar"])
    formdata.append("restrictedCheckout", kos.peraturan["Check out maks. pukul 12:00 (sewa harian)"])
    formdata.append("restrictedCheckin", kos.peraturan["Check in pukul 14:00-21:00 (sewa harian)"])
    formdata.append("includeElectricity", kos.peraturan["Termasuk listrik"])
    formdata.append("noSmoking", kos.peraturan["Dilarang merokok di kamar"])
    formdata.append("enabled", false)
    formdata.append("kostTv", kos.fasilitas["Televisi (TV)"])
    formdata.append("electric", kos.fasilitas["Listrik"])
    formdata.append("laundry", kos.fasilitas["Laundry"])
    formdata.append("refrigerator", kos.fasilitas["Kulkas"])
    formdata.append("water", kos.fasilitas["Air"])
    formdata.append("wifi", kos.fasilitas["Wifi"])
    formdata.append("dispenser", kos.fasilitas["Dispenser"])
    formdata.append("drying_ground", kos.fasilitas["Ruang Jemur"])
    formdata.append("kitchen", kos.fasilitas["Dapur"])
    formdata.append("livingRoom", kos.fasilitas["Ruang Tamu"])
    formdata.append("parkingMotorcycle", kos.fasilitas["Parkir Motor"])
    formdata.append("parkingCar", kos.fasilitas["Parkir Mobil"])

    insertKosHit({ idProfile: profileId, body: formdata })
  };

  useEffect(() => {
    if (successKos) {
      let kostId = dataKos.data.id
      let formdata = new FormData()

      formdata.append('roomName', kos.namaKamar)
      formdata.append('insideRoomPhoto', kos.fotoDalamKos)
      formdata.append('otherRoomPhoto', kos.fotoKamarMandi)
      formdata.append('quantityRoom', kos.totalKamar)
      formdata.append('availableRoom', kos.ketersediaanKamar)
      formdata.append('sizeRoom', kos.ukuranKamar)
      formdata.append('ac', kos.fasilitasKamar["Air Conditioner"])
      formdata.append('pillow', kos.fasilitasKamar["Bantal"])
      formdata.append('fan', kos.fasilitasKamar["Kipas Angin"])
      formdata.append('furniture', kos.fasilitasKamar["Lemari Baju"])
      formdata.append('shower', kos.fasilitasKamarMandi["Shower"])
      formdata.append('sittingCloset', kos.fasilitasKamarMandi["Toilet Duduk"])
      formdata.append('springBed', kos.fasilitasKamar["Kasur"])
      formdata.append('tableLearning', kos.fasilitasKamar["Meja"])
      formdata.append('waterHeater', kos.fasilitasKamarMandi["Pemanas Air"])
      formdata.append('insideBathroom', kos.fasilitasKamarMandi["Kamar Mandi Dalam"])
      formdata.append('nonSittingCloset', kos.fasilitasKamarMandi["Toilet Jongkok"])
      formdata.append('outsideBathroom', kos.fasilitasKamarMandi["Kamar Mandi Luar"])
      formdata.append('windows', kos.fasilitasKamar["Jendela"])
      formdata.append('chair', kos.fasilitasKamar["Kursi"])
      formdata.append('roomTv', kos.fasilitasKamar["Televisi (TV)"])
      formdata.append('priceDaily', kos.harga["harian"])
      formdata.append('priceWeekly', kos.harga["mingguan"])
      formdata.append('priceMonthly', kos.harga["bulanan"])
      formdata.append('priceQuarter', kos.harga["3 bulanan"])
      formdata.append('priceSemester', kos.harga["6 bulanan"])
      formdata.append('priceYearly', kos.harga["tahunan"])

      insertRoomHit({ idKost: kostId, body: formdata })
    }

    if (errorKos) {
      console.log(errorsKos)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingKos])

  useEffect(() => {
    if (successRoom) {
      let payload = {
        submitted: true
      }

      dispatch(submitForm(payload));
      dispatch(emptyKos())
      alert("Berhasil menambahkan kos!")
      navigate('/penyewa/kos')
    }

    if (errorRoom) {
      console.log(errorsRoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingRoom])

  useEffect(() => {
    let objectUrl
    if (kos.fotoDepan instanceof File) {
      objectUrl = URL.createObjectURL(kos.fotoDepan);
      setPreviewFrontPhoto(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [kos.fotoDepan])

  useEffect(() => {
    let objectUrl
    if (kos.fotoDepanJauh instanceof File) {
      objectUrl = URL.createObjectURL(kos.fotoDepanJauh);
      setPreviewFarRoadPhoto(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [kos.fotoDepanJauh])

  useEffect(() => {
    let objectUrl
    if (kos.fotoDalamKos instanceof File) {
      objectUrl = URL.createObjectURL(kos.fotoDalamKos);
      setPreviewFotoDalam(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [kos.fotoDalamKos])

  useEffect(() => {
    let objectUrl
    if (kos.fotoKamarMandi instanceof File) {
      objectUrl = URL.createObjectURL(kos.fotoKamarMandi);
      setPreviewFotoKamarMandi(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [kos.fotoKamarMandi])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <h1 className="text-center">Preview</h1>
          <h3 className="text-center">
            Silahkan cek terlebih dahulu sebelum menampilkan kos di aplikasi.
          </h3>
          <Row className="my-3">
            <h3 className="fw-bold">Data Kos</h3>
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Nama Kos </h4>
            </Col>
            <Col xs={6} lg={8}>
              <h4>{kos.nama} </h4>
            </Col>
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Deskripsi</h4>
            </Col>
            <Col xs={6} lg={8} dangerouslySetInnerHTML={{ __html: kos.deskripsi }} />
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Tipe Kos</h4>
            </Col>
            <Col xs={6} lg={8}>
              {Object.values(kos.jenis).map((el, index) => {
                if (el === true) {
                  return <h4 key={index}>{Object.keys(kos.jenis)[index]} </h4>;
                } else {
                  return ""
                }
              })}
            </Col>
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Tahun</h4>
            </Col>
            <Col xs={6} lg={8}>
              <h4>{kos.tahun}</h4>
            </Col>
          </Row>
          <hr />
          <Row className="my-3">
            <h3 className="fw-bold">Alamat Kos</h3>
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Provinsi</h4>
            </Col>
            <Col xs={6} lg={8}>
              <h4>{kos.provinsi}</h4>
            </Col>
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Kota</h4>
            </Col>
            <Col xs={6} lg={8}>
              <h4>{kos.kota}</h4>
            </Col>
            <Col xs={6} lg={3}>
              <h4 className="text-muted">Alamat</h4>
            </Col>
            <Col xs={6} lg={8}>
              <h5>{kos.alamat}</h5>
            </Col>
          </Row>
          <hr />
          <div className="my-3">
            <h3 className="fw-bold">Peraturan Kos</h3>
            <ul>
              <div className="row row-cols-xs-1 row-cols-lg-2">
                {Object.values(kos.peraturan).map((el, index) => {
                  if (el === true) {
                    return (
                      <li key={index}>
                        <h5>{Object.keys(kos.peraturan)[index]}</h5>
                      </li>
                    );
                  } else {
                    return ""
                  }
                })}
              </div>
            </ul>
          </div>
          <hr />
          <div className="my-3">
            <h3 className="fw-bold">Fasilitas Kos </h3>
            <ul>
              <div className="row row-cols-xs-1 row-cols-lg-2">
                {Object.values(kos.fasilitas).map((el, index) => {
                  if (el === true) {
                    return (
                      <li key={index}>
                        <h5>{Object.keys(kos.fasilitas)[index]}</h5>
                      </li>
                    );
                  } else {
                    return ""
                  }
                })}
              </div>
            </ul>
          </div>
          <hr />
          <div>
            <h3 className="fw-bold">Gambar Bangunan Kos</h3>
            <Row>
              <Col>
                <img src={previewFrontPhoto} className="img-fluid" alt="..." />
              </Col>
              <Col>
                <img src={previewFrontFarPhoto} className="img-fluid" alt="..." />
              </Col>
            </Row>
          </div>
          <hr />
          <div>
            <h3 className="fw-bold">Data Kamar </h3>
            <Row>
              <Col xs={6} lg={3}>
                <h4 className="text-muted">Nama Kamar </h4>
              </Col>
              <Col xs={6} lg={8}>
                <h4>{kos.namaKamar} </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} lg={3}>
                <h4 className="text-muted">Ukuran kamar </h4>
              </Col>
              <Col xs={6} lg={8}>
                <h4>{kos.ukuranKamar} </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} lg={3}>
                <h4 className="text-muted">Total kamar </h4>
              </Col>
              <Col xs={6} lg={8}>
                <h4>{kos.totalKamar} </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} lg={3}>
                <h4 className="text-muted">kamar tersedia </h4>
              </Col>
              <Col xs={6} lg={8}>
                <h4>{kos.ketersediaanKamar} </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} lg={3}>
                <h4 className="text-muted">Harga</h4>
              </Col>
              <Col xs={6} lg={8}>
                {Object.keys(kos.harga).map((el, index) => {
                  if (kos.harga[el] !== 0) {
                    return (
                      <h4 key={index}>{rupiahFormat(kos.harga[el])} / {el}</h4>
                    );
                  } else {
                    return ""
                  }
                })}

              </Col>
            </Row>
          </div>
          <hr />
          <div>
            <h3 className="fw-bold">Fasilitas Kamar </h3>
            <ul>
              <div className="row row-cols-lg-2 row-cols-1">
                {Object.values(kos.fasilitasKamar).map((el, index) => {
                  if (el === true) {
                    return (
                      <li key={index}>
                        <h5>{Object.keys(kos.fasilitasKamar)[index]}</h5>
                      </li>
                    );
                  } else {
                    return ""
                  }
                })}
              </div>
            </ul>
          </div>
          <div>
            <h3 className="fw-bold">Fasilitas Kamar Mandi </h3>
            <ul>
              <div className="row row-cols-lg-2 row-cols-1">
                {Object.values(kos.fasilitasKamarMandi).map((el, index) => {
                  if (el === true) {
                    return (
                      <li key={index}>
                        <h5>{Object.keys(kos.fasilitasKamarMandi)[index]}</h5>
                      </li>
                    );
                  } else {
                    return ""
                  }
                })}
              </div>
            </ul>
          </div>
          <div>
            <h3 className="fw-bold">Gambar Kamar Kos </h3>
            <div className="row row-cols-2">
              <img src={previewFotoDalam} className="img-fluid" alt="..." />
              <img src={previewFotoKamarMandi} className="img-fluid" alt="..." />
            </div>
          </div>
        </Col>
        <Col xs={12} lg={8} className="d-flex mt-3">
          <Button
            variant="outline-warning"
            className="w-100 me-1"
            disabled={loadingKos || loadingRoom}
            onClick={handleSebelumnya}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline-primary"
            className="w-100 ms-1"
            onClick={handleSetelahnya}
            disabled={loadingKos || loadingRoom}
          >
            Selanjutnya
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PreviewKos;
