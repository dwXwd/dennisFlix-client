import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row, Card, Button, CardGroup} from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Container>
      <CardGroup>
          <Card id="movie-card">
              <Card.Body>
                  <Card.Text id="card-button" onClick={() => onMovieClick(movie)}>{movie.Title}</Card.Text>
              </Card.Body>
          </Card>
      </CardGroup>
  </Container>
    );
  }
}

//define what Props can be imported

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Actors: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};