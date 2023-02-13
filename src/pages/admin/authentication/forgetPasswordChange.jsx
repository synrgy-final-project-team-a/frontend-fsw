import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useChangePasswordMutation } from "../../../store/apis/authentication";
import { toast, ToastContainer } from "react-toastify";

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

		const password = formRef.current.password
		const verifPassword = formRef.current.verifPassword

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

		toast.loading('Sedang mengubah password', {
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
			"otp": otpParams,
			"newPassword": password.value
		}

		changePassHit(payload)
	}

	useEffect(() => {
		if (isSuccess) {
			toast.dismiss()
			toast.success("Sukses mengubah password", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			setTimeout(() => {
				navigate('/login')
			}, 1000)
		}

		if (isError) {
			toast.dismiss()
			if (errorForgot.hasOwnProperty('data')) {
				if (Array.isArray(errorForgot.data)) {
					errorForgot.data.forEach((el) => {
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
					toast.error(errorForgot.data.message, {
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
				toast.error("Gagal mengubah password", {
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

	return (
		<>
			<ToastContainer />
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
								<Form onSubmit={submitHandle}>
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
									<Button variant="primary" type="submit"
										disabled={isLoading}
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
