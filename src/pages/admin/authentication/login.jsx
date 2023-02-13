import { Button, Form, Container, Row, Col, Card } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useDispatch } from "react-redux";
import { useLoginMutation, useResendOtpMutation } from "../../../store/apis/authentication";
import { addEmail, addToken } from "../../../store/slices/authSlice";
import { useCurrentUserMutation } from "../../../store/apis/users";
import { addUser } from "../../../store/slices/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const formRef = useRef({})
	const [error, setError] = useState({})
	const [buttonWidth, setButtonWidth] = useState("")
	const roleParams = params.role

	const [resendOtpHit] = useResendOtpMutation()
	const [loginHit, { isLoading: isLoadingLogin, isError: isErrorLogin, error: errorLogin, isSuccess: isSuccessLogin, data: dataLogin }] = useLoginMutation()
	const [currentUserHit, { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser, isSuccess: isSuccessUser, data: dataUser }] = useCurrentUserMutation()


	const submitHandler = (e) => {
		e.preventDefault()

		setError({})

		const email = formRef.current.email
		const password = formRef.current.password

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

		if (password.value === "") {
			setError((error) => ({ ...error, "password": "Password tidak boleh kosong!" }))
			password.scrollIntoView()
			return
		} else {
			if (password.value.length < 8) {
				setError((error) => ({ ...error, "password": "Password tidak boleh kurang dari 8 karakter!" }))
				password.scrollIntoView()
				return
			}
		}

		toast.loading('Sedang melakukan login', {
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
		}

		let rolePayload = ""

		if (roleParams === "pencari" || roleParams === "seeker") {
			rolePayload = "seeker"
		}
		if (roleParams === "penyewa" || roleParams === "tennant") {
			rolePayload = "tennant"
		}
		if (roleParams === "superadmin") {
			rolePayload = "superadmin"
		}

		loginHit({ body: payload, role: rolePayload })
	}

	const successOauthGoogle = credentialResponse => {
		toast.loading('Sedang melakukan login', {
			position: "top-center",
			autoClose: false,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "light",
		})

		let rolePayload = ""

		if (roleParams === "pencari" || roleParams === "seeker") {
			rolePayload = "seeker"
		}
		if (roleParams === "penyewa" || roleParams === "tennant") {
			rolePayload = "tennant"
		}
		if (roleParams === "superadmin") {
			rolePayload = "superadmin"
		}
		const payload = {
			"email": rolePayload + "@mail.com",
			"password": "password",
		}

		loginHit({ body: payload, role: rolePayload })
	}

	useEffect(() => {
		if (isSuccessLogin) {
			toast.dismiss()
			toast.success("Sukses melakukan login", {
				position: "top-center",
				autoClose: 500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			if (roleParams === "superadmin") {
				if (dataLogin.role.includes('ROLE_SUPERUSER')) {
					dispatch(addToken(dataLogin))
					currentUserHit(dataLogin.access_token)
					return
				}
			}
			if ((roleParams === "penyewa" || roleParams === "tennant")) {
				if (dataLogin.role.includes('ROLE_TN')) {
					dispatch(addToken(dataLogin))
					currentUserHit(dataLogin.access_token)
					return
				}
			}
			if (roleParams === "pencari" || roleParams === "seeker") {
				if (dataLogin.role.includes('ROLE_SK')) {
					dispatch(addToken(dataLogin))
					currentUserHit(dataLogin.access_token)
					return
				}
			}
			toast.error("Gagal melakukan login", {
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

		if (isErrorLogin) {
			toast.dismiss()
			if (errorLogin.hasOwnProperty('data')) {
				if (Array.isArray(errorLogin.data)) {
					errorLogin.data.forEach((el) => {
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
					toast.error(errorLogin.data.message, {
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
				toast.error("Gagal melakukan login", {
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
	}, [isLoadingLogin])

	useEffect(() => {
		if (isSuccessUser) {
			setTimeout(() => {
				dispatch(addUser(dataUser.data))
				if (roleParams === "superadmin") {
					navigate('/admin')
					return
				}
				if ((roleParams === "penyewa" || roleParams === "tennant")) {
					navigate('/penyewa')
					return
				}
				if (roleParams === "pencari" || roleParams === "seeker") {
					navigate('/')
					return
				}
				toast.error("Gagal melakukan login", {
					position: "top-center",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "light",
				})
			}, 500);
		}

		if (isErrorUser) {
			toast.dismiss()
			if (errorUser.hasOwnProperty('data')) {
				if (Array.isArray(errorUser.data)) {
					errorUser.data.forEach((el) => {
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
					if (errorUser.data.message.hasOwnProperty('is_enabled') && errorUser.data.message.is_enabled === false) {
						dispatch(addEmail(formRef.current.email.value))
						resendOtpHit({ "email": formRef.current.email.value })
						navigate('/register/verification')
					} else {
						toast.error(errorUser.data.message, {
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
			} else {
				toast.error("Gagal melakukan login", {
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
	}, [isLoadingUser])

	useEffect(() => {
		if (roleParams !== "pencari" && roleParams !== "seeker" && roleParams !== "penyewa" && roleParams !== "tennant" && roleParams !== "superadmin") {
			navigate('/login')
		}
		const width = formRef.current.email.clientWidth

		setButtonWidth(width.toString())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<ToastContainer />
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
								<Form onSubmit={submitHandler}>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Alamat Email</Form.Label>
										<Form.Control
											type="text"
											placeholder="Masukan alamat email"
											ref={(ref) => formRef.current.email = ref}
											disabled={isLoadingLogin || isLoadingUser}
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
											disabled={isLoadingLogin || isLoadingUser}
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
										<Button variant="primary" type="submit"
											disabled={isLoadingLogin || isLoadingUser}
										>
											Login
										</Button>
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
								<hr />
								<div className="d-flex justify-content-center">
									<GoogleLogin
										width={buttonWidth}
										onSuccess={successOauthGoogle}
										onError={() => {
											console.log('Login Failed');
										}}
									/>
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
