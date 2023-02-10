import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAddBookingByPencariMutation } from "../../../store/apis/transaksi";
import { rupiahFormat } from "../../../store/utils/format";

const PengajuanSewaKos = () => {
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.user.current)
  const transaksi = useSelector(state => state.transaksi)

  const [
    sewaHit,
    { isLoading, isSuccess, isError, error }
  ] = useAddBookingByPencariMutation()

  function handleSubmitSewa(e) {
    e.preventDefault()

    const profileId = token.profile_id
    const roomId = transaksi.room_id
    const priceId = transaksi.price_id
    const timeNow = new Date(transaksi.check_in).toISOString()

    const formdata = new FormData(e.target)

    formdata.append('check_in', timeNow)
    formdata.append('price_id', priceId)

    sewaHit({ body: formdata, profileId: profileId, roomId: roomId })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/pengajuan-sewa/2')
    }

    if (isError) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <>
      <Container>
        <Button variant="none" as={Link} to='/'>
          <div className="my-3 d-flex align-items-center h-100">
            <FontAwesomeIcon icon={faAngleLeft} />
            <h6 className="ms-sm-2 my-auto">Kembali</h6>
          </div>
        </Button>
        <Row className="gx-5 gy-3">
          <Col xs={12}>
            <h2 className="text-center my-2">Pengajuan Sewa Kos</h2>
          </Col>
          <Col xs={12} lg={6}>
            <div className="w-75 mx-auto text-center">
              <img className="mb-3 img-fluid" src="/image5.png" alt="..." />
            </div>
            <div className="w-75 mx-auto">
              <h2>{transaksi.kost_name}</h2>
              <h5>{transaksi.room_name}</h5>
              <p>{transaksi.kost_address}</p>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <h4 className="fw-semibold">Informasi Penyewa</h4>
            <Form onSubmit={handleSubmitSewa}>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nama Penyewa</Form.Label>
                <Form.Control type="text" name="name" placeholder="Dion Kurniawan"
                  defaultValue={`${user.first_name} ${user.last_name}`}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select name="gender"
                  defaultValue={user.gender}
                >
                  <option value="MALE">Laki-Laki</option>
                  <option value="FEMALE">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Select name="job"
                  defaultValue={user.status}
                >
                  <option value="STUDENT">Mahasiswa</option>
                  <option value="WORKER">Pekerja</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nomor Handphone</Form.Label>
                <Form.Control type="text" name="phone_number" placeholder="0812xxxxxxxx"
                  defaultValue={user.phone_number}
                />
              </Form.Group>
              <hr className="mb-3" />
              <h4 className="fw-semibold">Pembayaran</h4>
              <Form.Group className="mb-3">
                <Form.Label className="w-100 mb-0">Tanggal mulai kos</Form.Label>
                <Form.Text className="fw-bold">{new Date(transaksi.check_in).toDateString()}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="w-100 mb-0">Durasi sewa kos</Form.Label>
                <Form.Text className="fw-bold">Per {transaksi.duration_type}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="w-100 fw-bold mb-0">Total Harga Sewa Kos</Form.Label>
                <Form.Label className="fw-bold">{rupiahFormat(parseInt(transaksi.price))}</Form.Label>
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Ajukan Sewa Kos Sekarang
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PengajuanSewaKos