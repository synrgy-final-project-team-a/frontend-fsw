import { useEffect, useState } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NavbarComponent from "../../../components/navbar"
import PencariRoutes from "../../../routes/pencari"
import { useLogoutMutation } from "../../../store/apis/authentication"
import { emptyEmail, emptyToken } from "../../../store/slices/authSlice"
import { emptyUser } from "../../../store/slices/userSlice"

const LogoutComponent = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [error, setError] = useState({})

	const token = useSelector((state) => {
		return state.auth.token
	})

	const [logoutHit, { isLoading, isError, isSuccess }] = useLogoutMutation()

	useEffect(() => {
		if (Object.keys(token).length === 0) {
			dispatch(emptyToken())
			dispatch(emptyEmail())
			dispatch(emptyUser())
			navigate('/')
		} else {
			try {
				logoutHit(token.access_token)
			} catch (error) {
				setError({ "alert": { "variant": "danger", "message": "Logout failed!" } })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (isSuccess) {
			dispatch(emptyToken())
			dispatch(emptyEmail())
			dispatch(emptyUser())
			navigate('/')
		}

		if (isError) {
			setError({ "alert": { "variant": "danger", "message": "Logout failed!" } })
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
							<h1>Logout</h1>
							<h3>Akun sedang logout!</h3>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default LogoutComponent