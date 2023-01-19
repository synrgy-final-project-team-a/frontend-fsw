import { Button, Form, Container, Row, Col, Card } from "react-bootstrap"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarComponent from "../../components/navbar";
import PencariRoutes from "../../routes/pencari";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onChangeEmailHandler = (e) => {
		const value = e.target.value;

		setEmail(value);
	};

	const onChangePasswordHandler = (e) => {
		const value = e.target.value;

		setPassword(value);
	};
	const onSubmitButtonHandler = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				email,
				password,
			};

			const loginResponse = await axios.post(
				"https://kosanku-bej.up.railway.app/api/login-user",
				payload
			);
			if (loginResponse.status === 201) {
				console.log("berhasil daftar");

				const jwtToken = loginResponse.data.data.token;

				localStorage.setItem("user_token", jwtToken);

				navigate("/");
			}
		} catch (err) {
			console.log("gagal login:", err);
		}
	};
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
								<Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Alamat Email</Form.Label>
										<Form.Control
											type="email"
											placeholder="Masukan alamat email"
											onChange={(e) => onChangeEmailHandler(e)}
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Masukan password"
											onChange={(e) => onChangePasswordHandler(e)}
										/>
									</Form.Group>
									<div className="d-grid gap-2">
										<Button
											// // variant="primary"
											type="button"
											onClick={(e) => onSubmitButtonHandler(e)}
											className="background-color-primary button-hover"
										>
											<Link
												to="/"
												className="text-light"
												style={{ textDecoration: "none" }}
											>
												Login
											</Link>{" "}
										</Button>
									</div>
								</Form>
								<p className="text-center mt-4">
									Belum punya akun?{" "}
									<span>
										<Link
											to="/register"
											className="color-primary fw-bold color-hover"
											style={{ textDecoration: "none" }}
										>
											Daftar Yuk!
										</Link>{" "}
									</span>{" "}
								</p>
								<p className="text-center mt-1">
									<Link
										to="/verif-email"
										className="color-primary color-hover"
										style={{ textDecoration: "none" }}
									>
										Lupa Password
									</Link>{" "}
								</p>
								<hr></hr>
								<div className="d-grid gap-2">
									<Button
										// variant="primary"
										type="button"
										onClick={(e) => onSubmitButtonHandler(e)}
										className="background-color-primary"
									>
										<Link
											to="/"
											className="text-light"
											style={{ textDecoration: "none" }}
										>
											Google
										</Link>{" "}
									</Button>
									<Button
										// variant="primary"
										type="button"
										onClick={(e) => onSubmitButtonHandler(e)}
										className="mt-2 background-color-primary"
									>
										<Link
											to="/"
											className="text-light"
											style={{ textDecoration: "none" }}
										>
											Facebook
										</Link>{" "}
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
