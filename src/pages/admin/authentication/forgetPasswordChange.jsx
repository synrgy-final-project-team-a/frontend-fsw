import { Button, Form, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useChangePasswordMutation } from "../../../store/apis/authentication";

const ForgetPassChange = () => {
	const params = useParams()
	const navigate = useNavigate()

	const formRef = useRef({})
	const [error, setError] = useState({})
	const otpParams = params.otp

	const [changePassHit, { isSuccess, isError, isLoading, error: errorForgot }] = useChangePasswordMutation()

	const submitHandle = (e) => {
		e.preventDefault()
		
		setError({})
		let failed = false

		const password = formRef.current.password.value
		const verifPassword = formRef.current.verifPassword.value

		if (password !== verifPassword) {
			failed = true
			setError((error) => ({...error, "verifPassword": "Verifikasi password salah!" }))
		}

		if (verifPassword === "") {
			failed = true
			setError((error) => ({...error, "verifPassword": "Verifikasi password tidak boleh kosong!" }))
		}

		if (password === "") {
			failed = true
			setError((error) => ({...error, "password": "Password tidak boleh kosong!" }))
		}

		if (failed) {
			return
		}

		const payload = {
			"otp": otpParams,
			"newPassword": password
		}

		try {
			changePassHit(payload)
		} catch (error) {
			setError({ "alert": { "variant": "danger", "message": "Send link failed!" } })
		}
	}

	useEffect(() => {
		if (isSuccess) {
			setError({ "alert": { "variant": "success", "message": "Berhasil mengubah password!" } })
			setTimeout(() => {
				navigate('/login')
			}, 1500)
		}

		if (isError) {
			if (Array.isArray(errorForgot.data)) {
				errorForgot.data.forEach((el) =>
					setError({ "alert": { "variant": "danger", "message": el.data.message } })
				);
			} else {
				setError({ "alert": { "variant": "danger", "message": errorForgot.data.message } })
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
									(error.hasOwnProperty("alert") && error.alert.message !== "") ?
										<Alert variant={error.alert.variant}>
											{error.alert.message}
										</Alert> :
										""
								}
								<Form onSubmit={submitHandle}>
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
									<Button
										variant="primary"
										type="submit"
									>
										Ganti Password
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

export default ForgetPassChange;
