import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        <Row className="mt-5">
          <Col>
            <h1>Kosanku</h1>
            <h2>Kosan nyaman kosan mantap</h2>
          </Col>
          <Col>
            <h1>Login</h1>
            <h2>Silahkan untuk login</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => onChangeEmailHandler(e)}
                />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => onChangePasswordHandler(e)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={(e) => onSubmitButtonHandler(e)}
              >
                <Link to="/" className='text-light' style={{textDecoration: 'none'}}>
                  Login
                </Link>{" "}
              </Button>
            </Form>
            <p>Belum punya akun? Daftar yuk!</p>
            <p>
              <Link
                to="/verif-email"
                className="font-bold dark"
              >
                Lupa Password
              </Link>{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
