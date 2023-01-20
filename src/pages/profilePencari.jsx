import React from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import NavbarComponent from "../components/navbar";
import PencariRoutes from "../routes/pencari";

export default function profilePencari() {
  return (
    <>
      <div className="d-none d-lg-flex">
        <NavbarComponent routes={PencariRoutes} />
      </div>
      <Row className="m-5">
        <Col xs={12} lg={3}>
          <div>
            <p className="fw-bold text-subtitle">Profile</p>
            <div className="d-flex">
              <img src="/login.png" className="rounded-circle me-2" width="50" height="50" alt="..." />
              <div>
                <p className="m-0">Dion Kurniaawan</p>
                <p>081212121212</p>
              </div>
            </div>
            <p>Identitas terverifikasi</p>
          </div>
          <div>
            <p className="fw-bold text-subtitle">Pengaturan akun</p>
            <p className="text">Informasi personal</p>
            <hr/>
            <p className="text">Histori transaksi</p>
            <hr/>
            <p className="text">Notifikasi</p>
            <hr/>
            <p className="text">Pengaturan</p>
            <hr/>
          </div>
          <div>
            <p className="fw-bold text-subtitle">Referensi</p>
            <p className="text">Undang Teman</p>
            <hr/>
          </div>
          <div>
            <p className="fw-bold text-subtitle">Support</p>
            <p className="text">Pertanyaan</p>
            <hr/>
            <p className="text">Feedback</p>
            <hr/>
          </div>
          <div>
            <p className="fw-bold text-subtitle">Logout</p>
          </div>
        </Col>
        <Col xs={12} lg={9} className="border rounded justify-content-center">
          {/* <img src="/login.png" className="img-fluid" alt="..." /> */}
        </Col>
      </Row>
    </>
  );
}
