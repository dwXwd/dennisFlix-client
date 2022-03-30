import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

import {Row, Col, Card, Cardgroup, Container, Button} from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();
    //intial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }



  //When a movie is clicked this function is invoked and "selects" the movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

getMovies(token) {
  axios.get('https://dennisflix.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

  //On login the user user's state changes to the particular user

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);


  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
}

  render() {
    const { movies, selectedMovie, user } = this.state;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //Before the movie is loaded there is nothing
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }
}
export default MainView;
