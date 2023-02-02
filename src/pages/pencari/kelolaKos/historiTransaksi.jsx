import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import CardHistoriTransaksi from "../../../components/cardHistoriTransaksi";
import NavbarComponent from "../../../components/navbar";
import ProfilMenuComponent from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";

export default function historiTransaksi() {
  return (
    <>
      <div className="d-none d-lg-block">
        <NavbarComponent routes={PencariRoutes} />
      </div>
      <Container className="mt-2">
        <Nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Home
              </a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href="/profile" className="text-decoration-none">
                User Pencari Kos
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Histori Transaksi
            </li>
          </ol>
        </Nav>
        <Row className="mt-5">
          <Col>
            <ProfilMenuComponent routes={PencariRoutes} />
          </Col>
          <Col xs={12} lg={9} className="border rounded mb-5">
            <h5 className="fw-bold mx-lg-5 mt-5">Histori Transaksi</h5>
            <CardHistoriTransaksi />
          </Col>
        </Row>
      </Container>
    </>
  );
}
