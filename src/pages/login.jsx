import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BasicExample() {
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

      const registerResponse = await axios.post(
        "https://kosanku-bej.up.railway.app/api/login-user",
        payload
      );
      if (registerResponse.status === 201) {
        console.log("berhasil daftar");

        const jwtToken = registerResponse.data.data.token;

        localStorage.setItem("user_token", jwtToken);

        navigate("/");
      }
    } catch (err) {
      console.log("gagal login:", err);
    }
  };
  return (
    <dev>
      <h1>Login</h1>
      <h2>Silahkan untuk login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => onChangeEmailHandler(e)}/>
          {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => onChangePasswordHandler(e)}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={(e) => onSubmitButtonHandler(e)}>
          Login
        </Button>
      </Form>
      <p>Belum punya akun? Daftar yuk!</p>
      <a href="#">Lupa Password</a>
    </dev>
  );
}

export default BasicExample;
