import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Form, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import { FavoriteMovies } from './favorite-movies';

export function ProfileView(props) {
    const {user} = props;
    const {movies} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');

    // constant to hold favorite movie list from userdata
    const [favoriteMovieList, setFavoriteMovieList] = useState ([]);
    const token = localStorage.getItem('token');

    const  getUser = (username, token) => {
        axios.get(`https://dennisflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            const user = response.data;
            console.log(user);
            setUsername(user.Username)
            setPassword(response.data.Password)
            setEmail(response.data.Email)
            setBirthday(response.data.Birth_Date)
            setFavoriteMovieList(movies.filter(m => response.data.FavoriteMovies.includes(m._id)));

          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
    useEffect( () => {
        if (user) {
        getUser(username, token)
        }
    })

    const updateUser = (token, username) => {
        axios.put(`https://dennisflix.herokuapp.com/users/${username}`,  {
            Username: username,
            Password: password,
            Email: email,
            Birth_Date: birthday
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                //Assign the result to the userdata
                alert("Profile updated successfully!")
            })
            .catch(err => {
                alert("errrrr")
                console.log(err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(token, username);
    }

    /* Function that allows users to remove a movie from their list of favorites */
    const removeFav = (id) => {
        axios.delete(`https://dennisflix.herokuapp.com/users/${username}/movies/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(() => {
                // Change state of favoriteMovieList to rerender component
                setFavoriteMovieList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));

            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Update Profile:</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}

                                            
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your Password here..."
                                            minLength="8"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                        />

                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        
                                    </Form.Group>

                                    <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>

            </Row>
            {/* List of favorite movies */}
            <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />
        </Container>


    )
}

