import React from "react";
import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import ProfilMenuComponent from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";

export default function EditProfile() {
  return (
    <>
      <div className="d-none d-lg-block">
        <NavbarComponent routes={PencariRoutes} />
      </div>
      <Container className="mt-2">
        <Nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Home
              </a>
            </li>
            <li class="breadcrumb-item">
              <a href="/profile" className="text-decoration-none">
                User Pencari Kos
              </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Informasi Personal
            </li>
          </ol>
        </Nav>
        <Row className="mt-md-5">
          <Col>
            <ProfilMenuComponent routes={PencariRoutes} />
          </Col>
          <Col xs={12} lg={9} className="border rounded">
            <Container className="m-md-5">
              <div className="d-flex justify-content-between mb-3 mt-3">
                
                <h6>
                  {" "}
                  <Link
                    to="/profile/informasi-personal"
                    className="text-decoration-none text-dark fw-bold"
                  >
                    Edit Profil
                  </Link>
                </h6>
                <h6>
                  {" "}
                  <Link
                    to="/profile/informasi-personal"
                    className="text-decoration-none primary fw-bold"
                  >
                    Save
                  </Link>
                </h6>
              </div>
              <div className="text-center">
                <img
                  src="/logo512.png"
                  className="rounded-circle border"
                  width="110"
                  height="110"
                  alt="..."
                />
                <br />
                {/* Ini harusnya button si, buat upload foto sementara ini dulu */}
                <h6>
                  {" "}
                  <Link
                    to="/profile/informasi-personal"
                    className="text-decoration-none primary fw-bold"
                  >
                    Edit foto
                  </Link>
                </h6>
              </div>

              <Form className="mt-5">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <small>Nama Lengkap</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukan nama lengkap"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <small>Nomor Handphone</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukan nomor handphonemu"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <small>Email</small>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukan email aktifmu"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <small>Tanggal Lahir</small>
                    </Form.Label>
                    <Form.Control type="date" placeholder="Enter email" />
                  </Form.Group>
                  {/* <Form.Group>
                    <Form.Label>
                      <small>Jenis Kelamin</small>
                    </Form.Label>
                    {["radio"].map((type) => (
                      <div key={`radio-${type}`} className="mb-3">
                        <Form.Check
                          label="Laki-laki"
                          name="jenisKelamin"
                          type={type}
                          id={`radio-${type}-1`}
                        />
                        <Form.Check
                          label="Perempuan"
                          name="jenisKelamin"
                          type={type}
                          id={`radio-${type}-2`}
                        />
                      </div>
                    ))}
                  </Form.Group> */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <small>Jenis Kelamin</small>
                    </Form.Label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="jenisKelamin"
                        id="lakilaki"
                      />
                      <label class="form-check-label" for="lakilaki">
                        <small>Laki-laki</small>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="jenisKelamin"
                        id="perempuan"
                        checked
                      />
                      <label class="form-check-label" for="perempuan">
                        <small>Perempuan</small>
                      </label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <small>Pekerjaan</small>
                    </Form.Label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pekerjaan"
                        id="mahasiswa"
                      />
                      <label class="form-check-label" for="mahasiswa">
                        <small>Mahasiswa</small>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pekerjaan"
                        id="karyawan"
                        checked
                      />
                      <label class="form-check-label" for="karyawan">
                        <small>Karyawan</small>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pekerjaan"
                        id="lainnya"
                        checked
                      />
                      <label class="form-check-label" for="lainnya">
                        Lainnya
                      </label>
                    </div>
                  </Form.Group>
                  {/* <Button variant="primary" type="submit">
                    Submit
                  </Button> */}
                </Form>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

