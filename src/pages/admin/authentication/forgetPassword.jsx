import { Button, Form, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useForgotPasswordMutation } from "../../../store/apis/authentication";
import { useDispatch } from "react-redux";
import { addEmail } from "../../../store/slices/authSlice";

const ForgetPass = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const emailRef = useRef("")
	const [error, setError] = useState("")
	const [alert, setAlert] = useState("")

	const [forgotPassHit, { isLoading, isSuccess, isError, error: errorForgot }] = useForgotPasswordMutation()

	const submitHandle = (e) => {
		e.preventDefault()
		let failed = false

		const email = emailRef.current.value

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			failed = true
			setError("Email tidak valid!")
		}

		if (email === "") {
			failed = true
			setError("Email tidak boleh kosong!")
		}

		if (failed) {
			return
		}

		const payload = {
			"email": email
		}

		try {
			forgotPassHit(payload)
		} catch (error) {
			setAlert("Send link failed!")
		}
	}

	useEffect(() => {
		if (isSuccess) {
			dispatch(addEmail(emailRef.current.value))
			navigate('/login/forgot-password-success')
		}

		if (isError) {
			if (Array.isArray(errorForgot.data)) {
				errorForgot.data.forEach((el) =>
					setAlert(el.data.message)
				);
			} else {
				setAlert(errorForgot.data.message)
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
				<h1 className="text-center text-title">Lupa Password</h1>
				<p className="text-center text-subtitle">
					Masukan email kamu yang sudah terdaftar
				</p>
				<Row className="mt-5 align-items-center">
					<Col xs={12} lg={6} className="text-center">
						<img src="/image/forgetpass.png" className="img-fluid" alt="..." />
					</Col>
					<Col xs={12} lg={6}>
						<Card className="p-3">
							<Card.Body>
								{
									(alert !== "") ?
										<Alert variant="danger">
											{alert}
										</Alert> :
										""
								}
								<Form onSubmit={submitHandle}>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Alamat Email</Form.Label>
										<Form.Control
											type="text"
											placeholder="Masukan alamat email"
											ref={emailRef}
										/>
										{
											(error !== "") ?
												<Form.Text className="text-danger">
													{error}
												</Form.Text> :
												""
										}
									</Form.Group>
									<p>Masukan email yang anda gunakan pada saat mendaftar dan kami akan mengirimkan link untuk mengubah password anda ke email anda</p>
									<Button
										variant="primary"
										type="submit"
									>
										Kirim Link Reset
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default ForgetPass;
