import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

class NavBar extends Component {
    state = {};
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Survey</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/admin">Admin</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;
