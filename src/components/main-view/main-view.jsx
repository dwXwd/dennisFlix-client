import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col, Container} from 'react-bootstrap';


export class MainView extends React.Component {
  constructor() {
    super();
    //intial state is set to null
    this.state = {
      user: null,
      movies: [],
    }
  }


  getMovies(token) {
    axios.get('https://dennisflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
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

  // When token is present (user is logged in), get list of movies
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
    const { movies, user} = this.state;



    return (
      <Container>

        <Router>
          <Menubar user={user} />

          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {

              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
              if (!user) return <Row>
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              </Row>

              //Before the movie is loaded there is nothing
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path={`/users/${user}`} render={({ history }) => {
              if (!user) return <Redirect to="/" />
              return (
                <Col xs={12} md={10}>
                  <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:Name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView movies={movies} director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:Name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView movies={movies} genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />



          </Row>

        </Router>

      </Container>

    );
  }
}
export default MainView;
