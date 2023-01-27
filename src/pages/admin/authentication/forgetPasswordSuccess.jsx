import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavbarComponent from "../../../components/navbar";
import PencariRoutes from "../../../routes/pencari";
import { useForgotPasswordMutation } from "../../../store/apis/authentication";

const SuccessResetPass = () => {
	const emailOtp = useSelector((state) => {
		return state.auth.email
	})

	const [seconds, setSeconds] = useState(50);
	const [error, setError] = useState({})

	const [forgotPassHit, { isLoading, isSuccess, isError, error: errorForgot }] = useForgotPasswordMutation()

	const handleClick = () => {
		try {
			forgotPassHit({ "email": emailOtp })
		} catch (error) {
            setError({ "alert": { "variant": "danger", "message": "Send link failed!" } })
        }
	}

	useEffect(() => {
		if (seconds > 0) {
			setTimeout(() => {
				setSeconds(seconds - 1);
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seconds]);

	useEffect(() => {
		if (isSuccess) {
			setError({ "alert": { "variant": "success", "message": "Berhasil mengirimkan link!" } })
			setSeconds(50)
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
							<h1>Sukses</h1>
							<h3>Link ganti password telah dikirimkan ke <b>{emailOtp}</b>. Silahkan cek email anda.</h3>
						</div>
					</Col>
					<Col xs={12} lg={6}>
						<div className="text-center mt-5 mx-5">
							<img src="/image/verif-email.png" alt="Email Verification" className="img-fluid" />
						</div>
					</Col>
					<Col xs={12}>
						{
							seconds > 0 ?
								<p>
									Link belum terkirim?<br />
									Kirim Ulang ({seconds})
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
	);
}

export default SuccessResetPass