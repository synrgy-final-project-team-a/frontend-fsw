import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


export default function editFoto() {
  return (
    <Row className="mb-2">
      <Form.Label>Foto Kos</Form.Label>
      {/* foto bangunan */}
      <Col xs={12} lg={4} className="mt-4">
        <div className="img-hover">
          <img src="/image16.png" alt="Avatar" className="image" />
          <div className="middle">
            <label
              //   htmlFor="profile-picture-upload"
              className="text-decoration-none text-primary fw-bold cursor-pointer bg-white py-1 px-2 rounded-4"
            >
              <FontAwesomeIcon icon={faImage} className="px-1" />
              <small>Edit foto</small>
            </label>
            <input
              //   id="profile-picture-upload"
              type="file"
              //   onChange={changeProfileHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p className="text-center">
          <small>Foto bangunan kos dari depan</small>
        </p>
      </Col>
      {/* foto jalan */}
      <Col xs={12} lg={4} className="mt-4">
        <div className="img-hover">
          <img src="/image16.png" alt="Avatar" className="image" />
          <div className="middle">
            <label
              //   htmlFor="profile-picture-upload"
              className="text-decoration-none text-primary fw-bold cursor-pointer bg-white py-1 px-2 rounded-4"
            >
              <FontAwesomeIcon icon={faImage} className="px-1" />
              <small>Edit foto</small>
            </label>
            <input
              //   id="profile-picture-upload"
              type="file"
              //   onChange={changeProfileHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p className="text-center">
          <small>Foto dari depan jalan kos</small>
        </p>
      </Col>
      {/* foto dari jauh */}
      <Col xs={12} lg={4} className="mt-4">
        <div className="img-hover">
          <img src="/image16.png" alt="Avatar" className="image" />
          <div className="middle">
            <label
              //   htmlFor="profile-picture-upload"
              className="text-decoration-none text-primary fw-bold cursor-pointer bg-white py-1 px-2 rounded-4"
            >
              <FontAwesomeIcon icon={faImage} className="px-1" />
              <small>Edit foto</small>
            </label>
            <input
              //   id="profile-picture-upload"
              type="file"
              //   onChange={changeProfileHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p className="text-center">
          <small>Foto seluruh bangunan kos dari jauh</small>
        </p>
      </Col>
    </Row>
  );
}
