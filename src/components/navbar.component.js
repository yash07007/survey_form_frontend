import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";

class NavBar extends Component {
    state = {};
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Quiz App</Navbar.Brand>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;
