import React from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Navbar, Container, Nav, NavDropdown }
    from 'react-bootstrap';
import './Navb.css'

function Navb() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/Signup">Ali-Media</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav navbarScroll" >
          <Nav className="me-auto">
            <Navbar.Brand href="/Signup">
                <h6 className='user_welcoming'>welcome </h6>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item ><AmplifySignOut /></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navb