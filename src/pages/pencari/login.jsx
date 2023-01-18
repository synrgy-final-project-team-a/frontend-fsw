import { Button, Form, Container, Row, Col, Card } from "react-bootstrap"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmailHandler = (e) => {
    const value = e.target.value;

    setEmail(value);
  };

  const onChangePasswordHandler = (e) => {
    const value = e.target.value;

    setPassword(value);
  };
  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        password,
      };

      const loginResponse = await axios.post(
        "https://kosanku-bej.up.railway.app/api/login-user",
        payload
      );
      if (loginResponse.status === 201) {
        console.log("berhasil daftar");

        const jwtToken = loginResponse.data.data.token;

        localStorage.setItem("user_token", jwtToken);

        navigate("/");
      }
    } catch (err) {
      console.log("gagal login:", err);
    }
  };
  return (
    <Container className="mt-5">
      <h1 className="text-center text-title">Login</h1>
      <p className="text-center text-subtitle">
        Silahkan untuk login
      </p>
      <Row className="mt-5 align-items-center">
        <Col className="col ms-5">
          <img src="./login.png" alt="..." />
        </Col>
        {/* <Col className="vertical-line"></Col> */}
        <Col className="col">
          <Card style={{ width: "30rem" }} className="shadow-lg bg-light p-3">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Alamat Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukan alamat email"
                    onChange={(e) => onChangeEmailHandler(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Masukan password"
                    onChange={(e) => onChangePasswordHandler(e)}
                  />
                </Form.Group>
                <Button
                  // // variant="primary"
                  type="button"
                  onClick={(e) => onSubmitButtonHandler(e)}
                  style={{ width: "26rem" }}
                  className="background-color-primary button-hover"
                >
                  <Link
                    to="/"
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>{" "}
                </Button>
              </Form>
              <p className="text-center mt-4">
                Belum punya akun?{" "}
                <span>
                  <Link
                    to="/register"
                    className="color-primary fw-bold color-hover"
                    style={{ textDecoration: "none" }}
                  >
                    Daftar Yuk!
                  </Link>{" "}
                </span>{" "}
              </p>
              <p className="text-center mt-1">
                <Link
                  to="/verif-email"
                  className="color-primary color-hover"
                  style={{ textDecoration: "none" }}
                >
                  Lupa Password
                </Link>{" "}
              </p>
              <hr></hr>
              <Button
                // variant="primary"
                type="button"
                onClick={(e) => onSubmitButtonHandler(e)}
                style={{ width: "26rem" }}
                className="background-color-primary"
              >
                <Link
                  to="/"
                  className="text-light"
                  style={{ textDecoration: "none" }}
                >
                  Google
                </Link>{" "}
              </Button>
              <Button
                // variant="primary"
                type="button"
                onClick={(e) => onSubmitButtonHandler(e)}
                style={{ width: "26rem" }}
                className="mt-2 background-color-primary"
              >
                <Link
                  to="/"
                  className="text-light"
                  style={{ textDecoration: "none" }}
                >
                  Facebook
                </Link>{" "}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
