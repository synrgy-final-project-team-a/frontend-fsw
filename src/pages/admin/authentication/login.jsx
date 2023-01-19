import { Button, Form, Container, Row, Col, Card, Alert } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useDispatch } from "react-redux";
import { useLoginMutation, useResendOtpMutation } from "../../../store/apis/authentication";
import { addEmail } from "../../../store/slices/authSlice";

const Login = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const formRef = useRef({})
	const [error, setError] = useState({})
	const roleParams = params.role

	const [resendOtpHit] = useResendOtpMutation()
	const [loginHit, { isLoading, isError, error: errorLogin, isSuccess, data: dataLogin }] = useLoginMutation()


	const submitHandler = (e) => {
		e.preventDefault()
		let failed = false

		const email = formRef.current.email.value
		const password = formRef.current.password.value

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

		if (failed) {
			return
		}

		const payload = {
			"email": email,
			"password": password,
		}

		try {
			loginHit(payload)
		} catch (error) {
			setError({ "general": "Login failed" })
		}
	}

	useEffect(() => {
		if (isSuccess) {
			console.log("berhasil")
			console.log(dataLogin)
		}

		if (isError) {
			if (Array.isArray(errorLogin.data)) {
				errorLogin.data.forEach((el) =>
					setError({ "general": el.data.message })
				);
			} else {
				if (errorLogin.data.message.hasOwnProperty('is_enabled') && errorLogin.data.message.is_enabled === false) {
					dispatch(addEmail(formRef.current.email.value))
					resendOtpHit({ "email": formRef.current.email.value })
					navigate('/register/verifikasi')
				} else {
					setError({ "general": errorLogin.data.message })
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	return (
		<>
			<div className="d-none d-lg-block">
				<NavbarComponent routes={PencariRoutes} />
			</div>
			<Container className="mt-5">
				<h1 className="text-center text-title">Login</h1>
				<p className="text-center text-subtitle">
					Silahkan untuk login
				</p>
				<Row className="mt-5 align-items-center">
					<Col xs={12} lg={6} className="text-center d-none d-lg-flex">
						<img src="/image/login.png" className="img-fluid" alt="..." />
					</Col>
					<Col xs={12} lg={6}>
						<Card className="shadow-lg bg-light p-3">
							<Card.Body>
								{
									(error.hasOwnProperty("general") && error.general !== "") ?
										<Alert variant="danger">
											{error.general}
										</Alert> :
										""
								}
								<Form onSubmit={submitHandler}>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Alamat Email</Form.Label>
										<Form.Control
											type="text"
											placeholder="Masukan alamat email"
											ref={(ref) => formRef.current.email = ref}
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
										<Form.Control
											type="password"
											placeholder="Masukan password"
											ref={(ref) => formRef.current.password = ref}
										/>
										{
											(error.hasOwnProperty("password") && error.password !== "") ?
												<Form.Text className="text-danger">
													{error.password}
												</Form.Text> :
												""
										}
									</Form.Group>
									<div className="d-grid gap-2">
										{
											isLoading ?
												<Button variant="primary" disabled>
													Loading
												</Button> :
												<Button variant="primary" type="submit">
													Login
												</Button>
										}
									</div>
								</Form>
								<p className="text-center mt-4">
									Belum punya akun?{" "}
									<span>
										<Link
											to={`/register/${roleParams}`}
											className="text-primary fw-bold text-decoration-none"
										>
											Daftar Yuk!
										</Link>{" "}
									</span>{" "}
								</p>
								<p className="text-center mt-1">
									<Link
										to="/login/forgot-password"
										className="text-primary text-decoration-none"
									>
										Lupa Password
									</Link>{" "}
								</p>
								<hr></hr>
								<div className="d-grid gap-2">
									<Button
										variant="primary"
										type="button"
									>
										Google
									</Button>
									<Button
										variant="primary"
										type="button"
										className="mt-2"
									>
										Facebook
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Login;
