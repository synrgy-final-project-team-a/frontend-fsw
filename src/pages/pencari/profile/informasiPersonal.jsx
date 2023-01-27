import React, { useEffect } from "react";
import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import ProfilMenuComponent from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUserMutation } from "../../../store/apis/users";
import { addUser } from "../../../store/slices/userSlice";

export default function InformasiPersonal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    currentUserHit,
    { isLoading: isLoadingUser, isSuccess: isSuccessUser, data: dataUser },
  ] = useCurrentUserMutation();

  const token = useSelector((state) => {
    return state.auth.token;
  });
  const userData = useSelector((state) => {
    return state.user.current;
  });

  useEffect(() => {
    if (!token.access_token) {
      return navigate("/login");
    }

    try {
      currentUserHit(token.access_token);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(addUser(dataUser.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser]);

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
            <li className="breadcrumb-item">
              <a href="/profile" className="text-decoration-none">
                User Pencari Kos
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Informasi Personal
            </li>
          </ol>
        </Nav>
        <Row className="mt-md-5 ">
          <Col className="mb-3">
            <ProfilMenuComponent routes={PencariRoutes} />
          </Col>
          <Col xs={12} lg={9} className="border rounded">
            <Container>
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold m-5">Informasi Personal</h6>
              </div>
              <div className="text-center">
                {userData.avatar !== null ? (
                  <>
                    <img
                      src={userData.avatar}
                      className="rounded-circle border"
                      width="110"
                      height="110"
                      alt="..."
                    />
                  </>
                ) : (
                  <>
                    <img
                      src="/logo512.png"
                      className="rounded-circle border"
                      width="110"
                      height="110"
                      alt="..."
                    />
                  </>
                )}

                <br />
                <h6 className="mt-2">
                  {" "}
                  <Link
                    to="/profile/edit-profile"
                    className="text-decoration-none primary fw-bold"
                  >
                    Edit profile
                  </Link>
                </h6>
              </div>

              <Form className="mt-5 m-lg-5">
                <Form.Group
                  className="mb-3 border-0"
                  controlId="formBasicEmail"
                >
                  <Form.Label>
                    <small>Nama Lengkap</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama lengkap"
                    readOnly
                    value={userData.first_name + " " + userData.last_name}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Nomor Handphone</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nomor handphonemu"
                    readOnly
                    value={userData.phone_number}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Email</small>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukan email aktifmu"
                    readOnly
                    value={userData.email}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Alamat</small>
                  </Form.Label>
                  <Form.Control type="text" readOnly value={userData.address} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Kota</small>
                  </Form.Label>
                  <Form.Control type="text" readOnly value={userData.city} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Provinsi</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={userData.province}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Jenis Kelamin</small>
                  </Form.Label>
                  <Form.Control type="text" readOnly value={userData.gender} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Google Maps</small>
                  </Form.Label>
                  <Form.Control type="text" readOnly value={userData.gmaps} />
                </Form.Group>
                {/* <Button variant="primary" type="submit">
                    Submit
                  </Button> */}
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
