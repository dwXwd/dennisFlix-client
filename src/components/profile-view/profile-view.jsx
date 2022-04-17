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

    const getUser = (username, token) => {
        axios
          .get(`https://dennisflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUsername(response.data.Username);
            setPassword(response.data.Password);
            setEmail(response.data.Email);
            setBirthday(response.data.Birthday);
            setFavoriteMovieList(response.data.FavoriteMovies);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
    useEffect( () => {
        if (token!== null) {
        getUser(user, token);
        }
    }, []);

    const deleteUser = (user, token) => {
        axios.delete(`https://dennisflix.herokuapp.com/users/${user}`,  {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
            alert("Profile successfully deleted");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/', '_self');
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const updateUser = (token, user) => {
        axios.put(`https://dennisflix.herokuapp.com/users/${user}`,  {
            "Password": password,
            "Email": email,
            "Birthday": birthday,
            "Username": username
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                //Assign the result to the userdata
                alert("Profile updated successfully!")
                setUsername(response.data.Username)
                setPassword(response.data.Password)
                setEmail(response.data.Email)
                setBirthday(response.data.Birthday)
            })
            .catch(err => {
                alert("errrrr")
                console.log(err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(token, user);
    }

    /* Function that allows users to remove a movie from their list of favorites */
    const removeFav = (id) => {
        axios.delete(`https://dennisflix.herokuapp.com/users/${username}/movies/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(() => {
                setFavoriteMovieList(
                    favoriteMovieList.filter((movieId) => movieId !== id)
                  );
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
                            <Card.Footer className='text-center'>
                  <Button  onClick={() => deleteUser(user, token)}>Delete this User</Button>
                </Card.Footer>
                        </Card>
                    </CardGroup>
                </Col>

            </Row>
            {/* List of favorite movies */}
            <FavoriteMovies
        favoriteMovieList={movies.filter((m) =>
          favoriteMovieList.includes(m._id)
        )}
        removeFav={removeFav}
      />
        </Container>


    )
}

