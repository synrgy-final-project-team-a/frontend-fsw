import React from "react";
import { Container, Nav, Card, Badge, Row, Col } from "react-bootstrap";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import Whishlist from "../../../components/whishlist"
import RecomendationKos from "../../../components/recomendationKos"

export default function Favorite() {
  return (
    <>
      <NavbarComponent routes={PencariRoutes} />
      <Container className="my-3">
        <Nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Home
              </a>
            </li>
            <li class="breadcrumb-item" aria-current="page">
              User Pencari Kos
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <a href="/favorit" className="text-decoration-none">
                Favorite
              </a>
            </li>
          </ol>
        </Nav>
        <div>
          <Whishlist/>
        </div>
        <div className="mt-5">
          <RecomendationKos />
        </div>
      </Container>
    </>
  );
}
