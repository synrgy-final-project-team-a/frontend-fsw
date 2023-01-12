import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
    <dev>
      <h1>Lupa Password</h1>
      <p>
        Masukin email yang anda gunakan pada saat mendaftar dan kami akan
        mengirimkan link untuk mengubah password anda ke email
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Alamat Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => onChangeEmailHandler(e)}/>
          {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => onSubmitButtonHandler(e)}>
          <Link to="/login" className="font-bold underline text-[#1e40af]">
            Kirim Link Verifikasi
          </Link>{" "}
        </Button>
      </Form>
    </dev>
  );
}

export default ForgetPass;
