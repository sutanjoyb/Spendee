import { Navbar, Container, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          style={{
            fontFamily: "Croissant One",
          }}
        >
          Spendee
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/ledger">
              Ledger
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
