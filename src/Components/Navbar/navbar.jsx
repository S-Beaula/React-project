import React from 'react';
import './navbar.css';
import { Nav, Navbar, Button } from 'react-bootstrap';

const Navbar1 = ({ handleShowSignup, handleShowLogin }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className='navbar p-3 shadow-lg w-100 overflowY-hidden'>
      <Navbar.Brand href="/home" className='text-warning fw-bold' style={{ fontSize: "2rem" }}>
        Memory Vault
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse className='justify-content-end'>
        <Nav className='d-flex align-items-center gap-3'>
          <Nav.Link href='/home' className='text-light fs-5'>Home</Nav.Link>
          <Button variant="outline-warning" className='fs-6 px-4' onClick={handleShowSignup}>Signup</Button>
          <Button variant="warning" className='fs-6 px-4' onClick={handleShowLogin}>Login</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar1;
