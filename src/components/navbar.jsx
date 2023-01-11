import { Navbar, Container, Nav, Button } from "react-bootstrap"

const NavbarComponent = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">
					<img src="./logo192.png" width="30" height="30" className="d-inline-block align-top mx-2" alt="..." />
					KOSANKU
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						<Nav.Link href="#home">Cari Kos</Nav.Link>
						<Nav.Link href="#home">Pusat Bantuan</Nav.Link>
						<Nav.Link href="#home">Syarat & Ketentuan</Nav.Link>
						<Button as={Nav.Link} href="#login" variant="outline-success">Success</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
export default NavbarComponent
