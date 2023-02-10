import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PengajuanSewaKos = () => {
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.user.current)

  function handleSubmitSewa(e) {
    e.preventDefault()

    const profileId = token.profile_id
    const priceId = "14"
    const roomId = "3"
    const timeNow = new Date().toISOString()

    
  }

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
              <h2>Kos H.Turiman Banaran</h2>
              <h5>Tipe A</h5>
              <p>Jl. Banaran No.117, Banaran Sekarang Gunung Pati Semarang </p>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <h4 className="fw-semibold">Informasi Penyewa</h4>
            <Form onSubmit={handleSubmitSewa}>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nama Penyewa</Form.Label>
                <Form.Control type="text" placeholder="Dion Kurniawan"
                  defaultValue={`${user.first_name} ${user.last_name}`}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select
                  defaultValue={user.gender}
                >
                  <option value="MALE">Laki-Laki</option>
                  <option value="FEMALE">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Select
                  defaultValue={user.status}
                >
                  <option value="STUDENT">Mahasiswa</option>
                  <option value="WORKER">Pekerja</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nomor Handphone</Form.Label>
                <Form.Control type="text" placeholder="0812xxxxxxxx"
                  defaultValue={user.phone_number}
                />
              </Form.Group>
              <hr className="mb-3" />
              <h4 className="fw-semibold">Pembayaran</h4>
              <Form.Group className="mb-3">
                <Form.Label className="w-100 mb-0">Tanggal mulai kos</Form.Label>
                <Form.Text className="fw-bold">23 Februari 2023</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="w-100 mb-0">Durasi sewa kos</Form.Label>
                <Form.Text className="fw-bold">Per Bulan</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="w-100 fw-bold mb-0">Total Harga Sewa Kos</Form.Label>
                <Form.Label className="fw-bold">Rp.1.350.000</Form.Label>
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