import React from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  addFav = (id) => {
    const token = localStorage.getItem('token');
    axios.post(`https://dennisflix.herokuapp.com/users/${username}/movies/${id}`, {
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
    render() {
      const { movie, onBackClick } = this.props;

      return (
        <Container className="movie-view">
          <Row className="movie-poster">
            <Col>
              <Card id="movie-view">
                <Card.Body>
                  <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
                  <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                  <Card.Text id="movie-description" className="movie-description">
                    {movie.Description}</Card.Text>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                  <Card.Text id="movie-actors" className="movie-actors">
                    Actors: {movie.Actors}</Card.Text>
                </Card.Body>
              </Card>
              <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </Col>
          </Row>
        </Container>
      );
    }


  }

/*
export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }
}*/
