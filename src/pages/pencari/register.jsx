import React, { useEffect, useState } from "react"
import { useRef } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Alert
} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import NavbarComponent from "../../components/navbar"
import PencariRoutes from "../../routes/pencari"
import { useRegisterMutation } from "../../store/apis/authentication"
import { addEmail } from "../../store/slices/authSlice"

const Register = () => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formRef = useRef({})
    const [error, setError] = useState({})
    const roleParams = params.role

    const [registerHit, { isLoading, isError, error: errorRegister, isSuccess }] = useRegisterMutation()

    const handleRegister = (e) => {
        e.preventDefault()
        let failed = false

        const namaLengkap = formRef.current.namaLengkap.value
        const nomorHandphone = formRef.current.nomorHandphone.value
        const email = formRef.current.email.value
        const password = formRef.current.password.value
        const verifPassword = formRef.current.verifPassword.value

        if (namaLengkap === "") {
            failed = true
            setError({ "namaLengkap": "Nama lengkap tidak boleh kosong!" })
        }

        if (nomorHandphone === "") {
            failed = true
            setError({ "nomorHandphone": "Nomor handphone tidak boleh kosong!" })
        }

        if (!/^[0-9]{10,13}$/i.test(nomorHandphone)) {
            failed = true
            setError({ "nomorHandphone": "Nomor handphone tidak valid!" })
        }

        if (email === "") {
            failed = true
            setError({ "email": "Email tidak boleh kosong!" })
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            failed = true
            setError({ "email": "Email tidak valid!" })
        }

        if (password === "") {
            failed = true
            setError({ "password": "Password tidak boleh kosong!" })
        }

        if (verifPassword === "") {
            failed = true
            setError({ "verifPassword": "Verifikasi password tidak boleh kosong!" })
        }

        if (password !== verifPassword) {
            failed = true
            setError({ "verifPassword": "Verifikasi password salah!" })
        }

        if (failed) {
            return
        }

        const nama = namaLengkap.split(' ')
        let firstName = ""
        let lastName = ""
        if (nama.length > 1) {
            firstName = nama.slice(0, -1).join(' ')
            lastName = nama.at(-1)
        } else {
            firstName = namaLengkap
            lastName = ""
        }

        const payload = {
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": nomorHandphone
        }

        try {
            registerHit({ body: payload, role: roleParams })
        } catch (error) {
            setError({ "general": "Register failed" })
        }

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(addEmail(formRef.current.email.value))
            navigate('/register/verifikasi')
        }

        if (isError) {
            if (Array.isArray(errorRegister.data.error)) {
                errorRegister.data.error.forEach((el) =>
                    setError({ "general": el.message })
                );
            } else {
                setError({ "general": errorRegister.data.message })
            }
        }
    }, [isLoading])

    return (
        <>
            <div className="d-none d-lg-block">
                <NavbarComponent routes={PencariRoutes} />
            </div>
            <Container>
                <div className="text-center mt-5">
                    <h1>Daftar</h1>
                    <h3>Buat Akun Barumu</h3>
                </div>
                <Row className="mt-5">
                    <Col lg={6} xs={12} className="align-self-center text-center d-none d-lg-block">
                        <img src="/login.png" alt="Login" className="img-fluid" />
                    </Col>
                    <Col lg={6} xs={12}>
                        <div className="mx-lg-5">
                            <Card>
                                <Card.Body className="m-3">
                                    {
                                        (error.hasOwnProperty("general") && error.general !== "") ?
                                            <Alert variant="danger">
                                                {error.general}
                                            </Alert> :
                                            ""
                                    }
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="formBasicNamaLengkap">
                                            <Form.Label>Nama Lengkap</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.namaLengkap = ref} type="text" placeholder="Masukan nama lengkap" />
                                            {
                                                (error.hasOwnProperty("namaLengkap") && error.namaLengkap !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.namaLengkap}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicNomorHandphone">
                                            <Form.Label>Nomor Handphone</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.nomorHandphone = ref} type="text" placeholder="Masukan nomor handphone" />
                                            {
                                                (error.hasOwnProperty("nomorHandphone") && error.nomorHandphone !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.nomorHandphone}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.email = ref} type="text" placeholder="Masukan email" />
                                            {
                                                (error.hasOwnProperty("email") && error.email !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.email}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.password = ref} type="password" placeholder="Masukan password" />
                                            {
                                                (error.hasOwnProperty("password") && error.password !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.password}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicverofPassword">
                                            <Form.Label>Verifikasi Password</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.verifPassword = ref} type="password" placeholder="Masukan ulang password" />
                                            {
                                                (error.hasOwnProperty("verifPassword") && error.verifPassword !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.verifPassword}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                                Login
                                            </Button>
                                        </div>

                                        <div className="mt-2 text-center">
                                            <strong><p>Sudah punya akun? <a href="/login" className="text-primary">Masuk Yuk!</a></p></strong>
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