import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useForgotPasswordMutation } from "../../../store/apis/authentication";
import { useDispatch } from "react-redux";
import { addEmail } from "../../../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";

const ForgetPass = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const formRef = useRef({})
	const [error, setError] = useState({})

	const [forgotPassHit, { isLoading, isSuccess, isError, error: errorForgot }] = useForgotPasswordMutation()

	const submitHandle = (e) => {
		e.preventDefault()

		setError({})

		const email = formRef.current.email

		if (email.value === "") {
			setError((error) => ({ ...error, "email": "Email tidak boleh kosong!" }))
			email.scrollIntoView()
			return
		} else {
			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
				setError((error) => ({ ...error, "email": "Email tidak valid!" }))
				email.scrollIntoView()
				return
			}
		}

		toast.loading('Sedang mengirimkan email', {
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
			"email": email.value
		}

		forgotPassHit(payload)
	}

	useEffect(() => {
		if (isSuccess) {
			toast.dismiss()
			toast.success("Sukses mengirimkan email", {
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
				navigate('/login/forgot-password-success')
			}, 500);
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
				toast.error("Gagal mengirimkan email", {
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
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Alamat Email</Form.Label>
										<Form.Control
											type="text"
											placeholder="Masukan alamat email"
											disabled={isLoading}
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
									<p>Masukan email yang anda gunakan pada saat mendaftar dan kami akan mengirimkan link untuk mengubah password anda ke email anda</p>
									<Button variant="primary" type="submit"
										disabled={isLoading}
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
