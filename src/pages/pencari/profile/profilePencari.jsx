import React from "react";
import { useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import ProfilMenuComponent from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";

export default function ProfilePencari() {
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {
    if (!token.access_token) {
      return navigate("/login");
    }
    if (token.role[0] !== "ROLE_SK") {
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            <li class="breadcrumb-item active" aria-current="page">
              User Pencari Kos
            </li>
          </ol>
        </Nav>
        <Row className="mt-5">
          <Col>
            <ProfilMenuComponent routes={PencariRoutes} />
          </Col>
          <Col
            xs={12}
            lg={9}
            className="text-center border rounded d-none d-lg-flex"
          >
            <img src="/pencari.png" className="img-fluid" alt="..." />
          </Col>
        </Row>
      </Container>
    </>
  );
}
