import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavbarComponent = ({ routes }) => {

	const userData = useSelector((state) => {
		return state.user.current
	})

	const routesDefine = (element, path = "") => {
		return (element.map((el, i) => {
			if (el.hasOwnProperty('children')) {
				return routesDefine(el.children, path + el.path)
			} else if (el.hasOwnProperty('name')) {
				return <Nav.Link className="navbar-link" as={Link} key={el.name} to={path + el.path}>{el.name}</Nav.Link>
			} else {
				return <></>
			}
		}))
	}

	return (
		<Navbar bg="light" expand="lg" className="navbar">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img src="/kosanku.png" className="d-inline-block align-top mx-1 logo" alt="..." />
					
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center gap-36">
						{routesDefine(routes)}
						{
							Object.keys(userData).length === 0 ?
							<Button as={Link} key="login" to="/login" variant="outline-success">
								Masuk
							</Button> :
							<Nav.Link key="profile" as={Link} to="/me">{userData.first_name}</Nav.Link>
						}
						<Nav.Link as={Link} key="logout" to="/logout">Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavbarComponent;
