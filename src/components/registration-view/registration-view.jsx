import React, { useState } from 'react';
import PropTypes from "prop-types";
import {Button, Form, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ birthday, setBirth_Date] = useState('');
  const [email, setEmail] = useState('');


axios.post('https://dennisflix.herokuapp.com/users', {
  Username: username,
  Password: password,
  Email: email,
  Birth_Date: birthday
})
.then(response => {
  const data = response.data;
  console.log(data);
  window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
})
.catch(e => {
  console.log('error registering the user')
});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password, birthday, email);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistered(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title>Please Register:</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)}
                      placeholder = "Enter your Username here..." 
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Enter your Password here..."
                    required
                    minLength="8"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={birthday} 
                      onChange={e => setBirth_Date(e.target.value)} 
                      placeholder="Enter your Birthday here..."
                      />

                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your Email-Adress here..." />
                    required
                  </Form.Group>
                  
                  <Button variant= "primary" type="submit" onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
