import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import CardKelolaKos from "../../../components/cardKelolaKosPencari";
import NavbarComponent from "../../../components/navbar";
import ProfilMenuComponent from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";

export default function kelolaKos() {
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
            <li class="breadcrumb-item" aria-current="page">
              <a href="/profile" className="text-decoration-none">
                User Pencari Kos
              </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Kelola Kos
            </li>
          </ol>
        </Nav>
        <Row className="mt-5">
          <Col>
            <ProfilMenuComponent routes={PencariRoutes} />
          </Col>
          <Col xs={12} lg={9} className="border rounded mb-5">
            <h5 className="fw-bold mx-lg-5 mt-5">Kelola Kos</h5>
            <CardKelolaKos />
          </Col>
        </Row>
      </Container>
    </>
  );
}
