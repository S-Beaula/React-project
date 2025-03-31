import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { author, db } from '../../../authconfig';
import { set, ref } from 'firebase/database';
import Swal from 'sweetalert2';

const SignUp = ({ show, handleClose }) => {
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupDetails;

    if (password !== signupDetails.confirmpassword) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Passwords do not match!' });
      return;
    }

    try {
      const signupUsers = await createUserWithEmailAndPassword(author, email, password);
      const signUpUsersCredentials = signupUsers.user;

      await updateProfile(signUpUsersCredentials, { displayName: name });
      
      await set(ref(db, `users/${name}`), {
        name,
        email,
        id: signupUsers.user.uid,
        role: "user"
      });

      Swal.fire({ icon: 'success', title: 'Success!', text: 'Successfully Signed Up!' })
        .then(() => {
          setSignupDetails({ name: "", email: "", password: "", confirmpassword: "" });
          handleClose(); 
        });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' name='name' onChange={handleChange} value={signupDetails.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' name='email' onChange={handleChange} value={signupDetails.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' name='password' onChange={handleChange} value={signupDetails.password} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm password' name='confirmpassword' onChange={handleChange} value={signupDetails.confirmpassword} />
          </Form.Group>
          <Button type='submit' className='mt-3' variant='primary' block>
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;