import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SuccessResetPass() {
  const [seconds, setSeconds] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container className="mt-5 text-center">
      <h1 className="text-center text-title">Verifikasi</h1>
      <p className="text-center text-subtitle">
        Link telah dikirim. Silahkan chek email anda.
      </p>
      <img src="./verif-email.png" alt="..." className="mb-3" />
      <p className="text-center text m-0">Link belum terkirim?</p>
      <p>
        <Link
          to="/verif-email-sukses"
          className="text-center text color-primary fw-bold"
          style={{ textDecoration: "none" }}
        >
          Kirim ulang ({seconds})
        </Link>{" "}
      </p>
      <Button
        type="button"
        style={{ width: "26rem" }}
        className="background-color-primary button-hover mt-3"
      >
        <Link to="/" className="text-light" style={{ textDecoration: "none" }}>
          Homepage
        </Link>{" "}
      </Button>
    </Container>
  );
}
