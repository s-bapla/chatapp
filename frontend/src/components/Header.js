import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="bg-info" sticky="top">
      <Container>
        <Navbar.Brand href="/">Chatr</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/features">Features</Nav.Link>
          <Nav.Link href="/">Join Room</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
