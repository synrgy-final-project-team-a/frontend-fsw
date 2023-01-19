import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onChangeEmailHandler = (e) => {
    const value = e.target.value;

    setEmail(value);
  };

  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email,
      };

      const forgetpassResponse = await axios.post(
        "https://kosanku-bej.up.railway.app/api/forget-password/send",
        payload
      );
      if (forgetpassResponse.status === 201) {
        console.log("berhasil send email verif");

        // const jwtToken = forgetpassResponse.data.data.token;

        // localStorage.setItem("user_token", jwtToken);

        navigate("/login"); 
      }
    } catch (err) {
      console.log("gagal login:", err);
    }
  };
  return (
    <Container className="mt-5">
      <h1 className="text-center text-title">Lupa Password</h1>
      <p className="text-center text-subtitle">
        Masukan email kamu yang sudah terdaftar
      </p>
      <Row className="mt-5 align-items-center">
        <Col className="col ms-5">
          <img src="/image/forgetpass.png" alt="..." />
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
                <p>Masukan email yang anda gunakan pada saat mendaftar dan kami akan mengirimkan link untuk mengubah password anda ke email anda</p>
                <Button
                  // // variant="primary"
                  type="button"
                  onClick={(e) => onSubmitButtonHandler(e)}
                  style={{ width: "26rem" }}
                  className="background-color-primary button-hover"
                >
                  <Link
                    to="/verif-email-sukses"
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    Kirim Link Reset
                  </Link>{" "}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgetPass;
