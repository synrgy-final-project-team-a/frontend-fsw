import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import image from "../../assets/images/login.png";
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
    <div>
      <Container>
        <h1 className="text-center">Login</h1>
        <p className="text-center" style={{ fontSize: "24px" }}>
          Silahkan untuk login
        </p>
        <Row className="mt-5">
          <Col>
            <Image src={image} fluid />
          </Col>
          <Col>
            <Card style={{ width: "30rem"}} className="shadow-lg bg-light p-3">
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
                    style={{ width: "26rem"}}
                    className="color-primary"
                  >
                    <Link
                      to="/"
                      className="text-light "
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
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Daftar Yuk!
                    </Link>{" "}
                  </span>{" "}
                </p>
                <p className="text-center mt-1">
                  <Link
                    to="/verif-email"
                    className="text-dark"
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
                  className="color-primary"
                >
                  <Link
                    to="/"
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>{" "}
                </Button>
                <Button
                  // variant="primary"
                  type="button"
                  onClick={(e) => onSubmitButtonHandler(e)}
                  style={{ width: "250px" }}
                  className="mt-2 color-primary"
                >
                  <Link
                    to="/"
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
