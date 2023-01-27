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
import { Link, useNavigate, useParams } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"
import { useRegisterMutation } from "../../../store/apis/authentication"
import { addEmail } from "../../../store/slices/authSlice"

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

        const firstName = formRef.current.firstName.value
        const lastName = formRef.current.lastName.value
        const nomorHandphone = formRef.current.nomorHandphone.value
        const email = formRef.current.email.value
        const password = formRef.current.password.value
        const verifPassword = formRef.current.verifPassword.value

        if (password !== verifPassword) {
            failed = true
            setError({ "verifPassword": "Verifikasi password salah!" })
        }

        if (password.length < 8) {
            failed = true
            setError({ "password": "Password tidak boleh kurang dari 8 karakter!" })
        }

        if (verifPassword === "") {
            failed = true
            setError({ "verifPassword": "Verifikasi password tidak boleh kosong!" })
        }

        if (password === "") {
            failed = true
            setError({ "password": "Password tidak boleh kosong!" })
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            failed = true
            setError({ "email": "Email tidak valid!" })
        }

        if (email === "") {
            failed = true
            setError({ "email": "Email tidak boleh kosong!" })
        }

        if (!/^[0-9]{10,13}$/i.test(nomorHandphone)) {
            failed = true
            setError({ "nomorHandphone": "Nomor handphone tidak valid!" })
        }

        if (nomorHandphone === "") {
            failed = true
            setError({ "nomorHandphone": "Nomor handphone tidak boleh kosong!" })
        }

        if (lastName === "") {
            failed = true
            setError({ "lastName": "Nama belakang tidak boleh kosong!" })
        }

        if (firstName === "") {
            failed = true
            setError({ "firstName": "Nama depan tidak boleh kosong!" })
        }

        if (failed) {
            return
        }

        const payload = {
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": nomorHandphone
        }

        let rolePayload = ""

        if (roleParams === "pencari" || roleParams === "seeker") {
            rolePayload = "seeker"
        }
        if (roleParams === "penyewa" || roleParams === "tennant") {
            rolePayload = "tennant"
        }

        try {
            registerHit({ body: payload, role: rolePayload })
        } catch (error) {
            setError({ "alert": { "variant": "danger", "message": "Register failed!" } })
        }

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(addEmail(formRef.current.email.value))
            navigate('/register/verification')
        }

        if (isError) {
            if (Array.isArray(errorRegister.data)) {
				errorRegister.data.forEach((el) =>
					setError({ "alert": { "variant": "danger", "message": el.data.message } })
				);
			} else {
				setError({ "alert": { "variant": "danger", "message": errorRegister.data.message } })
			}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    useEffect(() => {
        if (roleParams !== "pencari" && roleParams !== "seeker" && roleParams !== "penyewa" && roleParams !== "tennant") {
            navigate('/register')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                        <img src="/image/login.png" alt="Login" className="img-fluid" />
                    </Col>
                    <Col lg={6} xs={12}>
                        <div className="mx-lg-5">
                            <Card>
                                <Card.Body className="m-3">
                                    {
                                        (error.hasOwnProperty("alert") && error.alert.message !== "") ?
                                            <Alert variant={error.alert.variant}>
                                                {error.alert.message}
                                            </Alert> :
                                            ""
                                    }
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <Form.Label>Nama depan</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.firstName = ref} type="text" placeholder="Masukan nama depan" />
                                            {
                                                (error.hasOwnProperty("firstName") && error.firstName !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.firstName}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <Form.Label>Nama belakang</Form.Label>
                                            <Form.Control ref={(ref) => formRef.current.lastName = ref} type="text" placeholder="Masukan nama belakang" />
                                            {
                                                (error.hasOwnProperty("lastName") && error.lastName !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.lastName}
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
                                            {
                                                isLoading ?
                                                    <Button variant="primary" disabled>
                                                        Loading
                                                    </Button> :
                                                    <Button variant="primary" type="submit">
                                                        Register
                                                    </Button>
                                            }
                                        </div>

                                        <div className="mt-2 text-center">
                                            <strong>
                                                <p>Sudah punya akun?{" "}
                                                    <Link to={`/login/${roleParams}`} className="text-primary" style={{ textDecoration: "none" }}>
                                                        Masuk Yuk!
                                                    </Link>
                                                </p>
                                            </strong>
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