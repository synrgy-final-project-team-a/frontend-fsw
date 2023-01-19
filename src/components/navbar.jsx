import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavbarComponent = ({ routes }) => {

	const routesDefine = (element, path = "") => {
		return (element.map((el, i) => {
			if (el.hasOwnProperty('children')) {
				return routesDefine(el.children, path+el.path)
			} else if(el.hasOwnProperty('name')) {
				return <Nav.Link className="navbar-link" key={i} href={path+el.path}>{el.name}</Nav.Link>
			}
		}))
	}

	return (
		<Navbar bg="light" expand="lg" className="navbar">
			<Container>
				<Navbar.Brand href="/">
					<img src="/kosanku.png" className="d-inline-block align-top mx-1 logo" alt="..." />
					
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
