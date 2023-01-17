import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavbarComponent = ({ routes }) => {

	// const routesDefine = (element) => {
	// 	element.map((el, i) => {
	// 		if (el.hasOwnProperty('element')) {
	// 			return <Nav.Link key={i} href={el.path}>{el.name}</Nav.Link>
	// 		} else if (el.hasOwnProperty('children')) {
	// 			routesDefine(el)
	// 		}
	// 	})
	// }

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
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="#carikos">Cari Kos</Nav.Link>
						<Nav.Link href="#sewakos">Sewa Kos</Nav.Link>
						{/* {routes} */}
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
