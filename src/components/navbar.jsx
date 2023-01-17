import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavbarComponent = ({ routes }) => {

	const routesDefine = (element, path = "") => {
		return (element.map((el, i) => {
			if (el.hasOwnProperty('children')) {
				return routesDefine(el.children, path+el.path)
			} else if(el.hasOwnProperty('name')) {
				return <Nav.Link key={i} href={path+el.path}>{el.name}</Nav.Link>
			}
		}))
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<img src="./logo192.png" width="30" height="30" className="d-inline-block align-top mx-2" alt="..." />
					KOSANKU
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center gap-36">
						{routesDefine(routes)}
						<Button as={Nav.Link} href="/login" variant="outline-success" className="btn-login">
							Masuk
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavbarComponent;
