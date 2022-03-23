import React, { useState } from 'react';
import PropTypes from "prop-types";
import {Button, Form, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
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
                    minLenght="8"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                    <Form.Control 
                      type="birthday" 
                      value={birthday} 
                      onChange={e => setBirthday(e.target.value)} 
                      placeholder="Enter your Birthday here..."
                      />

                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ener your Email-Adress here..." />
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


RegistrationView.propTypes = {
  onRegistered: PropTypes.func.isRequired
};