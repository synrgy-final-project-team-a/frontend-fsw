import React from "react";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import ProfilMenuComponent from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { useEditUserMutation } from "../../../store/apis/users";
import { useState } from "react";

export default function EditProfile() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("");
  const [
    editUserHit,
    { isLoading: isLoadingEditUser, isSuccess: isSuccessEditUser },
  ] = useEditUserMutation();

  const userData = useSelector((state) => {
    return state.user.current;
  });

  const token = useSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {

    if (userData) {
      setAvatar(userData.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formRef = useRef({});

  const handleSubmitEditProfile = async (e) => {
    const email = formRef.current.email.value;
    const first_name = formRef.current.first_name.value;
    const last_name = formRef.current.last_name.value;
    const phone_number = formRef.current.phone_number.value;
    const address = formRef.current.address.value;
    const city = formRef.current.city.value;
    const province = formRef.current.province.value;
    const gender = formRef.current.gender.value;
    const gmaps = formRef.current.gmaps.value;

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("phone_number", phone_number);
    formdata.append("address", address);
    formdata.append("city", city);
    formdata.append("province", province);
    formdata.append("gender", gender);
    formdata.append("gmaps", gmaps);
    formdata.append("avatar", file);
    // for (var pair of formdata.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    console.log("1");
    try {
      editUserHit({ body: formdata, token: token.access_token });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccessEditUser) {
      navigate("/profile/informasi-personal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingEditUser]);

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
            <Container>
              <div className="d-flex justify-content-between m-5">
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
                  {isLoadingEditUser ? (
                    <Button
                      className="text-decoration-none primary fw-bold"
                      disabled
                    >
                      . . .
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => handleSubmitEditProfile(e)}
                      className="text-decoration-none primary fw-bold"
                    >
                      Save
                    </Button>
                  )}
                </h6>
              </div>
              <div className="text-center">
                <label>
                  {!file ? (
                    <img
                      src={avatar}
                      className="rounded-circle border"
                      width="110"
                      height="110"
                      alt="..."
                    />
                  ) : (
                    <p>{file.name}</p>
                  )}
                </label>
                <h6>
                  {" "}
                  <button
                    type="button"
                    className="text-decoration-none primary fw-bold my-2 "
                    style={{ backgroundColor: "white" }}
                    onClick={() => formRef.current.file.click()}
                  >
                    Edit foto
                  </button>
                </h6>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  hidden={true}
                  ref={(ref) => (formRef.current.file = ref)}
                  onChange={(e) => setFile(e.target.files[0])}
                  multiple
                />
                <br />
                {/* Ini harusnya button si, buat upload foto sementara ini dulu */}
                {/* <h6>
                  {" "}
                  <Link
                    to="/profile/informasi-personal"
                    className="text-decoration-none primary fw-bold"
                  >
                    Edit foto
                  </Link>
                </h6> */}
              </div>

              <Form className="mt-5 m-lg-5">
                <Form.Group
                  className="mb-3 border-0"
                  controlId="formBasicEmail"
                >
                  <Form.Label>
                    <small>Nama Depan</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama lengkap"
                    ref={(ref) => (formRef.current.first_name = ref)}
                    defaultValue={userData.first_name}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 border-0"
                  controlId="formBasicEmail"
                >
                  <Form.Label>
                    <small>Nama Belakang</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama lengkap"
                    ref={(ref) => (formRef.current.last_name = ref)}
                    defaultValue={userData.last_name}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Nomor Handphone</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nomor handphonemu"
                    ref={(ref) => (formRef.current.phone_number = ref)}
                    defaultValue={userData.phone_number}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Email</small>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukan email aktifmu"
                    ref={(ref) => (formRef.current.email = ref)}
                    defaultValue={userData.email}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Alamat</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={(ref) => (formRef.current.address = ref)}
                    defaultValue={userData.address}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Kota</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={(ref) => (formRef.current.city = ref)}
                    defaultValue={userData.city}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Provinsi</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={(ref) => (formRef.current.province = ref)}
                    defaultValue={userData.province}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Jenis Kelamin</small>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    defaultValue={userData.gender}
                    ref={(ref) => (formRef.current.gender = ref)}
                  >
                    <option>Pilih Jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <small>Google Maps</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={(ref) => (formRef.current.gmaps = ref)}
                    defaultValue={userData.gmaps}
                  />
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
