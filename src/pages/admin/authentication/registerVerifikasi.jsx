import { useEffect, useState } from "react"
import { Alert, Button, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"
import { useResendOtpMutation } from "../../../store/apis/authentication"


const RegisterVerifikasi = () => {

	const emailOtp = useSelector((state) => {
		return state.auth.email
	})

	const [countDown, setCountDown] = useState(50)
	const [error, setError] = useState({})
	const [resendOtpHit, { isLoading, isError, isSuccess, error: errorOtp }] = useResendOtpMutation()

	const handleClick = () => {
		try {
			resendOtpHit({ "email": emailOtp })
		} catch (error) {
			setError({ "alert": { "variant": "danger", "message": "Send link failed!" } })
		}
	}

	useEffect(() => {
		if (countDown > 0) {
			setTimeout(() => {
				setCountDown(countDown - 1)
			}, 1000);
		}
	}, [countDown])

	useEffect(() => {
		if (isSuccess) {
			setError({ "alert": { "variant": "success", "message": "Berhasil mengirimkan link!" } })
			setCountDown(50)
		}

		if (isError) {
			if (Array.isArray(errorOtp.data)) {
				errorOtp.data.forEach((el) =>
					setError({ "alert": { "variant": "danger", "message": el.data.message } })
				);
			} else {
				setError({ "alert": { "variant": "danger", "message": errorOtp.data.message } })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	return (
		<>
			<div className="d-none d-lg-block">
				<NavbarComponent routes={PencariRoutes} />
			</div>
			<Container className="text-center mt-5">
				<Row className="justify-content-center">
					<Col xs={12}>
						<div className="text-center mt-5">
							{
								(error.hasOwnProperty("alert") && error.alert.message !== "") ?
									<Alert variant={error.alert.variant}>
										{error.alert.message}
									</Alert> :
									""
							}
							<h1>Verifikasi</h1>
							<h3>Link telah dikirimkan ke <b>{emailOtp}</b>. Silahkan cek email anda.</h3>
						</div>
					</Col>
					<Col xs={12} lg={6}>
						<div className="text-center mt-5 mx-5">
							<img src="/image/verif-email.png" alt="Email Verification" className="img-fluid" />
						</div>
					</Col>
					<Col xs={12}>
						{
							countDown > 0 ?
								<p>
									Link belum terkirim?<br />
									Kirim Ulang ({countDown})
								</p> :
								isLoading ?
									<Button variant="primary" disabled>
										Loading
									</Button> :
									<Button variant="primary" onClick={handleClick}>
										Kirim ulang email otp
									</Button>
						}
					</Col>
					<Col xs={12}>
						<Button
							variant="primary"
							as={Link}
							to="/"
							className="mt-3"
						>
							Homepage
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default RegisterVerifikasi