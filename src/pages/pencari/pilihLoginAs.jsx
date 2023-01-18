import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

export default function () {
  return (
    <Container className="mt-5">
      <h1 className="text-center text-title">Login Yuk</h1>
      <p className="text-center text-subtitle">
        Saya ingin login sebagai
      </p>
      <Row className="mt-5 align-items-center">
        <Col className="col ms-5">
          <img src="./pencari.png" alt="..." />
          <p className="text-subtitle">Pencari Kos</p>
        </Col>
        {/* <Col className="vertical-line"></Col> */}
        <Col className="col ms-5">
          <img src="./penyewa.png" alt="..." />
          <p className="text-subtitle">Penyedia Kos</p>
        </Col>
      </Row>
    </Container>
  )
}
