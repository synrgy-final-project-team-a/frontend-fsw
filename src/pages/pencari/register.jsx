import React, { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form
} from "react-bootstrap"
import NavbarComponent from "../../components/navbar"
import PencariRoutes from "../../routes/pencari"

const Register = () => {

    const formRef = useRef({})
    const [error, setError] = useState({})

    const handleRegister = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <NavbarComponent routes={PencariRoutes} />
            <Container>
                <div className="text-center mt-5">
                    <h1>Daftar</h1>
                    <h3>Buat Akun Barumu</h3>
                </div>
                <Row className="mt-5">
                    <Col lg={6} xs={12} className="align-self-center text-center">
                        <img src="/login.png" alt="Login Picture" className="img-fluid" />
                    </Col>
                    <Col lg={6} xs={12}>
                        <div className="mx-5">
                            <Card>
                                <Card.Body className="m-3">
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="formBasicNamaLengkap">
                                            <Form.Label>Nama Lengkap</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.namaLengkap = ref} type="text" placeholder="Masukan nama lengkap" />
                                            <Form.Text className="text-danger" ref>
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicNomorHandphone">
                                            <Form.Label>Nomor Handphone</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.nomorHandphone = ref} type="text" placeholder="Masukan nomor handphone" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.email = ref} type="text" placeholder="Masukan email" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.password = ref} type="text" placeholder="Masukan password" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicverofPassword">
                                            <Form.Label>Verifikasi Password</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.verifPassword = ref} type="text" placeholder="Masukan ulang password" />
                                        </Form.Group>

                                        <div className="d-grid">
                                            <Button variant="success" type="submit">
                                                Submit
                                            </Button>
                                        </div>

                                        <div className="mt-2 text-center">
                                            <strong><p>Sudah punya akun? <a href="/login">Masuk Yuk!</a></p></strong>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register