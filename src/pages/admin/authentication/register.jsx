import React, { useEffect, useState } from "react"
import { useRef } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form
} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"
import { useRegisterMutation } from "../../../store/apis/authentication"
import { addEmail } from "../../../store/slices/authSlice"
import { toast, ToastContainer } from "react-toastify";

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

        setError({})

        const firstName = formRef.current.firstName
        const lastName = formRef.current.lastName
        const nomorHandphone = formRef.current.nomorHandphone
        const email = formRef.current.email
        const password = formRef.current.password
        const verifPassword = formRef.current.verifPassword

        if (firstName.value === "") {
            setError((error) => ({ ...error, "firstName": "Nama depan tidak boleh kosong!" }))
            firstName.scrollIntoView()
            return
        }

        if (lastName.value === "") {
            setError((error) => ({ ...error, "lastName": "Nama belakang tidak boleh kosong!" }))
            lastName.scrollIntoView()
            return
        }

        if (password.value === "") {
            setError((error) => ({ ...error, "password": "Password tidak boleh kosong!" }))
            password.scrollIntoView()
            return
        } else {
            if (password.value.length < 8) {
                setError((error) => ({ ...error, "password": "Password tidak boleh kurang dari 8 karakter!" }))
                password.scrollIntoView()
                return
            } else {
                if (verifPassword.value === "") {
                    setError((error) => ({ ...error, "verifPassword": "Verifikasi password tidak boleh kosong!" }))
                    verifPassword.scrollIntoView()
                    return
                } else {
                    if (password.value !== verifPassword.value) {
                        setError((error) => ({ ...error, "verifPassword": "Verifikasi password salah!" }))
                        password.scrollIntoView()
                        return
                    }
                }
            }
        }

        if (email.value === "") {
            setError((error) => ({ ...error, "email": "Email tidak boleh kosong!" }))
            email.scrollIntoView()
            return
        } else {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
                setError((error) => ({ ...error, "email": "Email tidak valid!" }))
                email.scrollIntoView()
                return
            }
        }

        if (nomorHandphone.value === "") {
            setError((error) => ({ ...error, "nomorHandphone": "Nomor handphone tidak boleh kosong!" }))
            nomorHandphone.scrollIntoView()
            return
        } else {
            if (!/[0-9]{10,13}$/i.test(nomorHandphone.value)) {
                setError((error) => ({ ...error, "nomorHandphone": "Nomor handphone tidak valid!" }))
                nomorHandphone.scrollIntoView()
                return
            }
        }

        toast.loading('Sedang mendaftarkan diri', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        })

        const payload = {
            "email": email.value,
            "password": password.value,
            "firstName": firstName.value,
            "lastName": lastName.value,
            "phoneNumber": nomorHandphone.value
        }

        let rolePayload = ""

        if (roleParams === "pencari" || roleParams === "seeker") {
            rolePayload = "seeker"
        }
        if (roleParams === "penyewa" || roleParams === "tennant") {
            rolePayload = "tennant"
        }

        registerHit({ body: payload, role: rolePayload })

    }

    useEffect(() => {
        if (isSuccess) {
            toast.dismiss()
            toast.success("Sukses mendaftarkan diri", {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
            setTimeout(() => {
                dispatch(addEmail(formRef.current.email.value))
                navigate('/register/verification')
            }, 500);
        }

        if (isError) {
            toast.dismiss()
            if (errorRegister.hasOwnProperty('data')) {
                if (Array.isArray(errorRegister.data)) {
                    errorRegister.data.forEach((el) => {
                        toast.error(el.data.message, {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                        })
                    })
                } else {
                    toast.error(errorRegister.data.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    })
                }
            } else {
                toast.error("Gagal mendaftarkan diri", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                })
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
            <ToastContainer />
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
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <Form.Label>Nama depan</Form.Label>
                                            <Form.Control type="text" placeholder="Masukan nama depan"
                                                ref={(ref) => formRef.current.firstName = ref}
                                                disabled={isLoading}
                                            />
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
                                            <Form.Control type="text" placeholder="Masukan nama belakang"
                                                ref={(ref) => formRef.current.lastName = ref}
                                                disabled={isLoading}
                                            />
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
                                            <Form.Control type="text" placeholder="Masukan nomor handphone"
                                                ref={(ref) => formRef.current.nomorHandphone = ref}
                                                disabled={isLoading}
                                            />
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
                                            <Form.Control type="text" placeholder="Masukan email"
                                                ref={(ref) => formRef.current.email = ref}
                                                disabled={isLoading}
                                            />
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
                                            <Form.Control type="password" placeholder="Masukan password"
                                                ref={(ref) => formRef.current.password = ref}
                                                disabled={isLoading}
                                            />
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
                                            <Form.Control type="password" placeholder="Masukan ulang password"
                                                ref={(ref) => formRef.current.verifPassword = ref}
                                                disabled={isLoading}
                                            />
                                            {
                                                (error.hasOwnProperty("verifPassword") && error.verifPassword !== "") ?
                                                    <Form.Text className="text-danger">
                                                        {error.verifPassword}
                                                    </Form.Text> :
                                                    ""
                                            }
                                        </Form.Group>

                                        <div className="d-grid">
                                            <Button variant="primary" type="submit"
                                                disabled={isLoading}
                                            >
                                                Register
                                            </Button>
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