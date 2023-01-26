import { useEffect } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/apis/authentication";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { emptyUser } from "../store/slices/userSlice";

const NavbarComponent = ({ routes }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [logoutHit, { isLoading, isSuccess }] = useLogoutMutation()

	const token = useSelector((state) => {
		return state.auth.token
	})

	const userData = useSelector((state) => {
		return state.user.current
	})

	const routesDefine = (element, path = "") => {
		return (element.map((el) => {
			if (el.hasOwnProperty('children')) {
				return routesDefine(el.children, path + el.path)
			} else if (el.hasOwnProperty('name')) {
				return <Nav.Link key={path + el.path} className="navbar-link" as={Link} to={path + el.path}>{el.name}</Nav.Link>
			} else {
				return <></>
			}
		}))
	}

	const handleLogout = () => {
		if (Object.keys(token).length === 0) {
			dispatch(emptyToken())
			dispatch(emptyEmail())
			dispatch(emptyUser())
			navigate('/')
		} else {
			logoutHit(token.access_token)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			dispatch(emptyToken())
			dispatch(emptyEmail())
			dispatch(emptyUser())
			navigate('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	return (
		<Container>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand as={Link} key={"/"} to="/">
					<img src="/kosanku.png" className="d-inline-block align-top mx-1 logo" alt="..." />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{routesDefine(routes)}
						{
							Object.keys(userData).length === 0 ?
								<Button as={Link} key={"/login"} to="/login" variant="outline-success">
									Masuk
								</Button> :
								<NavDropdown key={'/profile'} title={userData.first_name} id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} key={'/me'} to="/me">Profile</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
								</NavDropdown>
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
};
export default NavbarComponent;
