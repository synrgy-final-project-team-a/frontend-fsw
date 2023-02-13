import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"
import { useResendOtpMutation } from "../../../store/apis/authentication"
import { toast, ToastContainer } from "react-toastify";

const RegisterVerifikasi = () => {

	const emailOtp = useSelector((state) => {
		return state.auth.email
	})

	const [countDown, setCountDown] = useState(50)
	
	const [resendOtpHit, { isLoading, isError, isSuccess, error: errorOtp }] = useResendOtpMutation()

	const handleClick = () => {
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

		resendOtpHit({ "email": emailOtp })
	}

	useEffect(() => {
		if (countDown > 0) {
			setTimeout(() => {
				setCountDown(countDown - 1)
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countDown])

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
			setCountDown(50)
		}

		if (isError) {
			toast.dismiss()
			if (errorOtp.hasOwnProperty('data')) {
				if (Array.isArray(errorOtp.data)) {
					errorOtp.data.forEach((el) => {
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
					toast.error(errorOtp.data.message, {
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
			<Container className="text-center mt-5">
				<Row className="justify-content-center">
					<Col xs={12}>
						<div className="text-center mt-5">
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
								<Button variant="primary"
									onClick={handleClick}
									disabled={isLoading}
								>
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