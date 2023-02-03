import React from "react";
import { Container, Breadcrumb, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PenyewaLayout from "../../../layouts/penyewa.layout";
import EditFoto from "../../../components/kos/editFoto";

export default function Edit() {
  const facility = useSelector((state) => state.kos.fasilitas);

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 2;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();
    let newKey = 4;
    setKeynya(newKey);
  };
  return (
    <PenyewaLayout>
      <Container>
        <Breadcrumb className="mt-2">
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/", className: "text-decoration-none" }}
          >
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/kos", className: "text-decoration-none" }}
          >
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Kos</Breadcrumb.Item>
        </Breadcrumb>
        <Form className="border rounded px-3 px-lg-5">
          <div className="d-flex justify-content-between align-items-center mt-5">
            <h6 className="fw-bold">Edit Informasi Kos</h6>
            <Button variant="outline-primary" type="submit">
              Simpan
            </Button>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <img
                src="/logo512.png"
                className="rounded-circle border profile-picture"
                alt="..."
                width={120}
                height={120}
              />
            </div>
            <div className="mx-3">
              <p className="fw-bold">Informasi Pemilik Kos</p>
              {/* <p className="fw-bold p-0 m-0">Nama Pemilik Kos :</p> */}
              <p className="p-0 m-0">
                <small>Agus mendoan</small>
              </p>
              {/* <p className="fw-bold p-0 m-0">
                <small>Email :</small>
              </p> */}
              <p className="p-0 m-0">
                <small>tennant@mail.com</small>
              </p>
              {/* <p className="fw-bold p-0 m-0">
                <small>Nomor Telphone :</small>
              </p> */}
              <p className="p-0 m-0">
                <small>0812121212</small>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Form.Group className="mb-4">
              <Form.Label>Nama Kos</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukan nama depan"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>PIC</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Nomor Telephon PIC</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Nama Kos</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Catatan</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>

            <EditFoto />

            <Form.Group className="mb-4">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Kota</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Alamat</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Google Maps</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Catatan detail alamat</Form.Label>
              <Form.Control type="text" placeholder="Masukan nama depan" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Aturan</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Masukan nama depan"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
              onSubmit={handleSetelahnya}
            >
              <Form.Label>Fasilitas</Form.Label>
              <br />
              {Object.keys(facility).map((el, i) => {
                return (
                  <Form.Check
                    className="mb-3"
                    type="checkbox"
                    label={el.text}
                    key={i}
                  />
                );
              })}
            </Form.Group>
          </div>
        </Form>
      </Container>
    </PenyewaLayout>
  );
}
