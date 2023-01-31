import { useEffect } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/apis/authentication";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { emptyUser } from "../store/slices/userSlice";

const NavbarComponent = ({ routes }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const [logoutHit, { isLoading, isSuccess }] = useLogoutMutation()

	const searchTop = useSelector(state => state.decor.searchOnTop)

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
			} else {
				if (el.hasOwnProperty('name')) {
					return <Nav.Link key={path + el.path} className={"mx-3" + (path + el.path === location.pathname ? " active" : "")} as={Link} to={path + el.path}>{el.name}</Nav.Link>
				}
			}
			return ""
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

	const routeToSearch = () => {
		navigate('/pencarian')
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
		<Navbar bg="light" expand="lg" id="navbar" className="py-0">
			<Container>
				<Navbar.Brand as={Link} key={"/"} to="/">
					<img src={searchTop ? "/image/logo-square.png" : "/image/logo.png"} className="img-fluid mx-1 logo" alt="..." />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{
						searchTop ?
							<div className="form-search d-flex my-2" onClick={routeToSearch}>
								<img src="/search-normal.svg" alt="..." className="p-2" />
								<img src="/line-vertical.svg" alt="..." />
								<input type="text" className="w-100 border-0 mx-2" placeholder="Tulis daerah / alamat kosan yang akan kamu tuju" />
							</div> :
							""
					}
					<Nav className="ms-auto align-items-center">
						{routesDefine(routes)}
						{
							Object.keys(userData).length === 0 ?
								<Button as={Link} key={"login"} to="/login" className="mx-3">
									Masuk
								</Button> :
								<NavDropdown key={'/profile'} className="mx-3" title={userData.first_name} id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} key={'/me'} to="/me">Profile</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
								</NavDropdown>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavbarComponent;
