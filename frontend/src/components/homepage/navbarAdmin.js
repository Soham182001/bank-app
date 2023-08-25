import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import sessionStorage from "sessionstorage";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const NavbarBootstrapAdmin = () => {

    const navigate = useNavigate();
    let data = sessionStorage.getItem("admin_info");
    data = JSON.parse(data);
    console.log(data);

    const handleLogout = () => {
      sessionStorage.clear();
      navigate('../loginAdmin')
    }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Bank-App (Admins Only)</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Admin:
          </Navbar.Text>
          <NavDropdown title={data.empId} id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBootstrapAdmin;