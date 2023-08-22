import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import sessionStorage from "sessionstorage";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const NavbarBootstrap = () => {

    const navigate = useNavigate();
    let data = sessionStorage.getItem("info");
    data = JSON.parse(data);

    const handleLogout = () => {
      sessionStorage.clear();
      navigate('../login')
    }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Bank-App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:
          </Navbar.Text>
          <NavDropdown title={data.custId} id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBootstrap;