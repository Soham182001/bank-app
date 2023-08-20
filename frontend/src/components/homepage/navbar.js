import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import sessionStorage from "sessionstorage";
import React from 'react';

const NavbarBootstrap = () => {

    let data = sessionStorage.getItem("info");
    data = JSON.parse(data);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Bank-App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{data.custId}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBootstrap;