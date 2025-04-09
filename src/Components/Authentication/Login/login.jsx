import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../authconfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = ({ show, handleClose }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleLoginChanges = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleLoginDetailsSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Redirecting to Dashboard...'
      }).then(() => {
        setLoginDetails({ email: '', password: '' });
        handleClose();
        navigate('/dashboard')
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLoginDetailsSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={handleLoginChanges}
              value={loginDetails.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={handleLoginChanges}
              value={loginDetails.password}
            />
          </Form.Group>
          <Button type='submit' className='mt-3' variant='primary' block>Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;